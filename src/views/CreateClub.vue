<template>
  <section class="create_club_page min-h-screen flex items-center justify-center">
    <div class="card bg-white shadow-xl rounded-2xl w-full max-w-md p-6 flex flex-col gap-6">
      <!-- TITLE -->
      <div class="text-center">
        <h1 class="text-3xl font-bold">Create a Club</h1>
        <p class="text-gray-500 text-sm mt-1">Start a reading community 📚</p>
      </div>

      <!-- CLUB NAME -->
      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium">Club name</label>
        <input
          v-model="name"
          maxlength="40"
          placeholder="e.g. Atomic Habits Club"
          class="input input-bordered w-full"
        />
      </div>

      <!-- CLUB TYPE -->
      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium">Club type</label>

        <div class="flex gap-4">
          <button
            class="type-btn"
            :class="type === 'public' ? 'active' : ''"
            @click="type = 'public'"
          >
            🌍 Public
          </button>

          <button
            class="type-btn"
            :class="type === 'private' ? 'active' : ''"
            @click="type = 'private'"
          >
            🔒 Private
          </button>
        </div>
      </div>

      <!-- PASSWORD -->
      <div v-if="type === 'private'" class="flex flex-col gap-1">
        <label class="text-sm font-medium">Club password</label>
        <input
          v-model="password"
          type="password"
          placeholder="Enter 6-digit password"
          class="input input-bordered"
          max-length="6"
          @input="onlyNumbers()"
        />
        <span class="text-xs text-gray-400"> Members will need this to join </span>
      </div>

      <!-- ACTIONS -->
      <div class="flex justify-between mt-4">
        <button class="btn btn-outline" @click="$router.back()">Cancel</button>

        <button class="btn bg-blue-600 text-white" :disabled="loading" @click="createClub">
          {{ loading ? 'Creating...' : 'Create Club' }}
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { auth, db } from '@/firebase'
import { addDoc, collection, doc, updateDoc, arrayUnion } from 'firebase/firestore'

export default {
  data() {
    return {
      name: '',
      type: 'public',
      password: '',
      code: '',
      loading: false,
    }
  },

  methods: {
    onlyNumbers(e) {
      // Keep only digits
      let val = e.target.value.replace(/\D/g, '')
      // Limit to 6 characters
      if (val.length > 6) val = val.slice(0, 6)
      this.password = val
    },
    async createClub() {
      if (!this.name.trim()) {
        return alert('Club name is required')
      }

      if (this.type === 'private' && !this.password.trim()) {
        return alert('Password is required for private clubs')
      }

      if (!auth.currentUser) return

      this.loading = true

      try {
        // Create club
        const clubData = {
          name: this.name.trim(),
          type: this.type,
          password: this.type === 'private' ? this.password : '',
          creatorEmail: auth.currentUser.email,
          membersCount: 1,
          createdAt: new Date(),
        }

        const clubRef = await addDoc(collection(db, 'clubs'), clubData)

        // Add club to user
        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
          clubs: arrayUnion(clubRef.id),
        })

        // Go to club chat
        this.$router.push(`/clubs/chat/${clubRef.id}`)
      } catch (err) {
        console.error('Failed to create club:', err)
        alert('Something went wrong. Try again.')
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.create_club_page {
  background: linear-gradient(135deg, #f8fafc, #eef2ff);
}

.type-btn {
  flex: 1;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  font-weight: 500;
  transition: all 0.2s ease;
}

.type-btn:hover {
  background: #f3f4f6;
}
.card {
  padding: 25px 25px;
}
input {
  padding: 15px 15px;
}
.type-btn.active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}
button {
  padding: 0px 35px;
}
</style>
