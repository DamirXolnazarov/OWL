<template>
  <section class="profile_page w-full flex flex-col justify-start items-center">
    <h1 class="text-5xl font-semibold text-center">Profile</h1>
    <div class="blokcc flex flex-col justify-between">
      <div class="dataaas flex flex-row justify-between">
        <div class="left flex flex-col h-[120px] justify-around">
          <label class="label">Username:</label>
          <label class="label">Email:</label>
          <label class="label">New Password:</label>
        </div>
        <div class="right w-[65%] flex flex-col h-[120px] justify-between">
          <input
            class="input input-bordered"
            v-model="form.username"
            :disabled="!isEditing"
            maxlength="30"
          />

          <!-- EMAIL (READ ONLY) -->
          <input class="input input-bordered bg-gray-100" :value="user?.email" disabled />

          <!-- PASSWORD -->
          <input
            type="password"
            class="input input-bordered"
            v-model="form.password"
            :disabled="!isEditing"
            placeholder="Leave empty to keep current password"
          />
        </div>
      </div>

      <!-- USERNAME -->

      <!-- ACTION BUTTONS -->
      <div class="flex justify-around">
        <button v-if="!isEditing" class="btn btn-primary btttns" @click="enableEdit">Change</button>

        <button v-if="isEditing" class="btn btn-success btttns" @click="saveChanges">Save</button>

        <button class="btn btn-error btttns" @click="deleteAccount">Delete Account</button>
      </div>
    </div>
  </section>
</template>

<script>
import { auth, db } from '@/firebase'
import { updatePassword, deleteUser, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { collection, query, where, getDocs } from 'firebase/firestore'

import { EmailAuthProvider, reauthenticateWithCredential, getAuth } from 'firebase/auth'
import { getFirestore, deleteDoc } from 'firebase/firestore'

export default {
  data() {
    return {
      user: null,
      userData: null,
      isEditing: false,
      form: {
        username: '',
        password: '',
      },
    }
  },

  mounted() {
    onAuthStateChanged(auth, async (user) => {
      if (!user) return
      this.user = user

      const snap = await getDoc(doc(db, 'users', user.uid))
      if (snap.exists()) {
        this.userData = snap.data()
        this.form.username = this.userData.username
      }
    })
  },

  methods: {
    enableEdit() {
      this.isEditing = true
    },

    async saveChanges() {
      if (!this.user) return

      try {
        // UPDATE USERNAME (Firestore)
        if (this.form.username !== this.userData.username) {
          // 🔍 check if username already exists
          const q = query(collection(db, 'users'), where('username', '==', this.form.username))

          const snap = await getDocs(q)

          // if found and not current user → stop
          if (!snap.empty && snap.docs[0].id !== this.user.uid) {
            alert('Username already taken')
            return
          }

          // ✅ safe to update
          await updateDoc(doc(db, 'users', this.user.uid), {
            username: this.form.username,
          })
        }

        // UPDATE PASSWORD (Auth)
        if (this.form.password.length >= 6) {
          await updatePassword(this.user, this.form.password)
        }

        this.isEditing = false
        this.form.password = ''
        alert('Profile updated successfully!')
      } catch (err) {
        alert(err.message)
      }
    },

    async deleteAccount() {
      alert('Sorry bro, why would you want to delete your account? Just, chill!')
    },
  },
}
</script>

<style scoped>
.btttns {
  padding: 15px 25px;
}
.profile_page {
  padding: 40px 0px;
  min-height: 70vh;
}
.blokcc {
  margin-top: 50px;
  width: 100%;
  max-width: 500px;
  min-height: 220px;
  border-radius: 14px;
  padding: 20px 30px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.leaderboard_row {
  width: 900px;
  height: 80px;
  background-color: white;
  padding: 15px 25px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.leaderboard_page {
  padding: 50px 0px;
  min-height: 100vh;
}
.input {
  padding: 5px 15px;
  width: 100%;
}

/* =========================
   RESPONSIVE PROFILE PAGE
========================= */

/* Tablets */
@media (max-width: 900px) {
  .blokcc {
    padding: 20px;
  }
  .label{
    display: none;
  }
  h1 {
    font-size: 42px;
  }
}

/* Phones */
@media (max-width: 640px) {
  .profile_page {
    padding: 30px 25px;
  }

  h1 {
    font-size: 32px;
  }

  .dataaas {
    flex-direction: column;
    gap: 14px;
  }

  .left,
  .right {
    width: 100%;
    height: auto;
  }

  .left {
    gap: 12px;
  }

  .right {
    gap: 12px;
  }

  .label {
    font-size: 14px;
  }

  .blokcc {
    gap: 18px;
    min-height: auto;
  }

  .btttns {
    width: 100%;
  }

  .blokcc > div:last-child {
    flex-direction: column;
    gap: 10px;
  }
}

</style>
