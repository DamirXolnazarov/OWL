<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import bannerImage from '../assets/landingpage.png'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  // Animate hero section
  gsap.from('.hero-content', {
    opacity: 0,
    y: 40,
    duration: 1.2,
    ease: 'power3.out',
  })

  // Animate feature cards when they scroll into view
  gsap.utils.toArray('.feature-card').forEach((card, i) => {
    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 60,
        backgroundColor: '#ffffff',
        color: '#111111',
      },
      {
        opacity: 1,
        y: 0,
        backgroundColor: '#111111',
        color: '#ffffff',
        duration: 1,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    ),
     gsap.from('.quote-section', {
    scrollTrigger: {
      trigger: '.quote-section',
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out',
  })
  })
})
</script>

<template>
  <main class="min-h-screen w-full flex flex-col items-center text-center overflow-x-hidden bg-white">
    <!-- 🏠 Hero Section -->
    <section class="hero-content flex flex-col items-center justify-center px-6" data-cursor="expand">
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
        <button
          class="hoverable group btn relative border-[#3AB4B4] text-[#3AB4B4] transition-all duration-500 overflow-hidden hover:text-white"
          data-cursor="light"
          id="btn1"
        >
          Get Started
        </button>

        <button
          class="hoverable group relative btn bg-[#3AB4B4] text-white border-2 border-[#3AB4B4] transition-all duration-500 overflow-hidden hover:text-[#3AB4B4]"
          data-cursor="light"
          id="btn2"
        >
          Join Now
        </button>
      </div>
    </section>

    <!-- 💬 Quote Section (moved up before features) -->

    
    <section
      class="py-32 quote quote-section w-full flex flex-col items-center justify-center bg-[#f9fafb] text-center relative overflow-hidden"
      data-cursor="expand"
    >
      <div class="absolute inset-0 bg-gradient-to-b from-[#3AB4B4]/10 to-transparent"></div>
      <blockquote
        class="relative z-10 text-3xl md:text-4xl font-light max-w-3xl text-gray-800 leading-snug italic mb-5"
      >
        “The more that you read, the more things you will know.  
        The more that you learn, the more places you'll go.”
      </blockquote>
      <cite class="relative z-10 text-gray-600 text-lg not-italic font-medium">
        — Dr. Seuss
      </cite>
    </section>
<section class="w-full h-[500px]">


</section>
    <!-- <section class="w-full mt-36 grid md:grid-cols-3 gap-8 px-6 md:px-20 text-left">
      <div
        v-for="(feature, index) in [
          { title: 'Discover', text: 'Explore curated reading lists and personalized recommendations.' },
          { title: 'Reflect', text: 'Write reflections, share insights, and deepen your understanding.' },
          { title: 'Grow', text: 'Track your journey and connect with fellow thinkers.' },
        ]"
        :key="index"
        class="feature-card bg-white rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-zone border border-gray-100"
        data-cursor="light"
      >
        <h2 class="text-2xl font-semibold mb-3">{{ feature.title }}</h2>
        <p class="text-base leading-relaxed">{{ feature.text }}</p>
      </div>
    </section> -->

    <!-- <section class="mt-36 mb-24 flex flex-col items-center justify-center gap-6 px-6" data-cursor="light">
      <h2 class="text-3xl md:text-4xl font-semibold text-gray-900">
        Join the community of readers
      </h2>
      <p class="text-gray-600 text-lg max-w-xl text-center leading-relaxed">
        Reflect, grow, and connect with readers around the world.
      </p>
      <button
        class="hoverable group relative px-12 py-4 rounded-full text-lg font-medium bg-[#3AB4B4] text-white transition-all duration-500 overflow-hidden hover:text-[#3AB4B4]"
      >
        <span
          class="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"
        ></span>
        <span class="relative z-10">Join Now</span>
      </button>
    </section> -->
  </main>
</template>

<style scoped>
main {
  padding-top: 120px; /* space for header */
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

#btn2 {
  padding: 20px 40px;
  font-weight: 500;
  color: #ffffff;
  font-size: 17px;
  border-radius: 10px;
  border: 3px solid #3ab4b4;
  background: #3ab4b4;
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
  font-family: 'Georgia', serif;
  position: relative;
}

.quote{
  padding: 20px 0px;
  margin-top: 80px;
}
</style>
