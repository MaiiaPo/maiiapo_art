<template>
  <section class="work-series-block" aria-labelledby="work-series-title">
    <div class="work-series-block__media">
      <img
        v-if="cover"
        class="work-series-block__cover"
        :src="cover"
        :alt="series.title"
      />
      <div v-else class="work-series-block__cover work-series-block__cover--empty" />
    </div>

    <div class="work-series-block__copy">
      <p class="work-series-block__eyebrow">[ серия ]</p>
      <h2 id="work-series-title" class="work-series-block__title">
        {{ series.title }}
      </h2>
      <p class="work-series-block__text">{{ series.description }}</p>
      <RouterLink class="work-series-block__cta" :to="seriesPath(series.id)">
        Смотреть серию →
      </RouterLink>
    </div>

    <div class="work-series-block__aside">
      <p class="work-series-block__stat">{{ formatWorksCount(seriesWorks.length) }}</p>
      <p class="work-series-block__stat">{{ yearLabel }}</p>

      <ul v-if="previews.length" class="work-series-block__avatars" aria-hidden="true">
        <li v-for="item in previews" :key="item.id">
          <img v-if="item.image" :src="item.image" :alt="item.title" />
          <span v-else />
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { seriesPath, type Series } from '../../data/series'
import {
  formatWorksCount,
  getWorksBySeriesId,
  type Work,
} from '../../data/works'

const props = defineProps<{
  series: Series
  currentWorkId: string
}>()

const seriesWorks = computed(() => getWorksBySeriesId(props.series.id))

const cover = computed(
  () =>
    props.series.bannerImage ??
    seriesWorks.value.find((work) => work.image)?.image,
)

const yearLabel = computed(() => {
  const years = seriesWorks.value.map((work) => work.year)
  if (!years.length) return ''
  const min = Math.min(...years)
  const max = Math.max(...years)
  return min === max ? String(min) : `${min}–${max}`
})

const previews = computed<Work[]>(() =>
  seriesWorks.value
    .filter((work) => work.id !== props.currentWorkId && work.image)
    .slice(0, 4),
)
</script>

<style scoped>
.work-series-block {
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr) auto;
  gap: 28px 36px;
  align-items: start;
  padding: 36px 0;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}

.work-series-block__cover {
  display: block;
  width: 120px;
  aspect-ratio: 1 / 1.35;
  object-fit: cover;
  background: #e0e0e0;
}

.work-series-block__cover--empty {
  background: linear-gradient(160deg, #dcdcdc 0%, #c4c4c4 55%, #b0b0b0 100%);
}

.work-series-block__eyebrow {
  margin: 0 0 8px;
  font-size: 13px;
  color: #777;
}

.work-series-block__title {
  margin: 0 0 12px;
  font-family: "Oswald", sans-serif;
  font-size: clamp(22px, 2.4vw, 32px);
  font-weight: 600;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.work-series-block__text {
  margin: 0 0 18px;
  max-width: 48ch;
  font-size: 15px;
  line-height: 1.5;
  color: #444;
}

.work-series-block__cta {
  color: inherit;
  font-size: 13px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none;
}

.work-series-block__cta:hover {
  color: #d51d78;
}

.work-series-block__aside {
  display: grid;
  gap: 6px;
  justify-items: end;
  text-align: right;
}

.work-series-block__stat {
  margin: 0;
  font-size: 14px;
  color: #555;
}

.work-series-block__avatars {
  display: flex;
  margin: 14px 0 0;
  padding: 0;
  list-style: none;
}

.work-series-block__avatars li {
  width: 36px;
  height: 36px;
  overflow: hidden;
  border: 2px solid #f7f7f7;
  border-radius: 50%;
  background: #ddd;
}

.work-series-block__avatars li + li {
  margin-left: -10px;
}

.work-series-block__avatars img,
.work-series-block__avatars span {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 800px) {
  .work-series-block {
    grid-template-columns: 88px 1fr;
  }

  .work-series-block__cover {
    width: 88px;
  }

  .work-series-block__aside {
    grid-column: 1 / -1;
    justify-items: start;
    text-align: left;
  }
}
</style>
