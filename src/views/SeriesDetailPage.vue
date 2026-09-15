<template>
  <div v-if="series" class="series-detail">
    <SeriesHeroBanner :series="series" />
    <SeriesAbout v-if="about" :about="about" />
    <div
      v-if="about && process"
      class="series-detail__divider"
      aria-hidden="true"
    />
    <SeriesProcess v-if="process" :process="process" />
    <SeriesInterior :series="series" />
  </div>

  <section v-else class="series-detail series-detail--empty">
    <h1>{{ t('series.notFound') }}</h1>
    <RouterLink to="/series">{{ t('series.allSeries') }}</RouterLink>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import SeriesAbout from '../components/series/SeriesAbout.vue'
import SeriesHeroBanner from '../components/series/SeriesHeroBanner.vue'
import SeriesInterior from '../components/series/SeriesInterior.vue'
import SeriesProcess from '../components/series/SeriesProcess.vue'
import { getSeriesById } from '../data/series'
import { seriesProcessById } from '../data/seriesProcess'
import { useI18n } from '../i18n'
import { getSeriesAboutLocalized } from '../i18n/content'

const route = useRoute()
const { t, locale } = useI18n()

const series = computed(() => {
  const id = route.params.id
  return typeof id === 'string' ? getSeriesById(id) : undefined
})

const about = computed(() => {
  const id = route.params.id
  return typeof id === 'string'
    ? getSeriesAboutLocalized(id, locale.value)
    : undefined
})

const process = computed(() => {
  const id = route.params.id
  return typeof id === 'string' ? seriesProcessById[id] : undefined
})
</script>

<style scoped>
.series-detail {
  display: grid;
  gap: 20px;
  padding: 20px;
  background: #fff;
}

.series-detail__divider {
  height: 1px;
  margin-inline: 40px;
  background: #ddd;
}

.series-detail--empty {
  display: grid;
  gap: 16px;
  padding: 64px 40px;
}

.series-detail--empty a {
  color: inherit;
  text-decoration: none;
}

@media (max-width: 900px) {
  .series-detail {
    gap: 12px;
    padding: 12px;
  }

  .series-detail__divider {
    margin-inline: 20px;
  }

  .series-detail--empty {
    padding: 40px 20px;
  }
}
</style>
