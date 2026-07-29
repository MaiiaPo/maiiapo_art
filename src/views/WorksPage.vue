<template>
  <section class="works-page">
    <header class="works-page__header">
      <h1 class="works-page__title">Работы</h1>
      <p class="works-page__lead">
        Каждая работа исследует, как цифровая среда меняет человека.
      </p>
      <p class="works-page__count">
        {{ formatWorksCount(works.length) }},
        {{ formatSeriesCount(seriesList.length) }}
      </p>
    </header>

    <div class="works-page__filters" aria-label="Фильтры">
      <!-- TODO: фильтры (серия, размер, год, материал, наличие) -->
      <div class="works-page__toolbar">
        <div class="works-page__chips">
          <button
            type="button"
            class="works-page__chip"
            :class="{ 'works-page__chip--active': selectedSeries === 'all' }"
            @click="selectedSeries = 'all'"
          >
            Все работы
          </button>
          <button
            v-for="item in seriesList"
            :key="item.id"
            type="button"
            class="works-page__chip"
            :class="{ 'works-page__chip--active': selectedSeries === item.id }"
            @click="selectedSeries = item.id"
          >
            {{ item.title }}
          </button>
          <button
            type="button"
            class="works-page__chip"
            :class="{ 'works-page__chip--active': selectedSeries === 'none' }"
            @click="selectedSeries = 'none'"
          >
            Без серии
          </button>
        </div>

        <SortDropdown v-model="sortBy" />
      </div>
    </div>

    <ul class="works-page__grid">
      <li v-for="work in visibleWorks" :key="work.id">
        <WorkCard :work="work" />
      </li>
    </ul>

    <p v-if="visibleWorks.length === 0" class="works-page__empty">
      Пока нет работ в этом фильтре
    </p>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import SortDropdown, { type SortOptionValue } from '../components/works/SortDropdown.vue'
import WorkCard from '../components/works/WorkCard.vue'
import { formatSeriesCount, seriesList } from '../data/series'
import { formatWorksCount, works, type Work } from '../data/works'

const selectedSeries = ref<'all' | 'none' | string>('all')
const sortBy = ref<SortOptionValue>('newest')

const filteredWorks = computed(() => {
  if (selectedSeries.value === 'all') return works
  if (selectedSeries.value === 'none') {
    return works.filter((work) => work.seriesId === null)
  }
  return works.filter((work) => work.seriesId === selectedSeries.value)
})

const visibleWorks = computed(() => {
  const list = [...filteredWorks.value]

  const byIndexDesc = (a: Work, b: Work) =>
    Number(b.index) - Number(a.index) || b.year - a.year

  if (sortBy.value === 'newest') {
    return list.sort((a, b) => b.year - a.year || byIndexDesc(a, b))
  }

  if (sortBy.value === 'price-asc') {
    return list.sort((a, b) => a.price - b.price || byIndexDesc(a, b))
  }

  return list.sort((a, b) => b.price - a.price || byIndexDesc(a, b))
})
</script>

<style scoped>
.works-page {
  padding: 56px 40px 72px;
}

.works-page__header {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: end;
  gap: 24px 48px;
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #ddd;
}

.works-page__title {
  margin: 0;
  font-family: "Oswald", sans-serif;
  font-size: clamp(40px, 6vw, 64px);
  font-weight: 600;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.works-page__lead {
  margin: 0;
  max-width: 320px;
  font-size: 15px;
  line-height: 1.45;
  color: #555;
}

.works-page__count {
  margin: 0;
  font-size: 14px;
  color: #777;
  white-space: nowrap;
}

.works-page__filters {
  margin-bottom: 36px;
}

.works-page__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.works-page__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.works-page__chip {
  margin: 0;
  padding: 8px 14px;
  border: 1px solid #cfcfcf;
  border-radius: 999px;
  background: transparent;
  color: #151515;
  font: inherit;
  font-size: 13px;
  cursor: pointer;
}

.works-page__chip--active {
  border-color: #151515;
  background: #151515;
  color: #fff;
}

.works-page__chip:hover {
  border-color: #151515;
}

.works-page__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 36px 20px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.works-page__empty {
  margin: 48px 0 0;
  color: #777;
}

@media (max-width: 1100px) {
  .works-page__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .works-page {
    padding: 40px 20px 56px;
  }

  .works-page__header {
    grid-template-columns: 1fr;
    gap: 16px;
    align-items: start;
  }
}

@media (max-width: 560px) {
  .works-page__grid {
    grid-template-columns: 1fr;
  }
}
</style>
