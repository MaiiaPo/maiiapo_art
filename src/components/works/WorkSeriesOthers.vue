<template>
  <section
    v-if="others.length"
    class="work-series-others"
    aria-labelledby="work-series-others-title"
  >
    <h2 id="work-series-others-title" class="work-series-others__title">
      Другие работы серии
    </h2>

    <ul class="work-series-others__grid">
      <li v-for="item in others" :key="item.id">
        <RouterLink class="work-series-others__card" :to="workPath(item.id)">
          <div class="work-series-others__media">
            <img
              v-if="item.image"
              class="work-series-others__img"
              :src="item.image"
              :alt="item.title"
            />
            <div v-else class="work-series-others__placeholder" />
          </div>

          <div class="work-series-others__body">
            <h3 class="work-series-others__name">[ {{ item.title }} ]</h3>
            <p class="work-series-others__meta">{{ item.year }}</p>
            <p class="work-series-others__meta">{{ item.size }}</p>
            <p
              class="work-series-others__status"
              :class="`work-series-others__status--${item.status}`"
            >
              {{ workStatusLabel[item.status] }}
            </p>
            <p
              v-if="item.status !== 'sold' && item.price > 0"
              class="work-series-others__price"
            >
              {{ formatPrice(item.price) }}
            </p>
          </div>
        </RouterLink>
      </li>
    </ul>

    <RouterLink
      v-if="seriesTo"
      class="work-series-others__cta"
      :to="seriesTo"
    >
      Смотреть серию →
    </RouterLink>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import {
  formatPrice,
  getWorksBySeriesId,
  workPath,
  workStatusLabel,
} from '../../data/works'

const props = defineProps<{
  seriesId: string
  currentWorkId: string
  seriesTo?: string
}>()

const others = computed(() =>
  getWorksBySeriesId(props.seriesId).filter(
    (work) => work.id !== props.currentWorkId,
  ),
)
</script>

<style scoped>
.work-series-others {
  padding-top: 40px;
  border-top: 1px solid #ddd;
}

.work-series-others__title {
  margin: 0 0 28px;
  font-family: "Oswald", sans-serif;
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 600;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.work-series-others__cta {
  display: inline-flex;
  margin-top: 28px;
  color: inherit;
  font-family: "Inter", sans-serif;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.work-series-others__cta:hover {
  opacity: 0.6;
}

.work-series-others__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px 40px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.work-series-others__card {
  display: grid;
  grid-template-columns: minmax(100px, 140px) minmax(0, 1fr);
  gap: 18px;
  align-items: start;
  color: inherit;
  text-decoration: none;
}

.work-series-others__card:hover .work-series-others__name {
  opacity: 0.65;
}

.work-series-others__media {
  min-width: 0;
  background: #ececec;
}

.work-series-others__img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 2;
  object-fit: contain;
  object-position: center;
  background: #ececec;
}

.work-series-others__placeholder {
  aspect-ratio: 1 / 2;
  background: linear-gradient(160deg, #dcdcdc 0%, #c4c4c4 55%, #b0b0b0 100%);
}

.work-series-others__body {
  padding-top: 4px;
}

.work-series-others__name {
  margin: 0 0 10px;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.3;
  transition: opacity 0.2s ease;
}

.work-series-others__meta {
  margin: 0;
  font-size: 13px;
  line-height: 1.45;
  color: #666;
}

.work-series-others__status {
  margin: 10px 0 0;
  font-size: 13px;
}

.work-series-others__status--available {
  color: #d51d78;
}

.work-series-others__status--sold {
  color: #888;
}

.work-series-others__status--reserved {
  color: #b45f00;
}

.work-series-others__price {
  margin: 6px 0 0;
  font-size: 15px;
  font-weight: 600;
}

@media (max-width: 900px) {
  .work-series-others__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .work-series-others__card {
    grid-template-columns: minmax(88px, 110px) minmax(0, 1fr);
    gap: 14px;
  }
}
</style>
