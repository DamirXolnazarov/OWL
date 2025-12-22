<script setup>
import { RouterLink } from 'vue-router'
import bannerImage from '../assets/landingpage.png'
</script>

<template>
  <main
    class="min-h-screen w-full flex flex-col items-center text-center overflow-x-hidden bg-white"
  >
    <!-- 🏠 Hero Section -->
    <section
      class="hero-content flex flex-col items-center justify-center px-6"
      data-cursor="expand"
    >
      <h1 class="text-5xl md:text-7xl font-semibold text-gray-900 leading-tight tracking-tight">
        Read. Reflect. Connect.
      </h1>
      <p class="text-lg md:text-xl text-gray-500 max-w-2xl subheading">
        Join a community of curious readers. Take quizzes, reflect, and grow together.
      </p>

      <!-- 📖 Banner Image (moved closer to text) -->
      <div
        class="banner w-full max-w-5xl h-[350px] md:h-[420px] bg-top bg-contain bg-no-repeat"
        :style="{ backgroundImage: `url(${bannerImage})` }"
        data-cursor="expand"
      ></div>

      <!-- 🔘 Buttons (below banner) -->
      <div class="flex flex-wrap buttons justify-center gap-6">
        <router-link to="/login"><button
          class="hoverable group btn relative border-[#3AB4B4] text-[#3AB4B4] transition-all duration-500 overflow-hidden hover:text-white"
          data-cursor="light"
          id="btn1"
        >
          Get Started
        </button></router-link>

         <router-link to="/login"><button
          class="hoverable group relative btn bg-[#3AB4B4] text-white border-2 border-[#3AB4B4] transition-all duration-500 overflow-hidden hover:text-[#3AB4B4]"
          data-cursor="light"
          id="btn2"
        >
          Join Now
        </button></router-link>
      </div>
    </section>

    <section
      class="quote quote-section w-full flex flex-col items-center justify-between bg-[#f9fafb] text-center relative overflow-hidden"
      data-cursor="expand"
    >
      <div class="absolute qot inset-0"></div>
      <blockquote class="relative z-10 text-3xl md:text-4xl font-light w-[65%] text-gray-800">
        “The more that you read, the more things you will know. The more that you learn, the more
        places you'll go.”
      </blockquote>
      <br /><br />
      <cite class="relative z-10 text-white text-[22px] not-italic w-[60%] text-left font-medium">
        — Dr. Seuss
      </cite>
    </section>

    <section class="friends w-full block h-full bg-[#020B20]">
      <div class="conta w-full h-full flex flex-row justify-between">
        <div class="container_text flex flex-col items-start justify-between w-[400px]">
          <div class="container_text_title text-left">
            <span
              >Read <br />
              Together, <br />
              Learn <br />
              Together</span
            >
          </div>
          <div class="container_text_subtitle text-left">
            <span class="text-lg">
              Connect with your friends and make reading more fun.See what they’re exploring, share
              book suggestions, and start meaningful discussions together.
            </span>
          </div>
          <div class="container_text_buttons flex flex-col items-center h-[170px] justify-between">
            <button class="btn fr1" data-cursor="light">Find Friends</button>
            <span class="container_text_subtitle1">or</span>
            <button class="fr2 btn" data-cursor="light">Invite a Friend</button>
          </div>
        </div>
        <div class="container_image w-[708px]">
          <img src="../assets/image 8.png" class="w-[708px]" alt="" />
        </div>
      </div>
    </section>

    <section class="ranking w-full h-full bg-[#00081E]">
      <div class="ikta flex flex-row justify-between w-full h-full">
        <div class="bitta">
          <img src="../assets/Group 6.png" class="w-[800px]" alt="" />
        </div>
        <div class="ikki w-[510px] h-[700px] text-left flex flex-col justify-between items-left">
          <div class="sarlavha">
            <span> Read More, Compete More </span>
          </div>
          <div class="description">
            <span
              >Discover the top readers and track your own reading journey! See who has read the
              most books, completed the most pages, or finished the most quizzes. Challenge yourself
              to climb the leaderboard, get inspired by others’ reading habits, and explore new
              books along the way. Share your progress with friends, celebrate milestones, and make
              reading a fun, social experience for everyone.</span
            >
          </div>
          <div class="tugma">
            <button class="text-[#DCEAFF] leader btn">Explore Leaderboard</button>
          </div>
        </div>
      </div>
    </section>

    <section class="clubs w-full h-full">
      <div class="info w-full h-full flex flex-col items-center justify-between">
        <div class="info_title">
          <span>Join a Club, Share Your Passion</span>
        </div>
        <div class="info_banner flex justify-center">
          <img src="../assets/clubss.png" class="w-[640px]" alt="" />
        </div>
        <div class="info_subtitle">
          <span
            >Connect with like-minded readers and explore your favorite genres together! Discover
            book clubs that match your interests, share ideas, discuss stories, and participate in
            fun reading challenges. Clubs make reading social, exciting, and a great way to meet new
            friends who love the same books as you.</span
          >
        </div>
        <div class="info_buttons h-[100px] items-center w-[550px] flex flex-row justify-between">
          <button
            class="hoverable group btn relative border-[#000000] text-[#000000] transition-all duration-500 overflow-hidden"
            data-cursor="light"
            id="btn3"
          >
            Find a Club
          </button>

          <button
            class="hoverable group relative btn bg-[#000000] text-white border-2 border-[#000000] transition-all duration-500 overflow-hidden"
            data-cursor="light"
            id="btn4"
          >
            Create a Club
          </button>
        </div>
      </div>
    </section>

    <section class="quizzes w-full h-full">
      <div class="quizzes_box w-full h-full flex flex-row justify-between">
        <div class="quizzes_left text-left w-[415px] flex flex-col justify-between items-left">
          <div class="quizzes_title">
            <span>Test, Learn, Level Up</span>
          </div>
          <div class="quizzes_subtitle">
            <span
              >Make your reading experience more interactive with fast, fun quizzes for every book
              you read. Check how well you understood key ideas, discover insights you might’ve
              missed, and watch your progress grow over time.</span
            >
          </div>
          <div class="quizzes_buttons w-full flex-col flex h-[140px] justify-between">
            <button class="btn btn5" id="btn5">Start Quiz</button>
            <button class="btn btn6" id="btn6">Explore Quizzes</button>
          </div>
        </div>
        <div class="quizzes_right">
          <div class="quizzes_numbers flex flex-row justify-between">
            <div class="number">
              <div class="number_box">

                <vue3-autocounter
                ref="counter"
                :startAmount="0"
                :endAmount="143"
                :duration="3"
                separator=","
                decimalSeparator="."
                :decimals="0"
                :autoinit="true"
                @finished="alert(`Counting finished!`)"
                />
              </div>
              <span class="blah">Quizzes</span>
              </div>
            <div class="number">
              <div class="number_box">

                <vue3-autocounter
                ref="counter"
                :startAmount="0"
                :endAmount="143"
                :duration="3"
                separator=","
                decimalSeparator="."
                :decimals="0"
                :autoinit="true"
                @finished="alert(`Counting finished!`)"
                />
              </div>
              <span class="blah">Completed</span>
              </div>
            <div class="number">
              <div class="number_box">

                <vue3-autocounter
                ref="counter"
                :startAmount="0"
                :endAmount="143"
                :duration="3"
                separator=","
                decimalSeparator="."
                :decimals="0"
                :autoinit="true"
                @finished="alert(`Counting finished!`)"
                />
              </div>
              <span class="blah">New</span>
              </div>
          </div>
          <div class="quizzes_banner">
            <img src="../assets/quizz.png" alt="" />
          </div>
        </div>
      </div>
    </section>

   
  </main>
</template>

<style scoped>

.number{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 180px;
  padding: 20px 0px;
}
.number_box{
  display: block;
  width: 150px;
  height: 90px;
  border-radius: 10px;
  background: #7BACCE;
  opacity: 48%;
  font-family: 'Poppins';
  color: #fff;
  font-size: 64px;
  font-weight: bold;
}
.blah{
  font-size: 20px;
  font-weight: 700;
}
.quizzes_title span {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 64px;
  color: #1a1f36;
}
.quizzes_subtitle span {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 23px;
  color: #4f5565;
}

.quizzes {
  padding: 50px 90px;
  background: linear-gradient(#e9f3ff 0%, #fdfdfd 100%);
}

.info_title span {
  font-style: normal;
  font-weight: 700;
  font-size: 64px;
  line-height: 96px;
  color: #e8f1ff;
}
.info_subtitle {
  padding: 10px 250px;
}
.info_subtitle span {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  text-align: center;
  color: #000000c8;
}
.info_banner {
  padding: 30px 0px;
}
.clubs {
  padding: 10px 90px;
  background: linear-gradient(180deg, #00081f 0%, #eaf4fe 100%);
}

.tugma button {
  padding: 25px 60px;
  background: #0f1a33;
  border: solid 2px #00fffe;
  border-radius: 10px;
  font-size: 17px;
  box-shadow: inset 0px 0px 17px #1aebfd;
  filter: drop-shadow(0px 0px 35px rgba(25, 237, 253, 0.75));
}
.ranking {
  padding: 10px 90px 25px 0px;
}
.sarlavha {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 64px;
  line-height: 84px;
  color: #e8f1ff;
}
.description {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  color: #9db2d4;
}

.ikki {
  padding-top: 70px;
}

main {
  padding-top: 50px; /* space for header */
}

.banner {
  background-image: url(../assets/landingpage.png);
  background-position: top;
  background-size: contain;
  background-repeat: no-repeat;
  margin-top: -60px; /* minimal space between text and image */
}

#btn1 {
  padding: 20px 40px;
  font-weight: 500;
  color: #3ab4b4;
  font-size: 17px;
  border-radius: 10px;
  border: 3px solid #3ab4b4;
}
#btn3 {
  padding: 20px 40px;
  font-weight: 500;
  color: #000000;
  font-size: 17px;
  border-radius: 10px;
  border: 3px solid #000000;
}

#btn2 {
  padding: 20px 40px;
  font-weight: 500;
  color: #ffffff;
  font-size: 17px;
  border-radius: 10px;
  border: 3px solid #3ab4b4;
  background: #3ab4b4;
}
.btn5 {
  width: 250px;
  padding: 20px 40px;
  font-weight: 500;
  color: #b5d1e7;
  font-size: 18px;
  border-radius: 10px;
  border: 3px solid #b5d1e7;
}

.btn6 {
  width: 250px;
  padding: 20px 40px;
  font-weight: 500;
  color: #ffffff;
  font-size: 18px;
  border-radius: 10px;
  border: 3px solid #b5d1e7;
  background: #b5d1e7;
}
#btn4 {
  padding: 20px 40px;
  font-weight: 500;
  color: #ffffff;
  font-size: 17px;
  border-radius: 10px;
  border: 3px solid #000000;
  background: #000000;
}

.container_text {
  padding-bottom: 20px;
}
.subheading {
  margin-top: -20px;
  z-index: 999999999;
}

.buttons {
  margin-top: -20px;
}

/* Slightly improved quote formatting */
blockquote {
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 700;
  text-align: center;
  color: #000000;
}

.quote {
  padding: 40px 0px 40px 0px;
  margin-top: 80px;
}
.qot {
  background: linear-gradient(#e9f3ff 0%, #020b20 85%);
}
.container_text_title {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 70px;
  line-height: 80px;
  color: #e8f1ff;
}
.container_text_subtitle {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 125%;
  color: #9db2d4;
}
.container_text_subtitle1 {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 125%;
  color: #9db2d4;
}
.conta {
  padding: 15px 90px 15px 90px;
}
.fr1 {
  padding: 25px 70px;
  box-shadow: inset 0px 0px 15px rgba(58, 125, 255, 0.18);
  font-size: 17px;
  box-shadow: inset 0px 0px 15px rgba(58, 125, 255, 0.18);
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  background: transparent;
  color: #dceaff;
  border: solid #3a7dff 2px;
}
.fr2 {
  padding: 25px 61px;
  font-size: 17px;
  background: transparent;
  color: #3a7dff;
  border: solid #3a7dff 2px;
  box-shadow: inset 0px 0px 15px rgba(58, 125, 255, 0.18);
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}
</style>
