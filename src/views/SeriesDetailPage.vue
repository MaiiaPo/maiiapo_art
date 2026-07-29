<template>
  <section v-if="series" class="series-detail">
    <p class="series-detail__label">[ {{ series.label }} ]</p>
    <h1 class="series-detail__title">{{ series.title }}</h1>
    <p class="series-detail__description">{{ series.description }}</p>

    <ul class="series-detail__works">
      <li v-for="work in series.works" :key="work.id" class="series-detail__work">
        <div class="series-detail__media">
          <img
            v-if="work.image"
            class="series-detail__img"
            :src="work.image"
            :alt="work.title"
          />
          <div v-else class="series-detail__placeholder" aria-hidden="true" />
        </div>

        <div class="series-detail__meta">
          <p>[ {{ work.index }} ]</p>
          <h2>{{ work.title }}</h2>
          <p>{{ work.year }}</p>
          <p>{{ work.medium }}</p>
          <p>{{ work.size }}</p>
        </div>
      </li>
    </ul>

    <RouterLink class="series-detail__back" to="/series">
      ← Все серии
    </RouterLink>
  </section>

  <section v-else class="series-detail series-detail--empty">
    <h1>Серия не найдена</h1>
    <RouterLink to="/series">← Все серии</RouterLink>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getSeriesById } from '../data/series'

const route = useRoute()

const series = computed(() => {
  const id = route.params.id
  return typeof id === 'string' ? getSeriesById(id) : undefined
})
</script>

<style scoped>
.series-detail {
  padding: 64px 40px;
}

.series-detail__label {
  margin: 0 0 12px;
  font-size: 13px;
  color: #777;
}

.series-detail__title {
  margin: 0 0 16px;
  font-family: "Oswald", sans-serif;
  font-size: clamp(32px, 6vw, 56px);
  font-weight: 600;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.series-detail__description {
  margin: 0 0 48px;
  max-width: 480px;
  font-size: 16px;
  line-height: 1.45;
  color: #444;
}

.series-detail__works {
  display: grid;
  gap: 40px;
  margin: 0 0 48px;
  padding: 0;
  list-style: none;
}

.series-detail__work {
  display: grid;
  grid-template-columns: minmax(160px, 280px) minmax(0, 1fr);
  gap: 24px;
  align-items: end;
}

.series-detail__img,
.series-detail__placeholder {
  display: block;
  aspect-ratio: 1 / 2;
  width: 100%;
}

.series-detail__img {
  object-fit: contain;
  background: #e8e8e8;
}

.series-detail__placeholder {
  background: linear-gradient(160deg, #dcdcdc 0%, #c4c4c4 55%, #b0b0b0 100%);
}

.series-detail__meta {
  font-size: 14px;
  line-height: 1.5;
}

.series-detail__meta p {
  margin: 0;
  color: #555;
}

.series-detail__meta h2 {
  margin: 4px 0 10px;
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
}

.series-detail__back {
  color: #151515;
  font-size: 14px;
  text-decoration: none;
}

.series-detail__back:hover {
  opacity: 0.6;
}

.series-detail--empty {
  display: grid;
  gap: 16px;
}

@media (max-width: 900px) {
  .series-detail {
    padding: 40px 20px;
  }

  .series-detail__work {
    grid-template-columns: 1fr;
  }
}
</style>
