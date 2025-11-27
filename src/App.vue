<script setup>
import HeaderBar from './components/HeaderBar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <HeaderBar />
    <RouterView />
  </div>
</template>

<style scoped>
</style>

