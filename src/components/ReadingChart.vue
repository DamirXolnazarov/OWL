<template>
  <section
    class="reading_dashboard h-full flex flex-row-reverse items-center gap-[30px] justify-between w-full"
  >
    <!-- STREAK -->

    <div class="wrapper group relative w-[250px] h-full">
      <div class="streak flex flex-col items-center justify-center h-full w-[250px] relative z-10">
        <span class="text-[35px] font-bold"> Day </span>
        <span class="text-[55px] font-bold">🔥 {{ streak.current }}</span>
        <span class="text-[35px] font-bold">Streak!</span>
        <span class="text-[15px] text-gray-500">Longest: {{ streak.longest }} days</span>
      </div>

      <div
        class="glass-overlay absolute inset-0 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 z-20 transition-all duration-300"
      >
        <button @click="$router.push('/mybooks')" class="glass-btn btn">Update Progress</button>
      </div>
    </div>

    <div class="chart_insights flex flex-col items-center justify-between w-[70%] h-full">
      <!-- CHART + INSIGHTS -->
      <div class="bottom_section flex flex-col h-full w-full justify-between rounded-lg">
        <div class="title text-center w-full">
          <span class="font-semibold text-[25px] text-center">📚 Reading Insights</span>
        </div>
        <div class="thinggs flex flex-row justify-between w-full h-full">
          <!-- CHART -->
          <div
            class="chart_container flex flex-col items-center"
            style="width: 65%; height: 91.5%; padding-top: 10px"
          >
            <span class="text-[12px] text-gray-500">Last 7 Days Statistics</span>
            <canvas ref="chartCanvas"></canvas>
          </div>

          <!-- INSIGHTS -->

          <div class="others flex flex-col justify-center items-start w-[30%] h-full">
            <span class="text-[14px]"
              >Favorite Genre: <b>{{ favoriteGenre }}</b></span
            >
            <span class="text-[14px]"
              >Books Completed: <b>{{ completedBooks.length }}</b></span
            >
            <span class="text-[14px]"
              >Total Pages Read: <b>{{ totalPagesRead }}</b></span
            >
            <span class="text-[14px]"
              >Quizzes: <b>{{ quizzes }}</b></span
            >
            <span class="text-[14px]"
              >Overall XP: <b>{{ totalXP }}</b></span
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'
import { auth, db } from '@/firebase'
import { doc, getDoc } from 'firebase/firestore'

Chart.register(...registerables)

export default {
  setup() {
    const chartCanvas = ref(null)
    const chartInstance = ref(null)
    const userData = ref(null)
    const streak = ref({ current: 0, longest: 0 })
    const dailyPages = ref({})
    const completedBooks = ref([])
    const totalPagesRead = ref(0)
    const quizzes = ref(0)
    const totalXP = ref(0)
    const favoriteGenre = ref('N/A')

    const renderChart = () => {
      if (!chartCanvas.value) return

      const today = new Date()
      const last7Days = []
      const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

      for (let i = 6; i >= 0; i--) {
        const d = new Date()
        d.setDate(today.getDate() - i)
        last7Days.push(d)
      }

      const labels = last7Days.map((d) => weekdayNames[d.getDay()])
      const values = last7Days.map((d) => {
        const dayKey = d.toISOString().split('T')[0]
        return dailyPages.value[dayKey] || 0
      })

      if (chartInstance.value) chartInstance.value.destroy()

      chartInstance.value = new Chart(chartCanvas.value, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Pages Read',
              data: values,
              backgroundColor: 'rgba(255,99,132,0.7)',
              borderRadius: 5,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 1000,
          },
          plugins: {
            legend: { display: false },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { stepSize: 10 },
            },
          },
        },
      })
    }

    const fetchUserData = async (user) => {
      const snap = await getDoc(doc(db, 'users', user.uid))
      if (!snap.exists()) return

      const stats = snap.data().stats || {}
      userData.value = snap.data()

      // STREAK
      streak.value = stats.streak || { current: 0, longest: 0 }

      // DAILY PAGES
      dailyPages.value = stats.dailyPages || {}

      // COMPLETED BOOKS
      completedBooks.value = stats.completedBooks || []

      // TOTAL PAGES
      const completedPages = completedBooks.value.reduce((sum, b) => sum + (b.pages || 0), 0)
      const inProgressPages = stats.booksInProgress?.pagesRead || 0
      totalPagesRead.value = completedPages + inProgressPages

      // FAVORITE GENRE
      const genreCount = {}
      completedBooks.value.forEach((book) => {
        ;(book.type || []).forEach((g) => {
          genreCount[g] = (genreCount[g] || 0) + 1
        })
      })
      const sorted = Object.entries(genreCount).sort((a, b) => b[1] - a[1])
      favoriteGenre.value = sorted.length ? sorted[0][0] : 'N/A'

      // QUIZZES & TOTAL XP
      quizzes.value = stats.quizzesCompleted?.length || 0
      let quizScore = 0
      if (stats.quizzesCompleted) {
        stats.quizzesCompleted.forEach((q) => {
          quizScore += q.score || 0
        })
      }
      totalXP.value = (completedBooks.value.length || 0) * 10 + (stats.pagesRead || 0) + quizScore

      renderChart()
    }

    onMounted(() => {
      import('chart.js').then(() => {
        auth.onAuthStateChanged((user) => {
          if (!user) return
          fetchUserData(user)
        })
      })
    })

    return {
      chartCanvas,
      streak,
      completedBooks,
      totalPagesRead,
      favoriteGenre,
      quizzes,
      totalXP,
    }
  },
}
</script>

<style scoped>

.glass-overlay {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.25);
}
.group:hover .wrapper{
  filter: blur(2px) brightness(0.9);
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
.streak {
  background: #f9f9f9;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.chart_insights {
  background: #f9f9f9;
  padding: 15px 15px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.chart_container {
  display: flex;
  justify-content: center;
  align-items: center;
}

section {
  background: transparent;
}
section div {
  background: transparent;
}
</style>
