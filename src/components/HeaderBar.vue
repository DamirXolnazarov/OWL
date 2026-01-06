<script setup>
import { RouterLink } from 'vue-router'
import { auth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { ref } from 'vue'
const isSignedIn = ref(false)

onAuthStateChanged(auth, (user) => {
  isSignedIn.value = !!user
})
</script>

<template>
  <header
    class="top-0 left-0 w-full h-[75px] flex justify-between items-center bg-base-100/70 backdrop-blur-md shadow-sm border-b border-base-300 z-50"
  >
    <!-- Left: Logo -->
     <router-link :to="isSignedIn ? '/dashboard' : '/'">

       <div class="flex items-center gap-2">
         <img src="../assets/logo.png" alt="Logo" class="h-[45px]" />
        </div>
      </router-link>

    <!-- Center: Search -->
    <div class="hidden md:flex items-center w-[350px]">
      <label
        class="input input-bordered rounded-full flex items-center gap-2 w-full"
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
          type="search"
          placeholder="Search"
          class="grow bg-transparent outline-none"
        />
      </label>
    </div>

    <!-- Right: Navigation -->
    <div class="flex items-center gap-8 text-sm font-medium">
      <RouterLink :to="isSignedIn ? '/books' : '/'" class="traa flex flex-col items-center hover:text-primary transition">
        <img src="../assets/book.png" alt="Books" class="h-[28px]" />
        <span>Library</span>
      </RouterLink>
      <RouterLink :to="isSignedIn ? '/mybooks' : '/'" class="traa flex flex-col items-center hover:text-primary transition">
        <img src="../assets/open-book.png" alt="Books" class="h-[28px]" />
        <span>My books</span>
      </RouterLink>
      <RouterLink :to="isSignedIn ? '/friends' : '/'" class="traa flex flex-col items-center hover:text-primary transition">
        <img src="../assets/friends.png" alt="Friends" class="h-[28px]" />
        <span>Friends</span>
      </RouterLink>

      <RouterLink :to="isSignedIn ? '/leaderboard' : '/'" class="traa flex flex-col items-center hover:text-primary transition">
        <img src="../assets/leaderboard.png" alt="Leaderboard" class="h-[28px]" />
        <span>Leaderboard</span>
      </RouterLink>

      <RouterLink :to="isSignedIn ? '/dashboard' : '/'" class="traa flex flex-col items-center hover:text-primary transition">
        <img src="../assets/clubs.png" alt="Clubs" class="h-[28px]" />
        <span>Clubs</span>
      </RouterLink>

      <RouterLink :to="isSignedIn ? '/quizzes' : '/'" class="traa flex flex-col items-center hover:text-primary transition">
        <img src="../assets/quiz.png" alt="Quizzes" class="h-[28px]" />
        <span>Quizzes</span>
      </RouterLink>

      <RouterLink :to="isSignedIn ? '/profile' : '/'" class="traa flex flex-col items-center hover:text-primary transition">
        <img src="../assets/profile.png" alt="Profile" class="h-[28px]" />
        <span>Profile</span>
      </RouterLink>
    </div>
  </header>
</template>

<style scoped>
span {
  font-size: 13px;
  font-weight: 500;
}
header{
  padding: 0px 50px 0px 90px;
}
.input{
  padding: 0px 15px;
}
.traa{
  cursor: pointer;
}


</style>
