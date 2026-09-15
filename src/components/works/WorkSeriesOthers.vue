<template>
  <section
    v-if="others.length"
    class="work-series-others"
    aria-labelledby="work-series-others-title"
  >
    <div class="work-series-others__header">
      <h2 id="work-series-others-title" class="work-series-others__title">
        {{ t('works.otherWorks') }}
      </h2>
      <RouterLink
        v-if="seriesTo"
        class="work-series-others__about"
        :to="seriesTo"
      >
        {{ t('works.aboutSeries') }}
        <span class="work-series-others__about-arrow" aria-hidden="true">→</span>
      </RouterLink>
    </div>

    <ul class="work-series-others__grid">
      <li v-for="item in others" :key="item.id">
        <article class="work-series-others__card">
          <RouterLink class="work-series-others__media" :to="workPath(item.id)">
            <LazyImage
              v-if="item.image"
              class="work-series-others__img"
              fill
              :src="item.image"
              :alt="item.displayTitle"
              object-fit="contain"
            />
            <div v-else class="work-series-others__placeholder" />
          </RouterLink>

          <div class="work-series-others__body">
            <h3 class="work-series-others__name">
              <RouterLink
                class="work-series-others__name-ru"
                :to="workPath(item.id)"
              >
                {{ item.displayTitle }}
              </RouterLink>
              <span
                v-if="item.subtitle"
                class="work-series-others__name-en"
              >
                {{ item.subtitle }}
              </span>
            </h3>

            <div class="work-series-others__specs">
              <div class="work-series-others__specs-left">
                <span class="work-series-others__year">{{ item.year }}</span>
                <span class="work-series-others__size">
                  {{ localizeSize(item.size, locale) }}
                </span>
              </div>
              <div class="work-series-others__specs-right">
                <span
                  class="work-series-others__status"
                  :class="`work-series-others__status--${item.status}`"
                >
                  {{ t(`status.${item.status}`) }}
                </span>
                <span class="work-series-others__price">
                  <template v-if="shouldShowWorkPrice(item)">
                    {{ formatPrice(item.price) }}
                  </template>
                  <template v-else>&nbsp;</template>
                </span>
              </div>
            </div>

            <RouterLink class="work-series-others__more" :to="workPath(item.id)">
              {{ t('works.viewWork') }}
              <span class="work-series-others__more-arrow" aria-hidden="true">→</span>
            </RouterLink>
          </div>
        </article>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import {
  formatPrice,
  getWorksBySeriesId,
  shouldShowWorkPrice,
  workPath,
} from '../../data/works'
import { localizeSize, useI18n } from '../../i18n'
import { getWorkDisplayTitle, getWorkSubtitle } from '../../i18n/content'
import LazyImage from '../ui/LazyImage.vue'

const props = defineProps<{
  seriesId: string
  currentWorkId: string
  seriesTo?: string
}>()

const { t, locale } = useI18n()

const others = computed(() =>
  getWorksBySeriesId(props.seriesId)
    .filter((work) => work.id !== props.currentWorkId)
    .map((work) => ({
      ...work,
      displayTitle: getWorkDisplayTitle(work, locale.value),
      subtitle: getWorkSubtitle(work, locale.value),
    })),
)
</script>

<style scoped>
.work-series-others {
  padding-top: 40px;
  border-top: 1px solid #ddd;
}

.work-series-others__header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 56px;
  margin: 0 0 28px;
}

.work-series-others__title {
  margin: 0;
  font-family: "Oswald", sans-serif;
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 600;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.work-series-others__about {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #151515;
  font-family: "Inter", sans-serif;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.work-series-others__about:hover {
  opacity: 0.65;
}

.work-series-others__about-arrow {
  color: #d51d78;
  font-size: 16px;
  line-height: 1;
}

.work-series-others__grid {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 20px 28px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.work-series-others__grid > li {
  flex: 0 0 auto;
}

.work-series-others__card {
  display: grid;
  grid-template-columns: minmax(100px, 140px) minmax(200px, 240px);
  gap: 18px;
  align-items: start;
  color: inherit;
}

.work-series-others__media {
  display: block;
  min-width: 0;
  background: #ececec;
  text-decoration: none;
}

.work-series-others__img {
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 2;
}

.work-series-others__img :deep(.lazy-image__media) {
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 2;
}

.work-series-others__placeholder {
  aspect-ratio: 1 / 2;
  background: linear-gradient(160deg, #dcdcdc 0%, #c4c4c4 55%, #b0b0b0 100%);
}

.work-series-others__body {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-width: 0;
  padding-top: 4px;
}

.work-series-others__name {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 0 0 14px;
}

.work-series-others__name-ru {
  color: #151515;
  font-family: "Oswald", sans-serif;
  font-size: clamp(16px, 1.6vw, 20px);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.work-series-others__name-ru:hover {
  opacity: 0.65;
}

.work-series-others__name-en {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.3;
  color: #777;
}

.work-series-others__specs {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  margin: 0 0 18px;
  padding: 14px 0;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}

.work-series-others__specs-left,
.work-series-others__specs-right {
  display: grid;
  gap: 4px;
}

.work-series-others__specs-right {
  justify-items: end;
  text-align: right;
}

.work-series-others__year,
.work-series-others__size {
  font-size: 14px;
  color: #777;
}

.work-series-others__status {
  font-size: 14px;
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

.work-series-others__status--in-progress {
  color: #888;
}

.work-series-others__price {
  min-height: 1.2em;
  font-size: 15px;
  font-weight: 600;
  color: #151515;
}

.work-series-others__more {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
  color: #151515;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.work-series-others__more:hover {
  opacity: 0.65;
}

.work-series-others__more-arrow {
  color: #d51d78;
  font-size: 14px;
  line-height: 1;
}

@media (max-width: 560px) {
  .work-series-others__card {
    grid-template-columns: minmax(88px, 110px) minmax(160px, 1fr);
    gap: 14px;
  }
}
</style>
