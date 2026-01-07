<template>
  <section class="bg-gray-50 w-full pagecha min-h-screen flex flex-col">
    <div class="title w-full h-[70px] text-center">
      <h1 class="text-5xl font-bold">Clubs</h1>
    </div>
    <div class="things clubs_page flex flex-col md:flex-row gap-[35px] w-full">
      <!-- LEFT: My Clubs -->
      <div class="flex-1 flex flex-col gap-5">
        <div class="flex flex-col justify-between items-center gap-5">
          <h2 class="text-3xl font-semibold text-center w-full">My Clubs</h2>
          <!-- CREATE CLUB BUTTON -->
        </div>

        <div v-if="myClubs.length" class="flex flex-col gap-4">
          <div
            v-for="club in myClubs"
            :key="club.id"
            class="club_card bg-white p-4 rounded-xl shadow flex justify-between items-center hover:shadow-lg transition"
          >
            <div>
              <h3 class="text-xl font-semibold">{{ club.name }}</h3>
              <p class="text-gray-500 text-sm">{{ club.membersCount }} members</p>
              <span v-if="club.type === 'private'" class="text-xs text-gray-500">Private</span>
              <span v-else class="text-xs text-gray-500">Public</span>
            </div>

            <div class="flex gap-2 items-center">
              <!-- Open Chat button for all my clubs -->
              <button class="btn btn-sm bg-blue-600 text-white" @click="openClubChat(club)">
                Open Chat
              </button>

              <!-- Three-dot menu for creator only -->
              <div class="relative" v-if="club.creatorEmail === user.email">
                <button
                  @click="club.showMenu = !club.showMenu"
                  class="text-2xl cursor-pointer font-normal"
                >
                  •••
                </button>
                <div
                  v-if="club.showMenu"
                  class="absolute w-[150px] h-[65px] right-0 top-6 bg-white shadow-lg rounded-lg flex flex-col z-50"
                >
                  <button class="btn sett btn-sm btn-ghost text-blue-600" @click="editClub(club)">
                    Edit Name
                  </button>
                  <button
                    class="btn sett btn-sm btn-ghost text-red-600"
                    @click="deleteClubPrompt(club)"
                  >
                    Delete Club
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-gray-400 text-center mt-10">
          You haven't created or joined any clubs yet.
        </div>
        <div class="bttn w-full flex flex-row justify-center">
          <button class="btn w-[150px] bg-blue-600 text-white" @click="openCreateClub">
            + Create Club
          </button>
        </div>
      </div>

      <!-- RIGHT: Other Clubs -->
      <div class="flex-1 flex flex-col gap-6">
        <h2 class="text-3xl font-semibold mb-4 text-center w-full">Other Clubs</h2>

        <!-- Joined Other Clubs -->
        <div v-if="joinedOtherClubs.length" class="flex flex-col gap-4">
          <h3 class="text-xl font-semibold">Joined Clubs</h3>
          <div
            v-for="club in joinedOtherClubs"
            :key="club.id"
            class="club_card bg-white p-4 rounded-xl shadow flex justify-between items-center hover:shadow-lg transition"
          >
            <div>
              <h3 class="text-lg font-semibold">{{ club.name }}</h3>
              <p class="text-gray-500 text-sm">{{ club.membersCount }} members</p>
            </div>
            <div class="flex gap-2">
              <button class="btn btn-sm bg-blue-600 text-white" @click="openClubChat(club)">
                Open Chat
              </button>
              <button class="btn btn-sm bg-red-500 text-white" @click="leaveClub(club)">
                Leave Club
              </button>
            </div>
          </div>
        </div>

        <!-- Available Other Clubs -->
        <div class="flex flex-col mt-6">
          <h3 class="text-xl font-semibold">Explore Other Clubs</h3>

          <div v-if="availableOtherClubs.length">
            <div
              v-for="club in availableOtherClubs"
              :key="club.id"
              class="club_card bg-whiterounded-xl gap-[25px] shadow flex justify-between items-center hover:shadow-lg transition"
            >
              <div>
                <h3 class="text-lg font-semibold">{{ club.name }}</h3>
                <p class="text-gray-500 text-sm">{{ club.membersCount }} members</p>
                <span v-if="club.type === 'private'" class="text-xs text-gray-500">Private</span>
                <span v-else class="text-xs text-gray-500">Public</span>
              </div>
              <div>
                <button
                  class="btn btn-sm bg-green-600 text-white"
                  @click="joinClub(club)"
                  :disabled="joiningClubs.includes(club.id)"
                >
                  {{ joiningClubs.includes(club.id) ? 'Joining...' : 'Join' }}
                </button>
              </div>
            </div>
          </div>

          <div v-else class="text-gray-400 text-center mt-4">No more clubs to explore.</div>
        </div>

        <div
          v-if="!joinedOtherClubs.length && !availableOtherClubs.length"
          class="text-gray-400 text-center mt-10"
        >
          No other clubs available.
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { auth, db } from '@/firebase'
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

export default {
  data() {
    return {
      clubs: [],
      loading: true,
      user: null,
      userData: { clubs: [] }, // safe default
      joiningClubs: [],
    }
  },

  // Clubs the user created or joined
  computed: {
    // Clubs the user created
    myClubs() {
      if (!this.clubs || !this.user) return []
      return this.clubs.filter((c) => c.creatorEmail === this.user.email)
    },

    joinedOtherClubs() {
      return this.clubs.filter((c) => c.creatorEmail !== this.user?.email && this.isMember(c))
    },
    availableOtherClubs() {
      return this.clubs.filter((c) => c.creatorEmail !== this.user?.email && !this.isMember(c))
    },
  },

  async mounted() {
    onAuthStateChanged(auth, async (user) => {
      if (!user) return
      this.user = user

      // Load user data
      const userRef = doc(db, 'users', user.uid)
      const { getDoc } = await import('firebase/firestore')
      const userSnap = await getDoc(userRef)
      if (userSnap.exists()) this.userData = userSnap.data()

      await this.fetchClubs()
    })
  },

  methods: {
    async fetchClubs() {
      try {
        const snap = await getDocs(collection(db, 'clubs'))
        this.clubs = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
          showMenu: false,
        }))

        // Listen for real-time updates on each club
        this.clubs.forEach((c) => {
          const clubRef = doc(db, 'clubs', c.id)
          onSnapshot(clubRef, (docSnap) => {
            const idx = this.clubs.findIndex((cl) => cl.id === c.id)
            if (idx !== -1) this.clubs[idx] = { ...this.clubs[idx], ...docSnap.data() }
          })
        })
      } catch (err) {
        console.error('Failed to fetch clubs', err)
      } finally {
        this.loading = false
      }
    },

    isMember(club) {
      return this.userData?.clubs?.includes(club.id)
    },

   async joinClub(club) {
  // Prevent multiple joins
  if (this.isMember(club) || this.joiningClubs.includes(club.id)) return

  this.joiningClubs.push(club.id) // disable the button immediately

  try {
    if (club.type === 'private') {
      const pass = prompt('Enter password for this private club:')
      if (pass !== club.password) {
        this.joiningClubs = this.joiningClubs.filter(id => id !== club.id)
        return alert('Incorrect password')
      }
    }

    // Add club to user
    await updateDoc(doc(db, 'users', this.user.uid), {
      clubs: arrayUnion(club.id),
    })

    // Increment members count on the club
    await updateDoc(doc(db, 'clubs', club.id), {
      membersCount: (club.membersCount || 0) + 1,
    })

    // Update local data
    this.userData.clubs.push(club.id)
  } catch (err) {
    console.error(err)
  } finally {
    // Remove from joiningClubs so button could be enabled if needed
    this.joiningClubs = this.joiningClubs.filter(id => id !== club.id)
  }
}
,

    async leaveClub(club) {
      if (!confirm('Are you sure you want to leave this club?')) return

      try {
        await updateDoc(doc(db, 'users', this.user.uid), {
          clubs: arrayRemove(club.id),
        })
        await updateDoc(doc(db, 'clubs', club.id), {
          membersCount: (club.membersCount || 1) - 1,
        })
        this.userData.clubs = this.userData.clubs.filter((c) => c !== club.id)
      } catch (err) {
        console.error(err)
      }
    },

    openClubChat(club) {
      this.$router.push(`/clubs/chat/${club.id}`)
    },

    editClub(club) {
      const newName = prompt('Enter new club name:', club.name)
      if (!newName) return
      updateDoc(doc(db, 'clubs', club.id), { name: newName })
    },

    async deleteClubPrompt(club) {
      const confirmation = prompt('Type "I want to delete my club" to confirm:')
      if (confirmation !== 'I want to delete my club') return

      try {
        // Remove club from all members
        const usersSnap = await getDocs(collection(db, 'users'))
        for (const u of usersSnap.docs) {
          const userRef = doc(db, 'users', u.id)
          const data = u.data()
          if (data.clubs?.includes(club.id)) {
            await updateDoc(userRef, { clubs: arrayRemove(club.id) })
          }
        }

        // Delete the club
        await deleteDoc(doc(db, 'clubs', club.id))

        // Remove locally
        this.clubs = this.clubs.filter((c) => c.id !== club.id)
        alert('Club deleted successfully')
      } catch (err) {
        console.error(err)
        alert('Failed to delete club')
      }
    },

    openCreateClub() {
      this.$router.push('/clubs/create')
    },
  },
}
</script>

<style scoped>
.sett {
  padding: 10px 25px;
}
.pagecha {
  padding: 30px 90px 50px 90px;
}

.club_card {
  padding: 15px 15px;
  margin-top: 7px;
  transition: all 0.2s ease;
}

.club_card:hover {
  transform: translateY(-2px);
}

.btn {
  transition: all 0.2s ease;
  padding: 0px 25px;
}

.btn:hover {
  transform: scale(1.05);
}
</style>
