<template>
  <div v-if="series" class="series-detail">
    <SeriesHeroBanner :series="series" />
    <SeriesDetails
      v-if="series.detailImages.length"
      :images="series.detailImages"
    />
    <SeriesInterior
      v-if="series.interiorImages.length"
      :images="series.interiorImages"
    />
    <SeriesWorks :series="series" />
  </div>

  <section v-else class="series-detail series-detail--empty">
    <h1>Серия не найдена</h1>
    <RouterLink to="/series">← Все серии</RouterLink>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import SeriesDetails from '../components/series/SeriesDetails.vue'
import SeriesHeroBanner from '../components/series/SeriesHeroBanner.vue'
import SeriesInterior from '../components/series/SeriesInterior.vue'
import SeriesWorks from '../components/series/SeriesWorks.vue'
import { getSeriesById } from '../data/series'

const route = useRoute()

const series = computed(() => {
  const id = route.params.id
  return typeof id === 'string' ? getSeriesById(id) : undefined
})
</script>

<style scoped>
.series-detail {
  display: grid;
  gap: 20px;
  padding: 20px;
  background: #fff;
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

  .series-detail--empty {
    padding: 40px 20px;
  }
}
</style>
