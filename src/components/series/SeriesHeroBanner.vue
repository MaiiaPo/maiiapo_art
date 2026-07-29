<template>
  <section class="series-hero" aria-label="Баннер серии">
    <div class="series-hero__copy">
      <p class="series-hero__label">[ серия ]</p>
      <h1 class="series-hero__title">{{ series.title }}</h1>
      <p class="series-hero__description">{{ series.description }}</p>
      <p class="series-hero__meta">
        {{ formatWorksCount(series.works.length) }}
        {{ coverYear }}
      </p>
    </div>

    <div class="series-hero__visual">
      <img
        v-if="coverImage"
        class="series-hero__img"
        :src="coverImage"
        :alt="coverTitle"
      />
      <div v-else class="series-hero__placeholder" aria-hidden="true" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Series } from '../../data/series'
import { formatWorksCount } from '../../data/works'

const props = defineProps<{
  series: Series
}>()

const coverWork = computed(
  () => props.series.works.find((work) => work.image) ?? props.series.works[0],
)

const coverImage = computed(
  () => props.series.bannerImage ?? coverWork.value?.image,
)
const coverTitle = computed(() => props.series.title)
const coverYear = computed(() => coverWork.value?.year ?? '')
</script>

<style scoped>
.series-hero {
  display: grid;
  grid-template-columns: minmax(240px, 0.85fr) minmax(320px, 1.3fr);
  gap: 48px 56px;
  align-items: center;
  padding: 56px 40px 72px;
  background: #f2f2f2;
}

.series-hero__copy {
  max-width: 420px;
}

.series-hero__label {
  margin: 0 0 28px;
  font-size: 14px;
  line-height: 1.3;
  color: #151515;
}

.series-hero__title {
  margin: 0 0 24px;
  font-family: "Oswald", sans-serif;
  font-size: clamp(40px, 5.6vw, 72px);
  font-weight: 600;
  line-height: 0.95;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.series-hero__title::after {
  content: "";
  display: block;
  width: 48px;
  height: 3px;
  margin-top: 16px;
  background: #d51d78;
}

.series-hero__description {
  margin: 0 0 36px;
  max-width: 280px;
  font-size: 15px;
  line-height: 1.45;
  color: #2a2a2a;
}

.series-hero__meta {
  margin: 0;
  font-size: 14px;
  color: #555;
}

.series-hero__visual {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
}

.series-hero__img {
  display: block;
  width: 100%;
  max-width: 640px;
  height: auto;
  object-fit: contain;
}

.series-hero__placeholder {
  display: block;
  width: 100%;
  max-width: 640px;
  aspect-ratio: 16 / 10;
  background: linear-gradient(160deg, #dcdcdc 0%, #c4c4c4 55%, #b0b0b0 100%);
}

@media (max-width: 900px) {
  .series-hero {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 36px 20px 48px;
  }

  .series-hero__description {
    max-width: none;
  }
}
</style>
