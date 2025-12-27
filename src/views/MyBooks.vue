<template>
  <section class="books_page flex flex-col items-left gap-8">
    <h1 class="text-[50px] font-semibold text-center">My Books</h1>

    <!-- CURRENT BOOK -->
    <div
      v-if="currentBook"
      class="current_book flex flex-col justify-between border p-4 rounded-lg w-[250px] h-[250px] shadow"
    >
      <h2 class="text-xl font-semibold">Book: {{ currentBook.name }}</h2>

      <div class="infos text-[13px]">
        <p>Author: {{ currentBook.author }}</p>
        <p>Pages: {{ currentBook.pages }}</p>
        <p>Genres: {{ currentBook.type.join(', ') }}</p>
      </div>
      <div class="text-[10px] text-grey katta">
        <span>Pages Read:</span>
        <div class="PagesRea flex items-center w-full justify-between">
          <input
            type="number"
            min="0"
            :max="currentBook.pages"
            v-model.number="pagesRead"
            class="input input-bordered w-[95px]"
          />
          <button class="btn bg-blue-500 text-white updatee" @click="updateProgress">Update</button>
        </div>
      </div>

      <div class="flex justify-center mt-2">
        <button class="btn btttns bg-red-500 text-white" @click="deleteCurrentBook">Delete</button>
        <!-- <button class="btn btttns bg-green-600 text-white" @click="openReflectModal">
          Reflect
        </button> -->
      </div>
    </div>

    <!-- ADD BOOK -->
    <div v-if="!currentBook">
      <button class="btn adding" @click="addBookModal = true">Add a Book</button>
    </div>

    <!-- COMPLETED BOOKS -->
    <div v-if="completedBooks.length" class="completed_books w-full flex flex-col gap-4">
      <h2 class="text-2xl font-bold">Completed Books</h2>

      <div class="boook flex flex-wrap flex-row gap-[15px]">
        <div
          v-for="(book, index) in completedBooks"
          :key="book.name + index"
          class="completed_book border p-3 rounded-lg flex flex-col justify-between"
        >
          <div class="details flex flex-col">
            <span class="font-semibold text-[25px]">{{ book.name }}</span>
            <span>by {{ book.author }}</span>
          </div>

          <div class="rankings">
            <!-- STARS -->
            <div class="flex items-center text-[13px]">
              <span class="ratting"> Rating: </span>
              <span
                v-for="i in 5"
                :key="i"
                class="text-xl"
                :class="i <= book.rating ? 'text-yellow-400' : 'text-gray-300'"
              >
                ★
              </span>
            </div>

            <!-- REFLECTION (2 lines) -->
            <span class="text-[13px]">Reflection:</span>
            <p class="italic text-[12px] line-clamp-3">
              {{ book.reflection }}
            </p>
          </div>

          <div class="flex justify-between">
            <button
              v-if="!book.reflected"
              class="btn btttns btn-sm bg-green-500 text-white"
              @click="openReflectModal(index)"
            >
              Reflect
            </button>

            <button v-else class="btn btttns btn-sm" @click="openReflectModal(index)">
              Change
            </button>

            <button
              class="btn btttns btn-sm bg-red-500 text-white"
              @click="deleteCompletedBook(index)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ADD BOOK MODAL -->
    <div
      v-if="addBookModal"
      class="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
    >
      <div class="bg-white p-6 rounded addding w-[400px] flex flex-col gap-4">
        <h2 class="text-xl font-bold">Add a Book</h2>

        <input
          v-model="newBook.name"
          maxlength="50"
          placeholder="Book title"
          class="input w-full input-bordered"
        />
        <input
          v-model="newBook.author"
          maxlength="50"
          placeholder="Author"
          class="input w-full input-bordered"
        />
        <input
          v-model.number="newBook.pages"
          type="number"
          min="1"
          placeholder="Pages"
          class="input w-full input-bordered"
        />

        <!-- GENRE DROPDOWN -->
        <!-- Genre Selection Modal / List -->
        <div class="w-full relative">
          <button
            @click="genreModalOpen = !genreModalOpen"
            class="btn w-full justify-between nimadir"
          >
            {{ newBook.type.length ? newBook.type.join(', ') : 'Select Genres (up to 3)' }}
            <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <!-- Modal-style List -->
          <div
            v-if="genreModalOpen"
            class="absolute z-50 w-full max-h-60 overflow-auto bg-base-100 shadow-lg rounded"
          >
            <ul class="flex flex-col">
              <li v-for="genre in allGenres" :key="genre">
                <label class="flex items-center h-[15px] text-[15px] gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    class="checkbox checkbox-primary h-[16px]"
                    :value="genre"
                    v-model="newBook.type"
                    :disabled="!newBook.type.includes(genre) && newBook.type.length >= 3"
                  />
                  <span>{{ genre }}</span>
                </label>
              </li>
            </ul>
            <div class="flex justify-center">
              <button @click="genreModalOpen = false" class="btn btttns btn-sm">Done</button>
            </div>
          </div>
        </div>

        <div class="flex justify-around">
          <button class="btn btttns bg-gray-400 text-white" @click="addBookModal = false">
            Cancel
          </button>
          <button
            class="btn btttns bg-green-500 text-white"
            :disabled="newBook.type.length === 0"
            @click="submitNewBook"
          >
            Add
          </button>
        </div>
      </div>
    </div>

    <!-- REFLECTION MODAL -->
    <div
      v-if="reflectModal"
      class="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
    >
      <div class="bg-white addding p-6 rounded w-[400px] flex flex-col gap-4">
        <h2 class="text-xl font-bold">Reflect</h2>

        <div class="flex gap-2 items-center">
          <span class="text-[18px]">Rating:</span>
          <span
            v-for="i in 5"
            :key="i"
            class="text-3xl cursor-pointer"
            :class="i <= reflectionRating ? 'text-yellow-400' : 'text-gray-300'"
            @click="reflectionRating = i"
          >
            ★
          </span>
        </div>
        <span class="text-[18px]">Reflection:</span>
        <textarea
          v-model="reflectionText"
          maxlength="400"
          rows="5"
          class="textarea textarea-bordered"
        ></textarea>

        <span class="text-sm">{{ wordCount(reflectionText) }}/400 words</span>

        <div class="flex justify-around">
          <button class="btn btttns bg-gray-400 text-white" @click="reflectModal = false">
            Cancel
          </button>
          <button class="btn btttns bg-green-600 text-white" @click="submitReflection">
            Submit
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { auth, db } from '@/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

export default {
  data() {
    return {
      userData: null,
      currentBook: null,
      completedBooks: [],
      pagesRead: 0,
      genreError: false,
      reflectingIndex: null,

      addBookModal: false,
      reflectModal: false,

      reflectionRating: 0,
      reflectionText: '',
      genreModalOpen: false,
      allGenres: [
        'Fiction',
        'Non-fiction',
        'Fantasy',
        'Science Fiction',
        'Mystery',
        'Romance',
        'Biography',
        'History',
        'Horror',
        'Self-help',
      ],
      newBook: { name: '', author: '', pages: 0, type: [] },
    }
  },

  mounted() {
    onAuthStateChanged(auth, async (user) => {
      if (!user) return
      const snap = await getDoc(doc(db, 'users', user.uid))
      if (!snap.exists()) return

      this.userData = snap.data()

      // Load current book if exists
      this.currentBook = this.userData.stats.booksInProgress?.name
        ? this.userData.stats.booksInProgress
        : null

      // Set pagesRead to the current book's progress, or 0 if no current book
      this.pagesRead = this.currentBook?.pagesRead || 0

      // Load completed books
      this.completedBooks = this.userData.stats.completedBooks || []
      this.userData.stats.dailyPages = this.userData.stats.dailyPages || {}
      this.userData.stats.streak = this.userData.stats.streak || {
        current: 0,
        longest: 0,
        lastReadDate: null,
      }
    })
  },
  methods: {
    toggleGenre(genre) {
      if (this.newBook.type.includes(genre)) {
        this.newBook.type = this.newBook.type.filter((g) => g !== genre)
      } else if (this.newBook.type.length < 3) {
        this.newBook.type.push(genre)
      }
    },

    wordCount(t) {
      return t.trim() ? t.trim().split(/\s+/).length : 0
    },

    async updateProgress() {
  if (!this.currentBook) return
  const userRef = doc(db, 'users', auth.currentUser.uid)

  const stats = this.userData.stats || {}

  // Ensure dailyPages and streak exist
  stats.dailyPages = stats.dailyPages || {}
  stats.streak = stats.streak || { current: 0, longest: 0, lastReadDate: null }

  // Calculate pages added
  const previousPages = this.currentBook.pagesRead || 0
  const pagesAdded = this.pagesRead - previousPages
  if (pagesAdded <= 0) return

  // Update current book pages
  this.currentBook.pagesRead = this.pagesRead

  // Update total pages read including completed books
  const completedPages = this.completedBooks.reduce((sum, book) => sum + (book.pages || 0), 0)
  const totalPagesRead = completedPages + this.currentBook.pagesRead

  // Update dailyPages for today
  const today = new Date().toISOString().split('T')[0]
  stats.dailyPages[today] = (stats.dailyPages[today] || 0) + pagesAdded

  // Update streak
  if (stats.streak.lastReadDate !== today) {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]

    if (stats.streak.lastReadDate === yesterdayStr) {
      stats.streak.current += 1
    } else {
      stats.streak.current = 1
    }
    stats.streak.longest = Math.max(stats.streak.longest, stats.streak.current)
    stats.streak.lastReadDate = today
  }

  // Save updates to Firestore
  await updateDoc(userRef, {
    'stats.booksInProgress.pagesRead': this.currentBook.pagesRead,
    'stats.pagesRead': totalPagesRead,
    'stats.dailyPages': stats.dailyPages,
    'stats.streak': stats.streak,
  })

  // Update local copy
  this.userData.stats.dailyPages = stats.dailyPages
  this.userData.stats.streak = stats.streak

  // Move to completedBooks if finished
  if (this.pagesRead >= this.currentBook.pages) {
    alert(`You successfully finished the book "${this.currentBook.name}"!`)

    const completedBook = {
      ...this.currentBook,
      rating: 0,
      reflection: '',
      reflected: false,
    }

    this.completedBooks.push(completedBook)
    await updateDoc(userRef, {
      'stats.completedBooks': this.completedBooks,
      'stats.booksInProgress': {},
      'stats.pagesRead': completedPages + completedBook.pages,
    })

    this.currentBook = null
    this.pagesRead = 0
  }
}
,
    async submitNewBook() {
      // RESET ERROR
      this.genreError = false

      if (
        !this.newBook.name ||
        !this.newBook.author ||
        this.newBook.pages <= 0 ||
        this.newBook.type.length === 0
      ) {
        if (this.newBook.type.length === 0) {
          this.genreError = true
        }
        return
      }

      this.currentBook = this.newBook
      this.newBook = { name: '', author: '', pages: 0, type: [] }
      this.addBookModal = false

      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        'stats.booksInProgress': this.currentBook,
        'stats.pagesRead': 0,
      })
    },

    deleteCurrentBook() {
      this.currentBook = null
      updateDoc(doc(db, 'users', auth.currentUser.uid), {
        'stats.booksInProgress': {},
        'stats.pagesRead': 0,
      })
    },

    openReflectModal(index) {
      this.reflectingIndex = index
      this.reflectionRating = this.completedBooks[index].rating || 0
      this.reflectionText = this.completedBooks[index].reflection || ''
      this.reflectModal = true
    },

    async submitReflection() {
      if (!this.reflectionRating || this.wordCount(this.reflectionText) > 400) return

      const index = this.reflectingIndex
      if (index === null) return

      // UPDATE EXISTING BOOK
      this.completedBooks[index] = {
        ...this.completedBooks[index],
        rating: this.reflectionRating,
        reflection: this.reflectionText,
        reflected: true, // <-- IMPORTANT FLAG
      }

      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        'stats.completedBooks': this.completedBooks,
      })

      // reset modal state
      this.reflectModal = false
      this.reflectingIndex = null
      this.reflectionRating = 0
      this.reflectionText = ''
    },
    editCompletedBook(index) {
      const book = this.completedBooks.splice(index, 1)[0]
      this.currentBook = book
      this.reflectionRating = book.rating
      this.reflectionText = book.reflection
      this.reflectModal = true
    },

    async deleteCompletedBook(index) {
      const book = this.completedBooks[index]

      // Subtract pages from total pagesRead
      this.userData.stats.pagesRead -= book.pages

      // Remove book from local array
      this.completedBooks.splice(index, 1)

      // Update Firestore
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        'stats.completedBooks': this.completedBooks,
        'stats.pagesRead': this.userData.stats.pagesRead,
      })
    },
  },
}
</script>

<style scoped>
.nimadir {
  padding: 10px 15px;
}
.btttns {
  padding: 15px 25px;
}

.ratting {
  margin-right: 10px;
}
.completed_book {
  width: 250px;
  height: 280px;
  padding: 10px 20px 20px 20px;
}
.updatee {
  padding: 15px 20px;
}
.current_book {
  width: 250px;
  height: 280px;
  padding: 10px 20px 20px 20px;
}

.cancell {
  padding: 15px 30px;
}
.books_page {
  padding: 20px 90px;
  min-height: 100vh;
}
.textarea {
  padding: 15px 15px;
}
.adding {
  padding: 130px 50px;
  background: gray;
  font-size: 25px;
}
.addding {
  padding: 20px 25px;
}
input {
  padding: 0px 15px;
}

label {
  padding: 15px 15px;
}
</style>
