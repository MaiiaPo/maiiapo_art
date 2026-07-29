<template>
  <section class="hero" aria-label="Баннер серии">
    <div class="hero__intro">
      <p class="hero__label">[ {{ data.label }} ]</p>
      <h1 class="hero__title">{{ data.title }}</h1>
      <p class="hero__description">{{ data.description }}</p>
      <RouterLink class="hero__cta" :to="data.ctaTo">
        {{ data.ctaLabel }}
        <span class="hero__cta-arrow" aria-hidden="true">→</span>
      </RouterLink>
    </div>

    <div class="hero__visual">
      <div class="hero__image">
        <img
          v-if="current.image"
          class="hero__img"
          :src="current.image"
          :alt="current.title"
        />
        <!-- TODO: изображение для слайдов без image -->
        <div v-else class="hero__image-placeholder" aria-hidden="true" />
      </div>

      <aside class="hero__meta" :aria-label="`Работа ${current.index}: ${current.title}`">
        <p class="hero__meta-index">[ {{ current.index }} ]</p>
        <p class="hero__meta-title">{{ current.title }}</p>
        <p class="hero__meta-detail">{{ current.year }}</p>
        <p class="hero__meta-detail">{{ current.medium }}</p>
        <p class="hero__meta-detail">{{ current.size }}</p>

        <div class="hero__dots" role="tablist" aria-label="Смена картины">
          <button
            v-for="(slide, index) in data.slides"
            :key="slide.id"
            class="hero__dot"
            type="button"
            role="tab"
            :class="{ 'hero__dot--active': index === activeIndex }"
            :aria-selected="index === activeIndex"
            :aria-label="`Показать работу ${slide.index}: ${slide.title}`"
            @click="activeIndex = index"
          />
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import type { HeroBannerData } from '../../data/homeHero'

const props = defineProps<{
  data: HeroBannerData
}>()

const activeIndex = ref(0)

const current = computed(() => props.data.slides[activeIndex.value])
</script>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: minmax(240px, 0.9fr) minmax(320px, 1.2fr);
  gap: 48px 56px;
  align-items: center;
  padding: 56px 40px 72px;
  background: #f2f2f2;
}

.hero__intro {
  max-width: 420px;
}

.hero__label {
  margin: 0 0 28px;
  font-size: 14px;
  line-height: 1.3;
  color: #151515;
}

.hero__label::after {
  content: "";
  display: block;
  width: 48px;
  height: 3px;
  margin-top: 16px;
  background: #d51d78;
}

.hero__title {
  margin: 0 0 24px;
  font-family: "Oswald", sans-serif;
  font-size: clamp(40px, 5.6vw, 72px);
  font-weight: 600;
  line-height: 0.95;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.hero__description {
  margin: 0 0 36px;
  max-width: 280px;
  font-size: 15px;
  line-height: 1.45;
  color: #2a2a2a;
}

.hero__cta {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  padding: 14px 20px;
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

.hero__visual {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 24px;
  align-items: end;
  min-width: 0;
}

.hero__image {
  min-width: 0;
}

.hero__img {
  display: block;
  aspect-ratio: 1 / 2;
  width: 100%;
  max-width: 360px;
  margin-inline: auto;
  object-fit: contain;
  object-position: center;
  background: #e8e8e8;
}

.hero__image-placeholder {
  aspect-ratio: 1 / 2;
  width: 100%;
  max-width: 360px;
  margin-inline: auto;
  background:
    linear-gradient(135deg, #d8d8d8 0%, #bcbcbc 45%, #9f9f9f 100%);
}

.hero__meta {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 120px;
  padding-bottom: 8px;
}

.hero__meta::before {
  content: "";
  display: block;
  width: 36px;
  height: 2px;
  margin-bottom: 14px;
  background: #d51d78;
}

.hero__meta-index {
  margin: 0 0 6px;
  font-size: 12px;
  letter-spacing: 0.04em;
}

.hero__meta-title {
  margin: 0 0 10px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.hero__meta-detail {
  margin: 0;
  font-size: 12px;
  line-height: 1.45;
  color: #555;
}

.hero__dots {
  display: flex;
  gap: 8px;
  margin-top: 18px;
}

.hero__dot {
  width: 8px;
  height: 8px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: #cfcfcf;
  cursor: pointer;
}

.hero__dot--active {
  background: #d51d78;
}

.hero__dot:focus-visible {
  outline: 2px solid #d51d78;
  outline-offset: 3px;
}

@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 36px 20px 48px;
  }

  .hero__visual {
    grid-template-columns: 1fr auto;
  }

  .hero__description {
    max-width: none;
  }
}

@media (max-width: 560px) {
  .hero__visual {
    grid-template-columns: 1fr;
  }

  .hero__meta {
    order: -1;
  }
}
</style>
