<template>
  <div class="page">
    <AppHeader />

    <main class="page__main">
      <RouterView />
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Oswald:wght@500;600&display=swap");

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f7f7f7;
  color: #151515;
  font-family: "Inter", sans-serif;
}

.page__main {
  flex: 1;
}
</style>
