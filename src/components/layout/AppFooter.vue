<template>
  <footer class="app-footer">
    <div class="app-footer__inner">
      <div class="app-footer__main">
        <div class="app-footer__brand">
          <RouterLink class="app-footer__logo" to="/">
            <img
              class="app-footer__logo-img"
              :src="logo"
              alt="Maiia Po"
            />
          </RouterLink>
          <p class="app-footer__tagline">
            О человеке в цифровой среде. Картины, которые задают вопросы.
          </p>
        </div>

        <nav class="app-footer__columns" aria-label="Навигация в подвале">
          <div
            v-for="column in footerColumns"
            :key="column.title"
            class="app-footer__column"
          >
            <p class="app-footer__column-title">{{ column.title }}</p>
            <ul class="app-footer__column-list">
              <li v-for="item in column.links" :key="item.label">
                <RouterLink
                  v-if="item.to"
                  class="app-footer__link"
                  :to="item.to"
                >
                  {{ item.label }}
                </RouterLink>
                <span v-else class="app-footer__link app-footer__link--muted">
                  {{ item.label }}
                </span>
              </li>
            </ul>
          </div>
        </nav>

        <div class="app-footer__follow">
          <p class="app-footer__column-title">Следить</p>
          <ul class="app-footer__socials">
            <li>
              <a
                class="app-footer__social"
                href="https://www.instagram.com/maiiapoart"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5zm5.25-3.25a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1z"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                class="app-footer__social"
                href="https://t.me/maiiapoart"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M21.8 4.2 2.9 11.5c-1.3.5-1.3 1.2-.2 1.5l4.8 1.5 1.8 5.6c.2.7.4.9 1 .9.6 0 .9-.3 1.2-.6l2.8-2.7 5.8 4.3c1.1.6 1.8.3 2.1-1l3.7-17.4c.4-1.5-.5-2.2-1.9-1.7zM9.7 14.7l-.3 3.7-1.2-3.9 11-6.8z"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="app-footer__bar">
        <p class="app-footer__copy">
          © 2026 Maiia Po. Все права защищены.
        </p>
        <div class="app-footer__legal">
          <RouterLink class="app-footer__legal-link" to="/privacy">
            Политика конфиденциальности
          </RouterLink>
          <span class="app-footer__legal-sep" aria-hidden="true">|</span>
          <RouterLink class="app-footer__legal-link" to="/privacy">
            Согласие на обработку персональных данных
          </RouterLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import logo from '../../assets/artist/logo.png'

const footerColumns = [
  {
    title: 'Работы',
    links: [
      { label: 'Каталог', to: '/works' },
      { label: 'Серии', to: '/series' },
    ],
  },
  {
    title: 'Обо мне',
    links: [
      { label: 'О художнице', to: '/about' },
      { label: 'Манифест', to: undefined },
    ],
  },
  {
    title: 'Полезное',
    links: [{ label: 'Контакты', to: '/contacts' }],
  },
] as const
</script>

<style scoped>
.app-footer {
  width: 100%;
  color: #151515;
  font-family: "Inter", sans-serif;
  background: #fff;
}

.app-footer__inner {
  max-width: 1200px;
  margin-inline: auto;
  padding: 56px 40px 28px;
}

.app-footer__main {
  display: grid;
  grid-template-columns: minmax(200px, 1.1fr) minmax(320px, 2fr) auto;
  gap: 40px 48px;
  align-items: start;
  padding-bottom: 40px;
  border-bottom: 1px solid #e5e5e5;
}

.app-footer__brand {
  max-width: 260px;
}

.app-footer__logo {
  display: inline-flex;
  margin-bottom: 20px;
  text-decoration: none;
}

.app-footer__logo-img {
  display: block;
  height: 64px;
  width: auto;
}

.app-footer__tagline {
  position: relative;
  margin: 0;
  padding-top: 18px;
  font-size: 13px;
  line-height: 1.5;
  color: #777;
}

.app-footer__tagline::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 2px;
  background: #d51d78;
}

.app-footer__columns {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px 28px;
}

.app-footer__column-title {
  margin: 0 0 16px;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #151515;
}

.app-footer__column-list {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.app-footer__link {
  color: #555;
  font-size: 14px;
  line-height: 1.4;
  text-decoration: none;
}

.app-footer__link:hover {
  color: #151515;
}

.app-footer__link--muted {
  color: #999;
  cursor: default;
}

.app-footer__follow {
  padding-left: 28px;
  border-left: 1px solid #e5e5e5;
}

.app-footer__socials {
  display: flex;
  gap: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.app-footer__social {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  color: #151515;
}

.app-footer__social svg {
  width: 20px;
  height: 20px;
}

.app-footer__social:hover {
  opacity: 0.65;
}

.app-footer__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding-top: 22px;
}

.app-footer__copy {
  margin: 0;
  font-size: 13px;
  color: #777;
}

.app-footer__legal {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.app-footer__legal-link {
  color: #777;
  text-decoration: none;
}

.app-footer__legal-link:hover {
  color: #151515;
}

.app-footer__legal-sep {
  color: #bbb;
}

@media (max-width: 1000px) {
  .app-footer__main {
    grid-template-columns: 1fr 1.4fr;
  }

  .app-footer__follow {
    grid-column: 1 / -1;
    padding-left: 0;
    border-left: 0;
    padding-top: 8px;
    border-top: 1px solid #e5e5e5;
  }
}

@media (max-width: 900px) {
  .app-footer__inner {
    padding: 40px 20px 24px;
  }

  .app-footer__main {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .app-footer__brand {
    max-width: none;
  }

  .app-footer__columns {
    grid-template-columns: 1fr 1fr;
  }

  .app-footer__bar {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 560px) {
  .app-footer__columns {
    grid-template-columns: 1fr;
  }
}
</style>
