<template>
  <nav class="main-nav" :aria-label="t('nav.aria')">
    <ul class="main-nav__list">
      <li v-for="item in items" :key="item.to">
        <RouterLink
          v-slot="{ href, navigate, isActive, isExactActive }"
          :to="item.to"
          custom
        >
          <a
            :href="href"
            class="main-nav__link"
            :class="{
              'is-active': item.to === '/' ? isExactActive : isActive,
            }"
            @click="navigate"
          >
            {{ item.label }}
          </a>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from '../../i18n'

const { t } = useI18n()

const items = computed(() => [
  { label: t('nav.home'), to: '/' },
  { label: t('nav.series'), to: '/series' },
  { label: t('nav.works'), to: '/works' },
  { label: t('nav.about'), to: '/about' },
  { label: t('nav.contacts'), to: '/contacts' },
])
</script>

<style scoped>
.main-nav {
  justify-self: center;
}

.main-nav__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 28px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.main-nav__link {
  position: relative;
  display: inline-block;
  padding-bottom: 4px;
  color: #8a8a8a;
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.1em;
  line-height: 1.2;
  text-decoration: none;
  text-transform: uppercase;
  white-space: nowrap;
  transition: color 0.2s ease;
}

.main-nav__link::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: #151515;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.main-nav__link:hover,
.main-nav__link.is-active {
  color: #151515;
}

.main-nav__link.is-active::after {
  opacity: 1;
}

@media (max-width: 900px) {
  .main-nav__list {
    justify-content: flex-start;
    gap: 18px 22px;
  }

  .main-nav__link {
    font-size: 11px;
  }
}
</style>
