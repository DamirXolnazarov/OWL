<template>

  
  <section class="leaderboard_page">
    <h1 class="text-[50px] font-semibold text-center">Quizzes</h1>
    <div class="searchBar flex flex-row justify-center items-center h-[100px]">
      <div class="hidden md:flex items-center w-[550px]">
        <label class="input h-[50px] input-bordered rounded-full flex items-center gap-2 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 opacity-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
          <input type="search" v-model="searchQuery" placeholder="Search Quizzes" class="grow bg-transparent outline-none" />
        </label>
      </div>
    </div>


    <div class="quizzzes w-full flex flex-row gap-6 flex-wrap justify-start">
      <div class="quiz_block flex flex-col justify-between p-6 rounded shadow" v-for="quiz in quizs" :key="quiz.id">
        <span class="quizTitle text-[20px] font-bold">{{ quiz.title }}</span>
        <span class="quizDescription text-[13px] italic">{{ quiz.description }}</span>
        <span class="quizNumber text-[13px] font-bold">Questions: 10</span>

        <button
          v-if="!getCompletion(quiz.title)"
          @click="goquiz(quiz.link)"
          class="btn bg-green-500 text-white btn-md mt-3"
        >
          Start
        </button>

        <button
          v-else
          disabled
          class="btn bg-gray-400 text-white btn-md mt-3"
        >
          Completed (Score: {{ getCompletion(quiz.title) }}/10)
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { auth, db } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import Papa from 'papaparse' // install with npm i papaparse

export default {
  data() {
    return {
      userData: null,
      searchQuery: '',
      quizs: [
        {
          id: 'QZ001',
          title: 'Atomic Habits',
          description:
            'Test your understanding of the key principles from Atomic Habits! This quiz will challenge your knowledge on habit formation, behavior change strategies, and practical tips to build better routines.',
          link:
            'https://docs.google.com/forms/d/e/1FAIpQLSc0YLsUZ4IsJ-b9mfC5MVHVUq6-eCZ5sFcL-8uDiNKGUq_wXg/viewform?usp=pp_url&entry.1031130035=QZ001&entry.696196564=Atomic+Habits'
        }
        // Add more quizzes here
      ],
      sheetUrl:
        'https://docs.google.com/spreadsheets/d/1b92obfH7phPj0Biwx7j_4w68g8O1syJWlZVBiv6CuQk/export?format=csv'
    }
  },

  mounted() {
    this.fetchUserData()
  },

  methods: {
    async fetchUserData() {
      onAuthStateChanged(auth, async (user) => {
        if (!user) return
        const snap = await getDoc(doc(db, 'users', user.uid))
        if (snap.exists()) {
          this.userData = snap.data()
          await this.checkQuizzesCompleted()
        }
      })
    },

    goquiz(link) {
      window.open(link, '_blank')
    },

    getCompletion(quizTitle) {
      if (!this.userData?.stats?.quizzesCompleted) return null
      const quiz = this.userData.stats.quizzesCompleted.find(
        (q) => q.title === quizTitle
      )
      return quiz ? quiz.score : null
    },

    async checkQuizzesCompleted() {
      try {
        const res = await fetch(this.sheetUrl)
        const csvText = await res.text()

        const parsed = Papa.parse(csvText, { header: true })
        const rows = parsed.data
        if (!this.userData?.username) return
 
        let updatedQuizzes = [...(this.userData.stats.quizzesCompleted || [])]

        rows.forEach((row) => {
          if (
            row.quiz_name === this.quizs[0].title &&
            row.user_id === this.userData.username
          ) {
            // check if already exists
            const exists = updatedQuizzes.some((q) => q.title === row.quiz_name)
            if (!exists) {
              updatedQuizzes.push({
                title: row.quiz_name,
                score: Number(row.Score)
              })
            }
          }
        })

        // Update in Firestore
        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
          'stats.quizzesCompleted': updatedQuizzes
        })

        // Update locally
        this.userData.stats.quizzesCompleted = updatedQuizzes
      } catch (error) {
        console.error('Error fetching sheet data:', error)
      }
    }
  }
}
</script>

<style scoped>

section{
  padding: 30px 90px;
  min-height: 100vh;
}  
.quizzzes {
  padding: 20px 0px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.quiz_block {
  width: 300px;
  height: 320px;
  padding: 25px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

label{ 
   padding-left: 15px;
}
</style>
