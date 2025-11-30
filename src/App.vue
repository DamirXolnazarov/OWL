<script setup>
import HeaderBar from './components/HeaderBar.vue';
import Footer from './components/Footer.vue';
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <HeaderBar />
    <RouterView />
    <Footer />
    
  </div>
</template>

<style scoped>

</style>

