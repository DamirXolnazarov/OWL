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
     <h1 class="text-[50px] font-semibold">Quizzes</h1>
   
  </section>
</template>


<script>

export default {
  data() {
    return {
     
    }
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
    min-height: 100vh;
}
.input{
  padding: 0px 15px;
}
</style>
