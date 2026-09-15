<template>
  <header class="app-header">
    <RouterLink class="app-header__logo" to="/">
      <img
        class="app-header__logo-img"
        :src="logo"
        alt="Maiia Po"
      />
    </RouterLink>

    <MainNav />

    <div class="app-header__lang" :aria-label="t('lang.aria')">
      <button
        class="app-header__lang-btn"
        type="button"
        :class="{ 'is-active': locale === 'ru' }"
        @click="setLocale('ru')"
      >
        RU
      </button>
      <span class="app-header__lang-sep" aria-hidden="true">/</span>
      <button
        class="app-header__lang-btn"
        type="button"
        :class="{ 'is-active': locale === 'en' }"
        @click="setLocale('en')"
      >
        EN
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import MainNav from '../navigation/MainNav.vue'
import logo from '../../assets/artist/logo.png'
import { useI18n } from '../../i18n'

const { locale, setLocale, t } = useI18n()
</script>

<style scoped>
.app-header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 24px;
  width: 100%;
  padding: 22px 40px;
  box-sizing: border-box;
  background: #f3f3f3;
  color: #151515;
  font-family: "Inter", sans-serif;
}

.app-header__logo {
  justify-self: start;
  display: flex;
  align-items: center;
  color: inherit;
  text-decoration: none;
}

.app-header__logo-img {
  display: block;
  height: 40px;
  width: auto;
}

.app-header__lang {
  justify-self: end;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.app-header__lang-btn {
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #9a9a9a;
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: color 0.2s ease;
}

.app-header__lang-btn.is-active {
  color: #151515;
}

.app-header__lang-btn:hover {
  color: #151515;
}

.app-header__lang-sep {
  color: #c0c0c0;
  font-size: 12px;
  letter-spacing: 0;
}

@media (max-width: 900px) {
  .app-header {
    grid-template-columns: 1fr auto;
    grid-template-areas:
      "logo lang"
      "nav nav";
    gap: 16px 20px;
    padding: 18px 20px;
  }

  .app-header__logo {
    grid-area: logo;
  }

  .app-header :deep(.main-nav) {
    grid-area: nav;
    justify-self: stretch;
  }

  .app-header__lang {
    grid-area: lang;
  }

  .app-header__logo-img {
    height: 32px;
  }
}
</style>
