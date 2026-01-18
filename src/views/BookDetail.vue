<template>
  <section class="bookpage flex flex-col justify-center items-center">
    <div class="btns w-full flex flex-row justify-start">
      <!-- Back -->
      <button class="btn text-gray-500" @click="$router.push('/books')">← Back to Books</button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center text-gray-500 py-20">Loading book...</div>

    <!-- Not found -->
    <div v-else-if="!book" class="text-center text-gray-500 py-20">Book not found.</div>

    <!-- Book content -->
    <div v-else class="w-[65%] bookCard">
      <!-- Header -->
      <div class="w-full">
        <h1 class="text-5xl text-center font-bold leading-tight">
          {{ book.title }}
        </h1>
        <p class="text-center text-gray-500 mt-1">by {{ book.author }}</p>
        <br />
        <div class="flex dd flex-row text-[22px] border-1 h-[150px] w-full justify-between">
          <div class="title flex flex-row items-center justify-center w-[60%]">
            <span class="font-semibold text-[25px] text-center">Book Statistics</span>
          </div>
          <div class="details flex flex-col w-[40%] items-start h-full justify-between">
            <span class="text-[20px]">⭐ {{ book.averageRating }} </span>
            <span class="text-[20px]">👥 {{ book.readersCount }} readers </span>
            <span class="text-[20px]">📄 {{ book.pages }} pages</span>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <hr class="my-8" />

      <!-- Reviews -->
      <div class="reviewSec">
        <h2 class="text-[25px] font-semibold mb-4">Reviews & Reflections</h2>
        <br />
        <div v-if="reviews.length === 0" class="text-gray-500">No reflections yet.</div>

        <div v-else class="space-y-6">
          <div
            v-for="(review, index) in reviews"
            :key="index"
            class="card p-4 rounded-xl bg-gray-100"
          >
            <div class="flex justify-between items-center">
              <p class="font-medium">
                {{ review.username }}
              </p>
              <div class="text-yellow-400">
                <span
                  v-for="i in 5"
                  :key="i"
                  class="text-lg"
                  :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'"
                >
                  ★
                </span>
              </div>
            </div>

            <p class="mt-2 text-sm italic">
              {{ review.reflection }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'

const route = useRoute()

const book = ref(null)
const reviews = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const bookKey = decodeURIComponent(route.params.title).toLowerCase().trim()

    const usersSnap = await getDocs(collection(db, 'users'))

    let ratingSum = 0
    let readersCount = 0
    let bookMeta = null

    usersSnap.forEach((doc) => {
      const user = doc.data()
      const username = user.username || 'Anonymous'

      const completedBooks = Array.isArray(user?.stats?.completedBooks)
        ? user.stats.completedBooks
        : []

      completedBooks.forEach((b) => {
        if (!b?.name) return

        if (b.name.toLowerCase().trim() === bookKey) {
          // Set book metadata once
          if (!bookMeta) {
            bookMeta = {
              title: b.name,
              author: b.author || 'Unknown author',
              pages: b.pages || 0,
            }
          }

          readersCount++
          ratingSum += typeof b.rating === 'number' ? b.rating : 0

          // Collect reviews only if reflected
          if (b.reflected && b.reflection) {
            reviews.value.push({
              username,
              rating: b.rating,
              reflection: b.reflection,
            })
          }
        }
      })
    })

    if (bookMeta) {
      book.value = {
        ...bookMeta,
        readersCount,
        averageRating: readersCount > 0 ? Number((ratingSum / readersCount).toFixed(2)) : 0,
      }
    }
  } catch (err) {
    console.error('Failed to load book detail:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.bookpage {
  padding: 50px 90px 50px 90px;
}
.reviewSec {
  padding: 25px 0px;
}
.card {
  padding: 15px 15px;
  margin-top: 15px;
}
button {
  padding: 0px 15px;
}
.box {
  padding: 15px 0px;
}
.bookCard {
  padding: 15px 35px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
}
.dd {
  padding: 15px 15px;
}
</style>
