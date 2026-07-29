<template>
  <section v-if="work" class="work-detail">
    <div class="work-detail__inner">
      <RouterLink class="work-detail__back" :to="backLink.to">
        ← {{ backLink.label }}
      </RouterLink>

      <div class="work-detail__main">
        <WorkInfo :work="work" />
        <WorkGallery :images="gallery" :alt="work.title" />
      </div>

      <WorkSeriesBlock
        v-if="series"
        :series="series"
        :current-work-id="work.id"
      />

      <section
        v-else-if="work.description"
        class="work-detail__about"
        aria-labelledby="work-about-title"
      >
        <h2 id="work-about-title" class="work-detail__about-title">О работе</h2>
        <p class="work-detail__about-text">{{ work.description }}</p>
      </section>

      <WorkSeriesOthers
        v-if="series"
        :series-id="series.id"
        :current-work-id="work.id"
      />
    </div>
  </section>

  <section v-else class="work-detail work-detail--empty">
    <h1>Работа не найдена</h1>
    <RouterLink to="/works">← Все работы</RouterLink>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import WorkGallery from '../components/works/WorkGallery.vue'
import WorkInfo from '../components/works/WorkInfo.vue'
import WorkSeriesBlock from '../components/works/WorkSeriesBlock.vue'
import WorkSeriesOthers from '../components/works/WorkSeriesOthers.vue'
import { getSeriesById, seriesPath } from '../data/series'
import { getWorkById, getWorkGallery } from '../data/works'

const route = useRoute()

const work = computed(() => {
  const id = route.params.id
  return typeof id === 'string' ? getWorkById(id) : undefined
})

const series = computed(() => {
  const seriesId = work.value?.seriesId
  return seriesId ? getSeriesById(seriesId) : undefined
})

const gallery = computed(() => (work.value ? getWorkGallery(work.value) : []))

const backLink = computed(() => {
  if (series.value) {
    return {
      to: seriesPath(series.value.id),
      label: 'к работам серии',
    }
  }

  return {
    to: '/works',
    label: 'к работам',
  }
})
</script>

<style scoped>
.work-detail {
  padding: 40px 40px 80px;
}

.work-detail__inner {
  max-width: 1180px;
  margin-inline: auto;
}

.work-detail__back {
  display: inline-block;
  margin-bottom: 28px;
  color: inherit;
  font-size: 14px;
  text-decoration: none;
}

.work-detail__back:hover {
  opacity: 0.6;
}

.work-detail__main {
  display: grid;
  grid-template-columns: minmax(240px, 340px) minmax(0, 1fr);
  gap: 48px 64px;
  align-items: start;
  margin-bottom: 48px;
}

.work-detail__about {
  padding: 36px 0 8px;
  border-top: 1px solid #ddd;
}

.work-detail__about-title {
  margin: 0 0 16px;
  font-family: "Oswald", sans-serif;
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 600;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.work-detail__about-text {
  margin: 0;
  max-width: 62ch;
  font-size: 15px;
  line-height: 1.6;
  color: #333;
}

.work-detail--empty {
  display: grid;
  gap: 16px;
}

.work-detail--empty a {
  color: inherit;
  text-decoration: none;
}

@media (max-width: 900px) {
  .work-detail {
    padding: 28px 20px 56px;
  }

  .work-detail__main {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
</style>
