<template>
  <div class="feedback-wrapper">
    <!-- Floating Circle -->
    <button
      class="info-btn"
      @click="toggle"
      :class="{ open }"
    >
      i
    </button>

    <!-- Panel -->
    <transition name="liquid">
      <div v-if="open" class="panel">
        <textarea
          v-model="message"
          placeholder="Suggestion or issue…"
          rows="2"
        />

        <button
          class="send-btn"
          @click="send"
          :disabled="!message.trim()"
        >
          ➤
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
      message: '',
    }
  },
  methods: {
    toggle() {
      this.open = !this.open
    },

    async send() {
      if (!this.message.trim()) return

      const BOT_TOKEN = '8577262066:AAFQDd-5X3inrVI0b46kXXGZ4DnhPS9qyuo'
      const CHAT_ID = '-1003395972037'

      const text = `📩 Feedback:\n${this.message}`

      try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text,
          }),
        })

        this.message = ''
        this.open = false
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>

<style scoped>
/* Wrapper */
.feedback-wrapper {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  font-family: Poppins, system-ui;
}

/* Circle Button */
.info-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(145deg, #1e90ff, #007aff);
  color: white;
  font-size: 26px;
  font-weight: 700;
  border: none;
  cursor: pointer;

  box-shadow:
    0 10px 25px rgba(0, 122, 255, 0.35),
    inset 0 1px 1px rgba(255,255,255,0.4);

  transition:
    transform 0.35s cubic-bezier(.34,1.56,.64,1),
    box-shadow 0.35s ease;
}

.info-btn:hover {
  transform: scale(1.08);
}

.info-btn:active {
  transform: scale(0.92);
}

.info-btn.open {
  transform: rotate(90deg) scale(1.05);
}

/* Panel */
.panel {
  margin-top: 12px;
  width: 280px;
  padding: 12px;
  border-radius: 18px;

  display: flex;
  gap: 10px;
  align-items: center;

  background: rgba(25, 25, 25, 0.7);
  backdrop-filter: blur(20px) saturate(160%);
  -webkit-backdrop-filter: blur(20px);

  box-shadow:
    0 20px 40px rgba(0,0,0,0.35),
    inset 0 1px 1px rgba(255,255,255,0.1);
}

/* Textarea */
textarea {
  flex: 1;
  resize: none;
  border-radius: 14px;
  padding: 10px 12px;
  background: rgba(0,0,0,0.6);
  color: white;
  border: none;
  font-size: 14px;
  outline: none;

  transition: box-shadow 0.25s ease;
}

textarea:focus {
  box-shadow: inset 0 0 0 1px #007aff;
}

/* Send Button */
.send-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(145deg, #1e90ff, #007aff);
  color: white;
  font-size: 18px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  transition:
    transform 0.25s cubic-bezier(.34,1.56,.64,1),
    opacity 0.25s ease;
}

.send-btn:hover {
  transform: scale(1.1);
}

.send-btn:active {
  transform: scale(0.9);
}

.send-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Liquid animation */
.liquid-enter-active,
.liquid-leave-active {
  transition: all 0.45s cubic-bezier(.34,1.56,.64,1);
}

.liquid-enter-from {
  opacity: 0;
  transform: translateY(10px) scale(0.85);
}

.liquid-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.85);
}
</style>


