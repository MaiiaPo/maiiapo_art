<template>
  <header class="app-header">
    <RouterLink class="app-header__logo" to="/">
      <!-- TODO: изображение логотипа -->
      <span class="app-header__logo-text">Maiia Po</span>
    </RouterLink>

    <MainNav />
    <!-- <HeaderActions /> -->
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import MainNav from '../navigation/MainNav.vue'
// import HeaderActions from '../navigation/HeaderActions.vue'
</script>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  gap: 40px;
  width: 100%;
  padding: 18px 40px;
  box-sizing: border-box;
  background: #ececec;
  color: #151515;
  font-family: "Inter", sans-serif;
}

.app-header__logo {
  flex-shrink: 0;
  color: inherit;
  text-decoration: none;
}

.app-header__logo-text {
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

@media (max-width: 900px) {
  .app-header {
    flex-wrap: wrap;
    gap: 16px 24px;
    padding: 16px 20px;
  }
}
</style>
