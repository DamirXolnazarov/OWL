<template>
  <section class="leaderboard_page flex flex-col items-center gap-6">

    <!-- Search -->
  <div class="searchBar flex flex-row justify-center items-center">
 <div class="hidden md:flex items-center w-[550px]">
      <label
        class="input h-[50px] input-bordered rounded-full flex items-center gap-2 w-full"
      >
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
          type="search" v-model="searchQuery"
          placeholder="Search People"
          class="grow bg-transparent outline-none"
        />
      </label>
    </div>

    </div>

    <!-- Leaderboard -->
     <h1 class="text-[50px] font-semibold">Leaderboard</h1>
    <div class="leaderboard flex flex-col items-center w-full gap-2">

      <div
        v-for="(user, index) in filteredUsers"
        :key="user.id"
        class="leaderboard_row w-full h-[45px] flex flex-row justify-between items-center px-4"
      >
        <!-- Left -->
        <div class="stat_left flex flex-row items-center gap-3">
          <!-- Top 3 icons -->
          <img
            v-if="index === 0"
            src="../assets/first.png"
            class="w-[35px] h-[35px]"
          />
          <img
            v-else-if="index === 1"
            src="../assets/second.png"
            class="w-[38px] h-[35px]"
          />
          <img
            v-else-if="index === 2"
            src="../assets/third.png"
            class="w-[35px] h-[35px]"
          />

          <!-- Rank number (after top 3) -->
          <span v-else class="text-sm font-bold">
            {{ index + 1 }}
          </span>

          <span class="name text-[19px] font-semibold">
            {{ user.username }}
          </span>
        </div>

        <!-- Right -->
        <div class="stat_right flex flex-row gap-4 text-[17px]">
          <span>B: {{ user.stats.booksCompleted }}</span>
          <span>P: {{ user.stats.pagesRead }}</span>
          <span>Q: {{ user.stats.quizzesCompleted }}</span>
          <span class="font-bold">T: {{ user.totalXP }} XP</span>
        </div>
      </div>

    </div>
  </section>
</template>


<script>
    import { db } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore'

export default {
  data() {
    return {
      users: [],
      searchQuery: '',
    }
  },

  computed: {
    sortedUsers() {
      return [...this.users].sort((a, b) => b.totalXP - a.totalXP)
    },

    filteredUsers() {
      if (!this.searchQuery) return this.sortedUsers
      return this.sortedUsers.filter(user =>
        user.username.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },
  },

  async mounted() {
    const snapshot = await getDocs(collection(db, 'users'))

    this.users = snapshot.docs.map(doc => {
      const data = doc.data()

      const totalXP =
        data.stats.booksCompleted * 100 +
        data.stats.pagesRead * 10 +
        data.stats.quizzesCompleted * 10

      return {
        id: doc.id,
        ...data,
        totalXP,
      }
    })
  },
}
</script>

<style scoped>
.leaderboard_row {
  width: 900px;
  height: 80px;
  background-color: white;
  padding: 15px 25px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

}
.leaderboard_page{
    padding: 50px 0px;
}
.input{
  padding: 0px 15px;
}
</style>
