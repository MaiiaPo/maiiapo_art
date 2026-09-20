<template>
  <section class="series-about" aria-labelledby="series-about-title">
    <div
      class="series-about__inner"
      :class="{ 'series-about__inner--no-visual': !about.image }"
    >
      <div v-if="about.image" class="series-about__visual">
        <LazyImage
          class="series-about__img"
          fill
          :src="about.image"
          :alt="about.imageAlt"
          object-fit="cover"
        />
      </div>

      <div class="series-about__content">
        <div class="series-about__main">
          <p class="series-about__label">[ {{ about.label }} ]</p>
          <h2 id="series-about-title" class="series-about__title">
            <span
              v-for="(line, index) in about.titleLines"
              :key="index"
              class="series-about__title-line"
            >
              {{ line }}
            </span>
          </h2>
          <div class="series-about__text">
            <p
              v-for="(paragraph, index) in about.paragraphs"
              :key="index"
            >
              {{ paragraph }}
            </p>
          </div>
        </div>

        <blockquote class="series-about__quote">
          <span
            v-for="(line, index) in about.quoteLines"
            :key="index"
            class="series-about__quote-line"
          >
            {{ line }}
          </span>
        </blockquote>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { SeriesAbout } from '../../data/seriesAbout'
import LazyImage from '../ui/LazyImage.vue'

defineProps<{
  about: SeriesAbout
}>()
</script>

<style scoped>
.series-about {
  padding: 56px 40px;
  color: #151515;
}

.series-about__inner {
  display: grid;
  grid-template-columns: minmax(200px, 0.55fr) minmax(0, 1.45fr);
  gap: 40px 48px;
  align-items: stretch;
  max-width: 1200px;
  margin-inline: auto;
}

.series-about__inner--no-visual {
  grid-template-columns: minmax(0, 1fr);
}

.series-about__visual {
  min-width: 0;
  min-height: 280px;
}

.series-about__img {
  width: 100%;
  height: 100%;
  max-height: 520px;
}

.series-about__content {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(160px, 0.8fr);
  gap: 32px 40px;
  align-items: start;
  min-width: 0;
}

.series-about__main {
  min-width: 0;
  padding-right: 8px;
}

.series-about__label {
  margin: 0 0 28px;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #777;
}

.series-about__label::after {
  content: "";
  display: block;
  width: 40px;
  height: 3px;
  margin-top: 12px;
  background: #d51d78;
}

.series-about__title {
  display: flex;
  flex-direction: column;
  margin: 0 0 28px;
  font-family: "Oswald", sans-serif;
  font-size: clamp(28px, 3.6vw, 44px);
  font-weight: 500;
  line-height: 1.05;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.series-about__title-line {
  display: block;
}

.series-about__text {
  display: grid;
  gap: 16px;
  max-width: 420px;
}

.series-about__text p {
  margin: 0;
  font-size: 14px;
  line-height: 1.55;
  color: #333;
}

.series-about__quote {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin: 0;
  padding: 8px 0 0 28px;
  border-left: 1px solid #d5d5d5;
  font-family: "Oswald", sans-serif;
  font-size: clamp(18px, 2vw, 24px);
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  color: #7a7a7a;
}

.series-about__quote-line {
  display: block;
}

@media (max-width: 900px) {
  .series-about {
    padding: 40px 20px;
  }

  .series-about__inner {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .series-about__img {
    max-height: 360px;
  }

  .series-about__content {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .series-about__quote {
    padding: 24px 0 0;
    border-left: 0;
    border-top: 1px solid #d5d5d5;
  }

  .series-about__text {
    max-width: none;
  }
}
</style>
