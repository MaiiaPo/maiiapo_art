<template>
  <section class="hero" :aria-label="t('home.heroAria')">
    <p class="hero__label">[ {{ t('home.heroLabel') }} ]</p>

    <div class="hero__visual">
      <img
        class="hero__img"
        :src="data.image"
        :alt="data.titleEn"
      />
    </div>

    <h1 class="hero__title">
      <span
        v-for="(line, index) in titleLines"
        :key="index"
        class="hero__title-line"
      >
        {{ line }}
      </span>
    </h1>
    <p v-if="!isEn" class="hero__title-en">{{ data.titleEn }}</p>
    <p class="hero__description">{{ t('home.heroDescription') }}</p>

    <RouterLink class="hero__cta" :to="data.ctaTo">
      {{ t('home.heroCta') }}
      <span class="hero__cta-arrow" aria-hidden="true">→</span>
    </RouterLink>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { HeroBannerData } from '../../data/homeHero'
import { seriesList } from '../../data/series'
import { useI18n } from '../../i18n'
import { getSeriesTitleLines } from '../../i18n/content'

const props = defineProps<{
  data: HeroBannerData
}>()

const { t, isEn, locale } = useI18n()

const titleLines = computed(() => {
  const series = seriesList[0]
  if (!series) return props.data.titleLines
  return getSeriesTitleLines(series, locale.value)
})
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
