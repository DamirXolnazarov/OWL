<template>
  <section class="pagge w-full h-screen">
    <div class="chatty h-[90%] w-full club_chat_page flex flex-col">
      <!-- HEADER -->
      <header class="chat_header h-[60px] w-full flex items-center">
        <button class="leave btn btn-lg btn-ghost" @click="$router.push('/clubs')">←</button>
        <div class="davay w-full flex flex-row justfy-between items-center">
          <div class="clubName">
            <h1 class="font-semibold text-[25px]">{{ club?.name || 'Club' }}</h1>
          </div>
          <div class="memberam text-right">
            <span class="text-[15px] text-gray-500"> {{ club?.membersCount || 0 }} members </span>
          </div>
        </div>
      </header>

      <!-- MESSAGES -->
      <div ref="messagesContainer" class="messages flex-1 overflow-y-auto flex flex-col gap-3">
        <div
          v-for="msg in messages"
          :key="msg.id"
          class="message flex"
          :class="msg.userId === user?.uid ? 'justify-end' : 'justify-start'"
        >
          <div
            class="bubble max-w-[75%] rounded-2xl text-sm"
            :class="
              msg.userId === user?.uid
                ? 'bg-blue-600 text-white rounded-br-sm'
                : 'bg-gray-100 text-black rounded-bl-sm'
            "
          >
            <p v-if="msg.userId !== user?.uid" class="text-xs font-semibold mb-1 opacity-70">
              {{ msg.username }}
            </p>
            <p>{{ msg.text }}</p>
            <span class="text-[10px] opacity-60 block mt-1 text-right">
              {{ formatTime(msg.createdAt) }}
            </span>
          </div>
        </div>
        <div
          class="messageeno w-full h-full flex flex-row justify-center items-center"
          v-if="!messages.length"
        >
          <p class="text-center text-gray-400 mt-10">No messages yet. Start the conversation 👋</p>
        </div>
      </div>

      <!-- INPUT -->
      <form class="chat_input flex items-center border-t" @submit.prevent="sendMessage">
        <input
          v-model="newMessage"
          maxlength="1000"
          placeholder="Type a message..."
          class="input input-bordered flex-1 rounded-full"
        />
        <button
          class="btn send bg-blue-600 text-white rounded-full px-5"
          :disabled="!newMessage.trim()"
        >
          Send ➤
        </button>
      </form>
    </div>
  </section>
</template>

<script>
import { auth, db } from '@/firebase'
import {
  doc,
  getDoc,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

export default {
  data() {
    return {
      club: null,
      messages: [],
      newMessage: '',
      user: null,
      userData: null,
      unsubscribe: null,
    }
  },

  async mounted() {
    onAuthStateChanged(auth, async (user) => {
      if (!user) return
      this.user = user

      await this.loadClub()
      await this.loadUser()
      this.listenToMessages()
    })
  },

  beforeUnmount() {
    if (this.unsubscribe) this.unsubscribe()
  },

  methods: {
    async loadClub() {
      const clubRef = doc(db, 'clubs', this.$route.params.id)
      const snap = await getDoc(clubRef)
      if (snap.exists()) {
        this.club = snap.data()
      }
    },

    async loadUser() {
      const userRef = doc(db, 'users', auth.currentUser.uid)
      const snap = await getDoc(userRef)
      if (snap.exists()) {
        this.userData = snap.data()
      }
    },

    listenToMessages() {
      const messagesRef = collection(db, 'clubs', this.$route.params.id, 'messages')

      const q = query(messagesRef, orderBy('createdAt'))

      this.unsubscribe = onSnapshot(q, (snap) => {
        this.messages = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
        this.$nextTick(this.scrollToBottom)
      })
    },

    async sendMessage() {
      if (!this.newMessage.trim()) return

      const messagesRef = collection(db, 'clubs', this.$route.params.id, 'messages')

      await addDoc(messagesRef, {
        text: this.newMessage.trim(),
        userId: this.user.uid,
        username: this.userData?.username || 'Anonymous',
        createdAt: serverTimestamp(),
      })

      this.newMessage = ''
    },

    scrollToBottom() {
      const el = this.$refs.messagesContainer
      if (el) el.scrollTop = el.scrollHeight
    },

    formatTime(ts) {
      if (!ts?.toDate) return ''
      return ts.toDate().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    },
  },
}
</script>

<style scoped>
.club_chat_page {
  background: #f9fafb;
  border-radius: 15px 15px 25px 25px;
  box-shadow: 0px 12px 20px rgb(182, 182, 182);
}
.davay {
  display: flex;
  justify-content: space-between;
  padding: 0px 25px 0px 15px;
}
.chat_header {
  border-bottom: 2px solid rgb(170, 170, 170);
  background: white;
}
.bubble {
  padding: 15px 15px;
}
.messages::-webkit-scrollbar {
  width: 4px;
}

.messages {
  padding: 15px 15px;
}

.messages::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 10px;
}
.pagge {
  padding: 50px 90px 50px 90px;
}
.leave {
  padding: 15px 15px;
}
input {
  padding: 15px 25px;
  height: 50px;
}
.send {
  padding: 25px 35px;
  display: flex;
  justify-content: space-between;
  border-radius: 0px 0px 25px 0px;
  cursor: pointer;
}
input {
  outline: none; /* removes default focus outline */
  border: 1px solid #ccc; /* optional custom border */
  transition:
    border 0.2s,
    box-shadow 0.2s;
  border-radius: 0px 0px 0px 25px;
}

input:focus {
  border-color: none; /* custom focus color */
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2); /* soft glow */
}
</style>
