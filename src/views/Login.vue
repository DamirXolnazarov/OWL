<script setup>
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
</script>

<template>
  <section class="w-full h-full flex flex-row justify-center items-center">
    <div
      class="login w-[390px] shadow-md flex flex-col justify-between items-center bg-[#000] h-[430px]"
    >
      <div class="title w-full flex justify-center">
        <span class="text-center text-5xl text-white">Sign Up</span>
      </div>
      <div class="inputs h-[210px] flex flex-col justify-between w-full">
        <div class="input_email w-full flex flex-col justify-between h-[80px]">
          <div class="input_text w-full flex-row flex justify-between">
            <span class="email opacity-[80%] text-white">Email</span>
            <span class="opacity-[0]" :class="{ visible: visible == false }"
              >Incorrect password!</span
            >
          </div>
          <input
            v-model="email"
            :class="{ visibleInp: visible == false }"
            placeholder="you@example.com"
            type="text"
          />
        </div>
        <div class="input_password w-full flex flex-col justify-between h-[110px]">
          <div class="input_text w-full flex-row flex justify-between">
            <span class="email opacity-[80%] text-white">Password</span>
          </div>
          <input
            v-model="password"
            :class="{ visibleInp: visible == false }"
            type="password"
            placeholder="******"
          />
          <div class="create w-full flex flex-row justify-end">
          </div>
        </div>
      </div>
      <div class="buttons w-full flex flex-justify justify-center">
        <button class="btn loginbtn" @click="check()">Log in</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      correct_account: false,
      visible: true,
    }
  },
  methods: {
    async ensureUserExists(user) {
      const userRef = doc(db, 'users', user.uid)
      const snap = await getDoc(userRef)

      if (!snap.exists()) {
        const username = this.email.split('@')[0]

        await setDoc(userRef, {
          email: this.email,
          username,
          createdAt: new Date(),
          stats: {
            booksInProgress: {
              author: '',
              name: '',
              pages: 0,
              type: [],
              rating: 0,
              streak: {
                current: 0,
                longest: 0,
                lastReadDate: null,
              },
              dailyPages: {},
            },
            booksCompleted: 0,

            pagesRead: 0,
            quizzesCompleted: [],
            friends: [],
            clubs: [],
          },
        })
      }
    },

    async check() {
      this.visible = true

      try {
        // try login
        const cred = await signInWithEmailAndPassword(auth, this.email, this.password)

        await this.ensureUserExists(cred.user)
        this.$router.push('/dashboard')
      } catch (error) {
        try {
          // if user doesn't exist → create account
          const cred = await createUserWithEmailAndPassword(auth, this.email, this.password)

          await this.ensureUserExists(cred.user)
          this.$router.push('/dashboard')
        } catch {
          // wrong password, weak password, etc.
          this.visible = false
        }
      }
    },
  },
}
</script>

<style scoped>

.visibleInp {
  border: 2px solid red;
}
.visible {
  color: red;
  opacity: 100%;
  font-weight: 300;
}
.additionals {
  font-size: 16px;
  color: #0080ff;
  cursor: pointer;
  font-weight: 300;
}
.input_text .email {
  font-weight: 300;
  font-size: 19px;
  letter-spacing: 1px;
}
input {
  padding: 15px 15px;
  width: 330px;
  height: 45px;
  color: white;
  font-weight: normal;
  border: 2px solid #ffffff;
  border-radius: 9px;
}
input::placeholder {
  color: grey;
}
section {
  padding: 80px 0px;
  font-family: 'Poppins';
  font-weight: 600;
}
* {
  box-sizing: border-box;
}

input,
button {
  max-width: 100%;
}
@media (max-width: 640px) {
  section {
    padding: 40px 15px;
  }

  .login {
    width: 100%;
    max-width: 360px;
    height: auto;
    padding: 30px 20px;
  }
}
@media (max-width: 640px) {
  input {
    width: 100%;
    height: 44px;
    font-size: 15px;
  }

  .inputs {
    height: auto;
    gap: 18px;
  }

  .input_email,
  .input_password {
    height: auto;
    gap: 10px;
  }
}
@media (max-width: 640px) {
  .title span {
    font-size: 36px;
  }

  .loginbtn {
    font-size: 20px;
    padding: 18px 35px;
  }
}
@media (max-width: 640px) {
  .input_text {
    flex-direction: column;
    gap: 4px;
  }

  .visible {
    font-size: 13px;
  }

  .input_text .email {
    font-size: 16px;
  }
}
@media (max-width: 380px) {
  .login {
    padding: 25px 16px;
  }

  .loginbtn {
    width: 100%;
  }
}

.login {
  padding: 35px 30px;
  border-radius: 15px;
}
.loginbtn {
  padding: 25px 50px;
  font-size: 27px;
  font-weight: 700;
}
</style>
