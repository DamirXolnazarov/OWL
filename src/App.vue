<script setup>
import HeaderBar from './components/HeaderBar.vue';
import Footer from './components/Footer.vue';
import { RouterView } from 'vue-router'
import FeedbackCircle from './components/FeedbackCircle.vue';
</script>

<template>
  <div class="app">
    <HeaderBar />
    <RouterView />
<FeedbackCircle />


    <Footer />
    
  </div>
</template>

<style scoped>

</style>

