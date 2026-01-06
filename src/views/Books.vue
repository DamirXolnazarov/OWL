<template>
  <section class="books w-full min-h-[100vh]">
    <!-- Header -->
    <div class="titles text-center flex w-full flex-col justify-between h-[85px]">
      <h1 class="text-5xl font-bold">Books Library</h1>
      <p class="text-gray-500 text-[18px]">
        All completed books across the Owlie community
      </p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-20 text-gray-500">
      Loading books...
    </div>

    <!-- Empty -->
    <div
      v-else-if="books.length === 0"
      class="text-center py-20 text-gray-500"
    >
      No completed books yet.
    </div>

    <!-- Books Grid -->
    <div
      v-else
      class="bookDisplay w-full flex flex-row gap-[15px]"
    >
      <div
        v-for="book in books"
        :key="book.key"
        class="w-[20%] h-[220px] bookcard border-2 bg-white shadow flex flex-col justify-between"
      >
        <!-- Info -->
        <div class="flex flex-col h-[70%] justify-between">
            <div class="titles">

                <h2 class="text-[25px] font-semibold leading-tight">
                    {{ book.title }}
                </h2>
                <p class="text-[15px] text-gray-500 mt-1">
                    by {{ book.author }}
                </p>
            </div>

          <div class="space-y-1 text-[15px]">
            <p>👥 Read by {{ book.readersCount }}</p>
            <p>⭐ {{ book.averageRating }}</p>
            <p>📄 {{ book.pages }} pages</p>
          </div>
        </div>

        <!-- Explore -->
        <router-link
         :to="`/books/${encodeURIComponent(book.key)}`"
          class="btn bg-black text-white hover:opacity-90 transition"
        >
          Explore
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/firebase"

const books = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    // 1. Fetch all users
    const usersSnap = await getDocs(collection(db, "users"))
    console.log("Users count:", usersSnap.size)

    // 2. Aggregation map
    const booksMap = {}

    // 3. Loop through users
    usersSnap.forEach(doc => {
      const user = doc.data()

      // IMPORTANT: correct path
      const completedBooks = Array.isArray(user?.stats?.completedBooks)
        ? user.stats.completedBooks
        : []

      completedBooks.forEach(book => {
        // Safe checks
        if (!book?.name || typeof book.rating !== "number") return

        const key = book.name.toLowerCase().trim()

        if (!booksMap[key]) {
          booksMap[key] = {
            key,
            title: book.name,
            author: book.author || "Unknown author",
            pages: book.pages || 0,
            readersCount: 1,
            ratingSum: book.rating,
            averageRating: book.rating
          }
        } else {
          booksMap[key].readersCount += 1
          booksMap[key].ratingSum += book.rating
          booksMap[key].averageRating = Number(
            (
              booksMap[key].ratingSum /
              booksMap[key].readersCount
            ).toFixed(2)
          )
        }
      })
    })

    // 4. Convert to array + sort
    books.value = Object.values(booksMap).sort(
      (a, b) => b.readersCount - a.readersCount
    )

    console.log("Aggregated books:", books.value)
  } catch (err) {
    console.error("Failed to load books:", err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.books{
    padding: 50px 90px 50px 90px;
}
.bookDisplay{
    padding: 35px 0px;
}

.bookcard{
    padding: 15px 15px;
}
</style>

