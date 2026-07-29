<template>
  <section class="series-works" aria-labelledby="series-works-title">
    <div class="series-works__head">
      <h2 id="series-works-title" class="series-works__title">Работы серии</h2>

      <div v-if="pages > 1" class="series-works__nav">
        <button
          class="series-works__arrow"
          type="button"
          aria-label="Предыдущие работы"
          :disabled="page === 0"
          @click="page -= 1"
        >
          ←
        </button>
        <p class="series-works__counter">
          {{ paddedPage }} / {{ paddedPages }}
        </p>
        <button
          class="series-works__arrow"
          type="button"
          aria-label="Следующие работы"
          :disabled="page >= pages - 1"
          @click="page += 1"
        >
          →
        </button>
      </div>
    </div>

    <ul class="series-works__grid">
      <li v-for="work in visibleWorks" :key="work.id">
        <WorkCard :work="work" />
      </li>
    </ul>

    <p v-if="seriesWorks.length === 0" class="series-works__empty">
      В этой серии пока нет работ
    </p>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import WorkCard from '../works/WorkCard.vue'
import type { Series } from '../../data/series'
import {
  getWorkById,
  type Work,
} from '../../data/works'

const props = defineProps<{
  series: Series
}>()

const perPage = 4
const page = ref(0)

const seriesWorks = computed<Work[]>(() =>
  props.series.works.map((item) => {
    const fromCatalog = getWorkById(item.id)
    if (fromCatalog) return fromCatalog

    return {
      id: item.id,
      index: item.index,
      title: item.title,
      year: Number(item.year) || 0,
      size: item.size,
      medium: item.medium,
      price: 0,
      status: 'available' as const,
      seriesId: props.series.id,
      image: item.image,
    }
  }),
)

const pages = computed(() =>
  Math.max(1, Math.ceil(seriesWorks.value.length / perPage)),
)

const visibleWorks = computed(() => {
  const start = page.value * perPage
  return seriesWorks.value.slice(start, start + perPage)
})

const paddedPage = computed(() => String(page.value + 1).padStart(2, '0'))
const paddedPages = computed(() => String(pages.value).padStart(2, '0'))

watch(
  () => props.series.id,
  () => {
    page.value = 0
  },
)
</script>

<style scoped>
.series-works {
  max-width: 1180px;
  margin-inline: auto;
  padding: 24px 40px 80px;
}

.series-works__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 32px;
}

.series-works__title {
  margin: 0;
  font-family: "Oswald", sans-serif;
  font-size: clamp(28px, 3vw, 40px);
  font-weight: 600;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.series-works__nav {
  display: flex;
  align-items: center;
  gap: 14px;
}

.series-works__arrow {
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #d51d78;
  font: inherit;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
}

.series-works__arrow:disabled {
  opacity: 0.35;
  cursor: default;
}

.series-works__counter {
  margin: 0;
  min-width: 64px;
  font-size: 13px;
  letter-spacing: 0.06em;
  text-align: center;
  color: #555;
}

.series-works__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 28px 20px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.series-works__empty {
  margin: 0;
  color: #777;
}

@media (max-width: 1100px) {
  .series-works__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .series-works {
    padding: 16px 20px 56px;
  }
}

@media (max-width: 560px) {
  .series-works__grid {
    grid-template-columns: 1fr;
  }
}
</style>
