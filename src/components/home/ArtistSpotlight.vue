<template>
  <section class="spotlight" aria-label="О художнице">
    <div class="spotlight__inner">
      <div class="spotlight__visual">
        <img
          class="spotlight__img"
          :src="spotlight.image"
          :alt="spotlight.imageAlt"
        />
      </div>

      <div class="spotlight__copy">
        <p class="spotlight__label">[ {{ spotlight.label }} ]</p>
        <h2 class="spotlight__lead">{{ spotlight.lead }}</h2>
        <p class="spotlight__text">{{ spotlight.text }}</p>
        <RouterLink class="spotlight__cta" :to="spotlight.ctaTo">
          {{ spotlight.ctaLabel }}
          <span class="spotlight__arrow" aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { ArtistSpotlight } from '../../data/artistSpotlight'

defineProps<{
  spotlight: ArtistSpotlight
}>()
</script>

<style scoped>
.spotlight {
  padding: 0 40px;
  background: #fff;
  color: #151515;
  overflow: hidden;
}

.spotlight__inner {
  display: grid;
  grid-template-columns: minmax(280px, 1fr) minmax(280px, 1fr);
  gap: 0 64px;
  align-items: stretch;
  width: 100%;
  max-width: 1200px;
  height: 480px;
  margin-inline: auto;
}

.spotlight__visual {
  min-width: 0;
  height: 100%;
  overflow: hidden;
}

.spotlight__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
}

.spotlight__copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 520px;
  height: 100%;
  padding: 24px 0;
  box-sizing: border-box;
}

.spotlight__label {
  margin: 0 0 12px;
  font-size: 13px;
  letter-spacing: 0.04em;
  color: #888;
}

.spotlight__lead {
  margin: 0 0 12px;
  font-family: "Oswald", sans-serif;
  font-size: clamp(22px, 2.4vw, 32px);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.spotlight__lead::after {
  content: "";
  display: block;
  width: 48px;
  height: 3px;
  margin-top: 12px;
  background: #d51d78;
}

.spotlight__text {
  margin: 0 0 20px;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
}

.spotlight__cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #151515;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
}

.spotlight__cta:hover {
  opacity: 0.7;
}

.spotlight__arrow {
  color: #d51d78;
}

@media (max-width: 900px) {
  .spotlight {
    padding: 0 20px;
  }

  .spotlight__inner {
    grid-template-columns: 1fr;
    height: auto;
  }

  .spotlight__visual {
    height: 220px;
  }

  .spotlight__copy {
    max-width: none;
    height: auto;
    padding: 24px 0 32px;
  }
}
</style>
