<template>
  <section class="friends_box h-full">
    <div class="searchBar flex flex-row justify-center items-center">
      <div class="hidden md:flex items-center w-[550px]">
        <label class="input h-[50px] input-bordered rounded-full flex items-center gap-2 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 opacity-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
          <input
            type="search"
            v-model="searchQuery"
            placeholder="Search People and Add Friends"
            class="grow bg-transparent outline-none"
          />
        </label>
      </div>
    </div>
    <h1 class="text-[50px] title text-center font-semibold">Friends</h1>
    <div class="people flex flex-col items-center gap-[15px]">
      <div
        v-for="user in filteredUsers"
        :key="user.id"
        class="person-card flex flex-row justify-between"
      >
        <div class="left flex flex-col items-start justify-center">
          <span class="text-[25px]">{{ user.username }}</span>
          <span class="cursor-pointer"
            ><a :href="`mailto:${user.email}`">{{ user.email }}</a></span
          >
        </div>
        <div class="right gap-[25px] flex flex-row items-center justify-between">
          <span v-if="user?.stats?.booksInProgress?.name !== ''"
            >Reading: {{ user?.stats?.booksInProgress?.name }}</span
          >
          <span v-if="user?.stats?.booksInProgress?.name == ''">Not reading</span>
          <span
            >Total XP:
            {{
              user?.stats?.quizzesCompleted?.length +
                user?.stats?.pagesRead +
                user?.stats?.booksCompleted * 10

            }}</span
          >

          <button class="btn follow" @click="toggleFollow(user.email)" :disabled="!userData">
            {{ userData?.stats?.friends?.includes(user.email) ? 'Following' : 'Follow' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed } from 'vue'
import { auth, db } from '@/firebase'
import {
  doc,
  getDocs,
  getDoc,
  collection,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

export default {
  data() {
    return {
      users: [],
      userData: null,
      searchQuery: '', // <- reactive search
    }
  },
  computed: {
    filteredUsers() {
      if (!this.searchQuery) return this.users
      return this.users.filter((user) =>
        user.username.toLowerCase().includes(this.searchQuery.toLowerCase()),
      )
    },
  },
  mounted() {
    onAuthStateChanged(auth, async (user) => {
      if (!user) return

      // current user
      const ref = doc(db, 'users', user.uid)
      const snap = await getDoc(ref)
      if (snap.exists()) this.userData = snap.data()

      // all users except current
      const snapshot = await getDocs(collection(db, 'users'))
      this.users = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((u) => u.email !== user.email)
    })
  },
  methods: {
    async toggleFollow(emailToFollow) {
      const user = auth.currentUser
      if (!user) return
      const userRef = doc(db, 'users', user.uid)

      const friends = this.userData.stats?.friends || []

      if (friends.includes(emailToFollow)) {
        await updateDoc(userRef, {
          'stats.friends': arrayRemove(emailToFollow),
        })
      } else {
        await updateDoc(userRef, {
          'stats.friends': arrayUnion(emailToFollow),
        })
      }

      const snap = await getDoc(userRef)
      this.userData = snap.data()
    },
  },
}
</script>

<style scoped>
section {
  min-height: 100vh;
}

.input {
  padding: 0px 15px;
  margin-bottom: 20px;
}
.person-card {
  width: 900px;
  height: 80px;
  background-color: white;
  padding: 15px 25px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.friends_box {
  padding: 50px 0px;
}
.follow {
  padding: 15px 30px;
  background: green;
  color: white;
  border: none;
}
.people {
  padding-top: 20px;
}
</style>
