<script setup>
import { RouterLink } from 'vue-router'
import { auth } from '@/firebase'
import { db } from '@/firebase'
import { doc, getDoc, query, where, getDocs, collection } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import ReadingChart from '@/components/ReadingChart.vue'
</script>

<template>
  <section class="content">
    <div class="title">
      <h1 class="text-[45px] font-semibold text-gray-900 leading-tight tracking-tight">
        Welcome, {{ userData?.username }}!
      </h1>
    </div>
    <div class="sections flex flex-col gap-6">
      <div class="first_layer flex flex-row justify-between gap-7">
        <div class="first_layer1 w-[65%] h-[270px] flex flex-col gap-4">
          <ReadingChart />
        </div>

        <div class="first_layer3 relative group text-center w-[33%] h-[270px]">
          <span v-if="!showCurrentUser" class="font-bold text-[25px]">Leaderboard</span>
          <div class="leaderboard flex flex-col items-center gap-2 mt-2 h-full">
            <div class="top3 w-full flex flex-col items-center gap-2 mt-2 h-full">
              <!-- 🥇 FIRST -->
              <div
                v-if="leaderboard[0]"
                class="w-full bg-white h-[45px] carrd flex justify-between px-2 items-center"
              >
                <div class="stat_left flex items-center gap-2">
                  <img src="../assets/first.png" class="w-[30px] h-[30px]" />
                  <span class="text-[13px]">{{ leaderboard[0].username }}</span>
                </div>
                <div class="stat_right text-[12px] flex gap-1">
                  <span>B: {{ leaderboard[0].completedBooks }}</span>
                  <span>P: {{ leaderboard[0].pagesRead }}</span>
                  <span>Q: {{ leaderboard[0].quizzes }}</span>
                  <span>T: {{ leaderboard[0].totalXP }} XP</span>
                </div>
              </div>

              <!-- 🥈 SECOND -->
              <div
                v-if="leaderboard[1]"
                class="w-full bg-white carrd h-[45px] flex justify-between px-2 items-center"
              >
                <div class="stat_left flex items-center gap-2">
                  <img src="../assets/second.png" class="w-[30px] h-[30px]" />
                  <span class="text-[13px]">{{ leaderboard[1].username }}</span>
                </div>
                <div class="stat_right text-[12px] flex gap-1">
                  <span>B: {{ leaderboard[1].completedBooks }}</span>
                  <span>P: {{ leaderboard[1].pagesRead }}</span>
                  <span>Q: {{ leaderboard[1].quizzes }}</span>
                  <span>T: {{ leaderboard[1].totalXP }} XP</span>
                </div>
              </div>

              <!-- 🥉 THIRD -->
              <div
                v-if="leaderboard[2]"
                class="w-full h-[45px] carrd bg-white flex justify-between px-2 items-center"
              >
                <div class="stat_left flex items-center gap-2">
                  <img src="../assets/third.png" class="w-[30px] h-[30px]" />
                  <span class="text-[13px]">{{ leaderboard[2].username }}</span>
                </div>
                <div class="stat_right text-[12px] flex gap-1">
                  <span>B: {{ leaderboard[2].completedBooks }}</span>
                  <span>P: {{ leaderboard[2].pagesRead }}</span>
                  <span>Q: {{ leaderboard[2].quizzes }}</span>
                  <span>T: {{ leaderboard[2].totalXP }} XP</span>
                </div>
              </div>
            </div>

            <!-- ONLY IF USER NOT IN TOP 3 -->
            <template v-if="showCurrentUser">
              <span class="text-gray-400">* * *</span>
              <div class="w-full h-[45px] carrd bg-white flex justify-between items-center">
                <div class="stat_left flex items-center gap-2">
                  <span class="text-gray-400 w-[32px] text-center">{{ currentUserRank }}</span>
                  <span class="text-[13px]">You</span>
                </div>
                <div class="stat_right text-[12px] flex gap-1">
                  <span>B: {{ currentUser.completedBooks }}</span>
                  <span>P: {{ currentUser.pagesRead }}</span>
                  <span>Q: {{ currentUser.quizzes }}</span>
                  <span>T: {{ currentUser.totalXP }} XP</span>
                </div>
              </div>
            </template>
          </div>

          <div
            class="glass-overlay absolute inset-0 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <button @click="$router.push('/leaderboard')" class="glass-btn btn">
              Explore Leaderboard
            </button>
          </div>
        </div>
      </div>
      <div class="second_layer flex flex-row justify-between gap-7">
        <div class="second_layer1 relative w-[30%] h-[250px] rounded-lg overflow-hidden">
          <!-- CONTENT (blurred) -->
          <div
            class="noclubs w-full h-full text-center flex flex-col items-center justify-between blur-[2px] brightness-90 select-none pointer-events-none"
          >
            <span class="font-[600]">You don't have clubs yet</span>
            <img src="../assets/clubs.png" class="w-[100px] opacity-[50%]" alt="" />
            <button class="clubBtn btn">Explore Clubs</button>
          </div>

          <!-- STATIC GLASS OVERLAY -->
          <div
            class="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg"
          >
            <span class="text-[17px] font-semibold text-black"> 🚧 Feature not available yet </span>

            <span class="text-[13px] text-black/80 text-center px-6">
              Clubs are coming soon. Stay tuned!
            </span>

            <button
              disabled
              class="btn coming rounded-full text-[15px] bg-white/20 text-black/70 cursor-not-allowed"
            >
              Coming Soon
            </button>
          </div>
        </div>

        <div class="second_layer2 w-[40%] h-[250px]">
          <!-- No friends -->
          <div
            v-if="userData?.stats?.friends?.length === 0"
            class="noclubs w-full h-full text-center flex flex-col items-center justify-between"
          >
            <span class="font-[600]">You don't have friends yet</span>
            <img src="../assets/friends.png" class="w-[80px] opacity-[50%]" alt="" />
            <button @click="$router.push('/friends')" class="clubBtn btn">Add Friends</button>
          </div>

          <!-- Friends list -->
          <div v-else class="frieeends flex flex-col gap-2 h-full">
            <div class="title text-center">
              <span class="font-[600] text-[20px] text-center">Friends</span>
            </div>
            <div class="carrds overflow-auto flex flex-col gap-[2px] h-full">
              <div
                class="friends_card flex justify-between items-center"
                v-for="friend in friendsData"
                :key="friend.email"
              >
                <div class="flex flex-col">
                  <span class="font-semibold">{{ friend.username }}</span>
                  <span class="text-sm text-gray-500">{{ friend.email }}</span>
                </div>
                <span class="streak text-sm font-bold">🔥 {{ friend.streak }} days</span>
              </div>
            </div>

            <div class="btnnns flex flex-row items-center justify-center w-full">
              <button @click="$router.push('/friends')" class="clubBtn btn w-[150px] z-1">
                Add Friends
              </button>
            </div>
          </div>
        </div>
        <div class="second_layer3 relative group w-[30%] h-[250px]">
          <div class="quizzes text-center">
            <span class="font-[600]">Quizzes</span>
            <div class="carousel w-full h-[200px]">
              <div
                id="slide1"
                class="carousel-item relative w-full h-full flex flex-row items-center justify-center"
              >
                <img src="../assets/atomic.png" class="h-full" />
                <div
                  class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between"
                >
                  <a href="#slide4" class="btn btn-circle">❮</a>
                  <a href="#slide2" class="btn btn-circle">❯</a>
                </div>
              </div>
              <div
                id="slide2"
                class="carousel-item relative w-full h-full flex flex-row items-center justify-center"
              >
                <img src="../assets/atomic.png" class="h-full" />
                <div
                  class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between"
                >
                  <a href="#slide1" class="btn btn-circle">❮</a>
                  <a href="#slide3" class="btn btn-circle">❯</a>
                </div>
              </div>
              <div
                id="slide3"
                class="carousel-item relative w-full h-full flex flex-row items-center justify-center"
              >
                <img src="../assets/atomic.png" class="h-full" />
                <div
                  class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between"
                >
                  <a href="#slide2" class="btn btn-circle">❮</a>
                  <a href="#slide4" class="btn btn-circle">❯</a>
                </div>
              </div>
              <div
                id="slide4"
                class="carousel-item relative w-full h-full flex flex-row items-center justify-center"
              >
                <img src="../assets/atomic.png" class="h-full" />
                <div
                  class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between"
                >
                  <a href="#slide3" class="btn btn-circle">❮</a>
                  <a href="#slide1" class="btn btn-circle">❯</a>
                </div>
              </div>
            </div>
          </div>

          <div
            class="glass-overlay absolute inset-0 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <button @click="$router.push('/quizzes')" class="glass-btn btn">
              Explore Quizzes
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      userData: null,
      totalXP: 0,
      quizScore: 0,
      currentUserRank: null,
      showCurrentUser: false,
      currentUser: null,
      leaderboard: [],
      friendsData: [],
      topUsers: [], // top 3 users
      currentUserData: null, // your data if not in top 3
      currentUserRank: null, // your rank
    }
  },
  components: { ReadingChart },

  mounted() {
    onAuthStateChanged(auth, async (user) => {
      if (!user) return

      const ref = doc(db, 'users', user.uid)
      const snap = await getDoc(ref)

      if (snap.exists()) {
        this.userData = snap.data()

        // Calculate totalXP
        for (let i of this.userData?.stats?.quizzesCompleted || []) {
          this.quizScore += i.score
        }
        this.totalXP =
          (this.userData?.stats?.completedBooks?.length || 0) * 10 +
          this.userData?.stats?.pagesRead +
          this.quizScore

        // Fetch leaderboard
        await this.fetchLeaderboard()
        await this.fetchFriends()
      }
    })
  },

  methods: {
    async fetchLeaderboard() {
      const snap = await getDocs(collection(db, 'users'))
      const allUsers = []

      snap.forEach((docSnap) => {
        const data = docSnap.data()

        let quizScore = 0
        for (const q of data.stats?.quizzesCompleted || []) {
          quizScore += q.score
        }

        const totalXP =
          (data.stats?.completedBooks?.length || 0) * 10 + (data.stats?.pagesRead || 0) + quizScore

        allUsers.push({
          uid: docSnap.id,
          username: data.username,
          completedBooks: data.stats?.completedBooks?.length || 0,
          pagesRead: data.stats?.pagesRead || 0,
          quizzes: data.stats?.quizzesCompleted?.length || 0,
          totalXP,
        })
      })

      // sort by XP
      allUsers.sort((a, b) => b.totalXP - a.totalXP)

      // top 3
      this.leaderboard = allUsers.slice(0, 3)

      const index = allUsers.findIndex((u) => u.uid === auth.currentUser.uid)
      this.currentUserRank = index + 1
      this.currentUser = allUsers[index]

      // show user only if NOT top 3
      this.showCurrentUser = index >= 3
    },
    async fetchFriends() {
      this.friendsData = []
      const friendsEmails = this.userData?.stats?.friends || []
      if (!friendsEmails.length) return

      for (const email of friendsEmails) {
        const q = query(collection(db, 'users'), where('email', '==', email))
        const snap = await getDocs(q)
        if (!snap.empty) {
          const docData = snap.docs[0].data()
          this.friendsData.push({
            email,
            username: docData.username || 'N/A',
            streak: docData.stats?.streak?.current || 0,
          })
        }
      }
    },
  },
}
</script>

<style scoped>
.leaderboard {
  font-weight: 400 !important;
  padding: 0px 15px 15px 15px;
}
.stat_right {
  font-weight: 600;
}
.group:hover .first_layer3 {
  filter: blur(2px) brightness(0.9);
}
@keyframes glassPulse {
  0%,
  100% {
    opacity: 0.9;
  }
  50% {
    opacity: 1;
  }
}

.second_layer1 > div:last-child {
  animation: glassPulse 3s ease-in-out infinite;
}

.clubBtn {
  padding: 15px 30px;
  background-color: black;
  color: white;
}
.content {
  padding: 30px 95px;
}
.sections {
  padding-top: 20px;
}
.friends_card {
  background: #f9f9f9;
  padding: 10px 15px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.coming {
  padding: 15px 15px;
  cursor: pointer;
}
.carrd {
  padding: 10px 15px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.first_layer3 {
  background: #f9f9f9;
  padding: 15px 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.first_layer2,
.second_layer1,
.second_layer2,
.second_layer3 {
  background: #f9f9f9;
  padding: 15px 15px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.glass-overlay {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.glass-btn {
  padding: 10px 18px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.25);
  color: #000;
  font-weight: 600;
  font-size: 14px;
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.35);
  transition: all 0.25s ease;
}

.glass-btn:hover {
  background: rgba(255, 255, 255, 0.45);
  transform: scale(1.05);
}

.first_layer span {
  font-family: 'Poppins', sans-serif;
}
.recbook1 {
  background-image: url('../assets/atomic.png');
  background-size: contain;
  width: 150px;
  height: 190px;
  background-repeat: no-repeat;
  background-position: center center;
  border: 1px solid black;
}
.recbook2 {
  background-image: url('../assets/atomic.png');
  background-size: contain;
  width: 150px;
  height: 190px;
  background-repeat: no-repeat;
  background-position: center center;
  border: 1px solid black;
}
.recbook3 {
  background-image: url('../assets/atomic.png');
  background-size: contain;
  width: 150px;
  height: 190px;
  background-repeat: no-repeat;
  background-position: center center;
  border: 1px solid black;
}
.recommended_books {
  padding: 10px 0px;
}
.recBookBtn {
  padding: 15px 30px;
  background: black;
  color: white;
  cursor: pointer;
}
.upd_btn {
  padding: 15px 30px;
  background: black;
  color: white;
  cursor: pointer;
}
.name {
  margin-left: 15px;
  font-weight: 400;
  font-size: 15px;
}
.secondPlace,
.firstPlace,
.thirdPlace {
  padding: 5px 25px 5px 5px;
}
.noclubs {
  padding: 15px 15px;
}
</style>
