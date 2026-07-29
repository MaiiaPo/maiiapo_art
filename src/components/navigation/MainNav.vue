<template>
  <nav class="main-nav" aria-label="Основная навигация">
    <ul class="main-nav__list">
      <li v-for="item in navItems" :key="item.to">
        <RouterLink class="main-nav__link" :to="item.to">
          {{ item.label }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { navItems } from '../../constants/navigation'
</script>

<style scoped>
.main-nav__list {
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.main-nav__link {
  color: #151515;
  font-size: 14px;
  line-height: 1.2;
  text-decoration: none;
  white-space: nowrap;
}

.main-nav__link:hover,
.main-nav__link.router-link-active {
  opacity: 0.6;
}
</style>
