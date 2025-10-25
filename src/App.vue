<script setup>
import HeaderBar from './components/HeaderBar.vue'
import CustomCursor from './components/GlassCursor.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app relative min-h-screen overflow-visible">
    <CustomCursor />
    <HeaderBar />
    <RouterView />
  </div>
</template>

<style scoped>
.app {
  cursor: none;
  padding: 0 50px;
}
</style>

