<script setup>
import { RouterLink } from 'vue-router'
import { auth } from '@/firebase'
import { db } from '@/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
</script>

<template>
  <section class="content">
    <div class="title">
      <h1 class="text-[45px] font-semibold text-gray-900 leading-tight tracking-tight">
        Welcome, {{ userData?.username }}!
      </h1>
    </div>
    <div class="sections flex flex-col gap-6">
      <div class="first_layer flex flex-row justify-between gap-7">
        <div class="first_layer1 w-[45%] h-[270px]">
          <span class="font-[600]">Book Recommendations for You:</span>
          <div class="recommended_books flex flex-row justify-between">
            <div class="recbook1 w-[28%]"></div>
            <div class="recbook2 w-[28%]"></div>
            <div class="recbook3 w-[28%]"></div>
          </div>
        </div>
        <div class="first_layer2 flex flex-col text-center justify-between w-[17%] h-[270px]">
          <span class="font-[600]">Your Stats:</span>
          <div class="stats flex flex-col text-left justify-between">
            <div class="sp">
              <span>Books: {{userData?.stats.completedBooks.length}}</span>
            </div>
            <div class="sp">
              <span>Pages: {{userData?.stats.pagesRead}}</span>
            </div>
            <div class="sp">
              <span>Quizzes: {{userData?.stats.quizzesCompleted}}</span>
            </div>
            <div class="sp">
              <span>Overall XP: {{ this.totalXP }}</span>
            </div>
          </div>
          <div class="improve">
            <button class="upd_btn btn" @click="$router.push('/mybooks')">Update</button>
          </div>
        </div>
        <div class="first_layer3 text-center w-[33%] h-[270px]">
          <span class="font-[600]">Leaderboard</span>
          <div class="leaderboard flex flex-col items-center">
            <div class="firstPlace w-full h-[45px] border-2 items-center flex flex-row justify-between">
              <div class="stat_left flex flex-row">
                <img class="w-[30px] h-[30px]" src="../assets/first.png" alt="" />
                <span class="text-[13px] text-normal name">Damirbek</span>
              </div>
              <div class="stat_right">
                <span>B: {{}}</span>
                <span>P: {{}}</span>
                <span>Q: {{}}</span>
                <span>T: {{}} XP</span>
              </div>
            </div>
            <div class="secondPlace w-full h-[45px] border-2 items-center flex flex-row justify-between">
              <div class="stat_left flex flex-row">
                <img class="w-[30px] h-[29px]" src="../assets/second.png" alt="" />
                <span class="text-[15px] text-normal name">Damirbek</span>
              </div>
              <div class="stat_right">
                <span>B: {{}}</span>
                <span>P: {{}}</span>
                <span>Q: {{}}</span>
                <span>T: {{}} XP</span>
              </div>
            </div>
            <div class="thirdPlace w-full h-[45px] border-2 items-center flex flex-row justify-between">
              <div class="stat_left flex flex-row">
                <img class="w-[30px] h-[28px]" src="../assets/third.png" alt="" />
                <span class="text-[15px] text-normal name">Damirbek</span>
              </div>
              <div class="stat_right">
                <span>B: {{}}</span>
                <span>P: {{}}</span>
                <span>Q: {{}}</span>
                <span>T: {{}} XP</span>
              </div>
            </div>
            <span>* * *</span>
            <div class="firstPlace w-full h-[45px] border-2 items-center flex flex-row justify-between">
               <div class="stat_left flex flex-row">
                <span class="text-[grey]">26</span>
                <span class="text-[15px] text-normal name">You</span>
              </div>
              <div class="stat_right">
                <span>B: {{}}</span>
                <span>P: {{}}</span>
                <span>Q: {{}}</span>
                <span>T: {{}} XP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="second_layer flex flex-row justify-between gap-7">
        <div class="second_layer1 w-[30%] h-[250px]">
<div v-if="userData?.stats.clubs.length == 0" class="noclubs w-full h-full text-center flex flex-col items-center justify-between">
  <span class="font-[600]">You don't have clubs yet</span>
  <img src="../assets/clubs.png" class="w-[100px] opacity-[50%]" alt="">
  <button class="clubBtn btn">Explore Clubs</button>
</div>

        </div>
        <div class="second_layer2 w-[40%] h-[250px]">
<div v-if="userData?.stats.friends.length == 0" class="noclubs w-full h-full text-center flex flex-col items-center justify-between">
  <span class="font-[600]">You don't have friends yet</span>
  <img src="../assets/friends.png" class="w-[80px] opacity-[50%]" alt="">
  <button class="clubBtn btn">Add Friends</button>
</div>
<!-- <div  v-if="userData?.stats.friends.length !== 0" class="frieeends">
  <div class="friends_card" v-for="friend in userData?.stats.friends">     ADD THIS ---------------------------->
    <!-- <span>friend.username</span>
  </div> -->
<!-- </div>  -->
        </div>
        <div class="second_layer3 w-[30%] h-[250px]">
          <div class="quizzes text-center">
            <span class="font-[600]">Quizzes</span>
            <div class="carousel w-full h-[200px]">
  <div id="slide1" class="carousel-item relative w-full h-full flex flex-row items-center justify-center">
    <img
     src="../assets/atomic.png"
      class="h-full" />
    <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide4" class="btn btn-circle">❮</a>
      <a href="#slide2" class="btn btn-circle">❯</a>
    </div>
  </div>
  <div id="slide2" class="carousel-item relative w-full h-full flex flex-row items-center justify-center">
    <img
      src="../assets/atomic.png"
      class="h-full" />
    <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide1" class="btn btn-circle">❮</a>
      <a href="#slide3" class="btn btn-circle">❯</a>
    </div>
  </div>
  <div id="slide3" class="carousel-item relative w-full h-full flex flex-row items-center justify-center">
    <img
    src="../assets/atomic.png"
      class="h-full" />
    <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide2" class="btn btn-circle">❮</a>
      <a href="#slide4" class="btn btn-circle">❯</a>
    </div>
  </div>
  <div id="slide4" class="carousel-item relative w-full h-full flex flex-row items-center justify-center">
    <img
   src="../assets/atomic.png"
      class="h-full" />
    <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide3" class="btn btn-circle">❮</a>
      <a href="#slide1" class="btn btn-circle">❯</a>
    </div>
  </div>
</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      userData: null,
      totalXP:0,
    }
  },

  mounted() {
    onAuthStateChanged(auth, async (user) => {
      if (!user) return

      const ref = doc(db, 'users', user.uid)
      const snap = await getDoc(ref)

      if (snap.exists()) {
        this.userData = snap.data()
        this.totalXP = this.userData.stats.completedBooks.length * 10 + this.userData.stats.pagesRead + this.userData.stats.quizzesCompleted
      }
    })
  },
}
</script>

<style scoped>

.leaderboard{
  font-weight: 400 !important;
  padding: 0px 15px;
}
.stat_right{
  font-weight: 600;
}
.clubBtn{
  padding: 15px 30px;
  background-color: black;
  color: white;
}
.content {
  padding: 30px 95px;
}
.sections {
  padding-top: 20px;
}

.first_layer1,
.first_layer2,
.first_layer3,
.second_layer1,
.second_layer2,
.second_layer3 {
  background: #f9f9f9;
  padding: 15px 15px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.first_layer1 {
  padding: 15px 40px;
}
.first_layer span {
  font-family: 'Poppins', sans-serif;
}
.recbook1 {
  background-image: url('../assets/atomic.png');
  background-size: contain;
  width: 150px;
  height: 190px;
  background-repeat: no-repeat;
  background-position: center center;
  border: 1px solid black;
}
.recbook2 {
  background-image: url('../assets/atomic.png');
  background-size: contain;
  width: 150px;
  height: 190px;
  background-repeat: no-repeat;
  background-position: center center;
  border: 1px solid black;
}
.recbook3 {
  background-image: url('../assets/atomic.png');
  background-size: contain;
  width: 150px;
  height: 190px;
  background-repeat: no-repeat;
  background-position: center center;
  border: 1px solid black;
}
.recommended_books {
  padding: 10px 0px;
}
.recBookBtn{
   padding: 15px 30px;
  background: black;
  color: white;
  cursor: pointer;
}
.upd_btn {
  padding: 15px 30px;
  background: black;
  color: white;
  cursor: pointer;
}
.name {
  margin-left: 15px;
  font-weight: 400;
  font-size: 15px;
}
.secondPlace, .firstPlace, .thirdPlace{
  padding: 5px 25px 5px 5px;
}
.noclubs{
  padding: 15px 15px;
}
</style>
