<template>
  <footer class="app-footer">
    <div class="app-footer__subscribe">
      <div class="app-footer__subscribe-copy">
        <p class="app-footer__label">[ подписка ]</p>
        <p class="app-footer__title">Новости, выставки и новые работы</p>
      </div>

      <form class="app-footer__form" @submit.prevent>
        <label class="visually-hidden" for="subscribe-email">E-mail</label>
        <input
          id="subscribe-email"
          class="app-footer__input"
          type="email"
          name="email"
          placeholder="Ваш e-mail"
          autocomplete="email"
        />
        <button class="app-footer__submit" type="submit">
          Подписаться
          <span class="app-footer__arrow" aria-hidden="true">→</span>
        </button>
      </form>

      <ul class="app-footer__socials">
        <li>
          <a href="#" aria-label="Instagram">
            <!-- TODO: иконка Instagram -->
            <span>IG</span>
          </a>
        </li>
        <li>
          <a href="#" aria-label="Behance">
            <!-- TODO: иконка Behance -->
            <span>Be</span>
          </a>
        </li>
        <li>
          <a href="mailto:hello@example.com" aria-label="Email">
            <!-- TODO: иконка Email -->
            <span>@</span>
          </a>
        </li>
      </ul>
    </div>

    <div class="app-footer__bar">
      <p class="app-footer__copy">© 2026 Maiia Po</p>

      <nav class="app-footer__nav" aria-label="Навигация в подвале">
        <ul class="app-footer__nav-list">
          <li v-for="item in navItems" :key="item.to">
            <RouterLink :to="item.to">{{ item.label }}</RouterLink>
          </li>
        </ul>
      </nav>

      <RouterLink class="app-footer__policy" to="/privacy">
        Политика конфиденциальности
      </RouterLink>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { navItems } from '../../constants/navigation'
</script>

<style scoped>
.app-footer {
  width: 100%;
  color: #151515;
  font-family: "Inter", sans-serif;
  background: #f3f3f3;
}

.app-footer__subscribe {
  display: grid;
  grid-template-columns: minmax(180px, 1fr) minmax(280px, 1.4fr) auto;
  align-items: end;
  gap: 32px;
  padding: 48px 40px 40px;
  border-top: 1px solid #ddd;
}

.app-footer__label {
  margin: 0 0 10px;
  font-size: 13px;
  color: #777;
}

.app-footer__title {
  margin: 0;
  max-width: 220px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 500;
}

.app-footer__form {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #151515;
}

.app-footer__input {
  flex: 1;
  min-width: 0;
  border: 0;
  background: transparent;
  color: #151515;
  font: inherit;
  font-size: 15px;
  outline: none;
}

.app-footer__input::placeholder {
  color: #999;
}

.app-footer__submit {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #151515;
  font: inherit;
  font-size: 13px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
  cursor: pointer;
}

.app-footer__arrow {
  color: #d51d78;
}

.app-footer__socials {
  display: flex;
  gap: 18px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.app-footer__socials a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  color: #151515;
  font-size: 13px;
  text-decoration: none;
}

.app-footer__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 18px 40px 28px;
  font-size: 13px;
}

.app-footer__copy {
  margin: 0;
  white-space: nowrap;
}

.app-footer__nav-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.app-footer__nav a,
.app-footer__policy {
  color: #151515;
  text-decoration: none;
}

.app-footer__nav a:hover,
.app-footer__policy:hover,
.app-footer__socials a:hover,
.app-footer__submit:hover {
  opacity: 0.6;
}

.app-footer__policy {
  white-space: nowrap;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 900px) {
  .app-footer__subscribe {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 32px 20px 28px;
  }

  .app-footer__bar {
    flex-direction: column;
    align-items: flex-start;
    padding: 16px 20px 24px;
  }

  .app-footer__nav-list {
    justify-content: flex-start;
  }
}
</style>
