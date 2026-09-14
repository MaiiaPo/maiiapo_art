<template>
  <section class="hero" aria-label="Баннер серии">
    <p class="hero__label">[ {{ data.label }} ]</p>

    <div class="hero__visual">
      <img
        class="hero__img"
        :src="data.image"
        :alt="data.imageAlt"
      />
    </div>

    <h1 class="hero__title">
      <span class="hero__title-line">{{ data.titleLines[0] }}</span>
      <span class="hero__title-line">{{ data.titleLines[1] }}</span>
    </h1>
    <p class="hero__title-en">{{ data.titleEn }}</p>
    <p class="hero__description">{{ data.description }}</p>

    <RouterLink class="hero__cta" :to="data.ctaTo">
      {{ data.ctaLabel }}
      <span class="hero__cta-arrow" aria-hidden="true">→</span>
    </RouterLink>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { HeroBannerData } from '../../data/homeHero'

defineProps<{
  data: HeroBannerData
}>()
</script>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 40px 72px;
  background: #f3f3f3;
  text-align: center;
}

.hero__label {
  margin: 0 0 40px;
  font-size: 13px;
  letter-spacing: 0.06em;
  color: #151515;
}

.hero__label::after {
  content: "";
  display: block;
  width: 48px;
  height: 3px;
  margin: 14px auto 0;
  background: #d51d78;
}

.hero__visual {
  width: 100%;
  max-width: 920px;
  margin-bottom: 40px;
}

.hero__img {
  display: block;
  width: 100%;
  height: auto;
}

.hero__title {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: baseline;
  gap: 0.3em;
  margin: 0 0 12px;
  max-width: 920px;
  font-family: "Oswald", sans-serif;
  font-size: clamp(28px, 4.2vw, 48px);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.hero__title-line {
  white-space: nowrap;
}

.hero__title-en {
  margin: 0 0 18px;
  font-family: "Inter", sans-serif;
  font-size: clamp(14px, 1.6vw, 18px);
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #555;
}

.hero__description {
  margin: 0 0 36px;
  max-width: 520px;
  font-size: 15px;
  line-height: 1.5;
  color: #2a2a2a;
}

.hero__cta {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  padding: 14px 22px;
  border: 1.5px solid #151515;
  color: #151515;
  font-size: 13px;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
}

.hero__cta:hover {
  opacity: 0.7;
}

.hero__cta-arrow {
  color: #d51d78;
  font-size: 16px;
  line-height: 1;
}

@media (max-width: 900px) {
  .hero {
    padding: 36px 20px 56px;
  }

  .hero__label {
    margin-bottom: 28px;
  }

  .hero__visual {
    margin-bottom: 28px;
  }

  .hero__title {
    flex-direction: column;
    align-items: center;
    gap: 0;
    line-height: 0.98;
  }
}
</style>
