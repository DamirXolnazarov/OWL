<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="footer">
      <footer class="footer">
    <div class="footer-content">

      <!-- Logo Section -->
      <div class="footer-left">
        <!-- Put your logo here -->
        <img src="../assets/logo_white.png" alt="Logo" class="footer-logo" />
      </div>

      <!-- Navigation -->
      <div class="footer-links">
       <RouterLink to="/friends" class="flex flex-col items-center hover:text-primary transition">
        <span>Friends</span>
      </RouterLink>
       <RouterLink to="/leaderboard" class="flex flex-col items-center hover:text-primary transition">
        <span>Leaderboard</span>
      </RouterLink>
       <RouterLink to="/clubs" class="flex flex-col items-center hover:text-primary transition">
        <span>Clubs</span>
      </RouterLink>
       <RouterLink to="/quizzes" class="flex flex-col items-center hover:text-primary transition">
        <span>Quizzes</span>
      </RouterLink>
       <RouterLink to="/profile" class="flex flex-col items-center hover:text-primary transition">
        <span>Profile</span>
      </RouterLink>
      </div>

      <!-- Socials -->
      <div class="footer-right text-left">
        <p>© 2026 Owl <br> created by Damirbek Kholnazarov</p>
      </div>
    </div>
  </footer>
    </section>
</template>

<style scoped>
.footer {
  width: 100%;
  background: #0f0f10;
  padding: 24px 0;
  color: white;
  display: flex;
  justify-content: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-content {
  width: 90%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.footer-logo {
  width: 100px;
  object-fit: contain;
}

.footer-brand {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
}

.footer-links {
  display: flex;
  gap: 20px;
}

.footer-links span {
  color: #d8d8d8;
  text-decoration: none;
  transition: 0.2s;
}


.footer-right {
  font-size: 14px;
  opacity: 0.7;
}


</style>
