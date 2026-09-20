<template>
  <article class="work-card">
    <div class="work-card__inner">
      <RouterLink class="work-card__media" :to="workPath(work.id)">
        <LazyImage
          v-if="work.image"
          class="work-card__img"
          :src="work.image"
          :alt="displayTitle"
          object-fit="contain"
          object-position="center"
        />
        <div v-else class="work-card__placeholder" aria-hidden="true" />
      </RouterLink>

      <div class="work-card__body">
        <h3 class="work-card__title">
          <RouterLink class="work-card__title-main" :to="workPath(work.id)">
            {{ displayTitle }}
          </RouterLink>
          <span v-if="subtitle" class="work-card__title-sub">{{ subtitle }}</span>
        </h3>

        <div class="work-card__series-slot">
          <p v-if="seriesTitle && seriesTo" class="work-card__series">
            <span class="work-card__series-label">{{ t('home.seriesLabel') }}</span>
            <RouterLink class="work-card__series-link" :to="seriesTo">
              {{ seriesTitle }}
            </RouterLink>
          </p>
        </div>

        <div class="work-card__specs">
          <div class="work-card__specs-left">
            <span class="work-card__year">{{ work.year }}</span>
            <span class="work-card__size">{{ size }}</span>
          </div>
          <div class="work-card__specs-right">
            <span
              class="work-card__status"
              :class="`work-card__status--${work.status}`"
            >
              {{ t(`status.${work.status}`) }}
            </span>
            <span class="work-card__price">
              <template v-if="shouldShowWorkPrice(work)">
                {{ formatPrice(work.price) }}
              </template>
              <template v-else>&nbsp;</template>
            </span>
          </div>
        </div>

        <RouterLink class="work-card__more" :to="workPath(work.id)">
          {{ t('works.viewWork') }}
          <span class="work-card__more-arrow" aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { seriesPath } from '../../data/series'
import {
  formatPrice,
  shouldShowWorkPrice,
  workPath,
  type Work,
} from '../../data/works'
import { localizeSize, useI18n } from '../../i18n'
import {
  getSeriesTitleForWork,
  getWorkDisplayTitle,
  getWorkSubtitle,
} from '../../i18n/content'
import LazyImage from '../ui/LazyImage.vue'

const props = defineProps<{
  work: Work
}>()

const { t, locale } = useI18n()

const displayTitle = computed(() =>
  getWorkDisplayTitle(props.work, locale.value),
)
const subtitle = computed(() => getWorkSubtitle(props.work, locale.value))
const size = computed(() => localizeSize(props.work.size, locale.value))
const seriesTitle = computed(() =>
  getSeriesTitleForWork(props.work, locale.value),
)
const seriesTo = computed(() =>
  props.work.seriesId ? seriesPath(props.work.seriesId) : undefined,
)
</script>

<style scoped>
.work-card {
  display: flex;
  justify-content: center;
  height: 100%;
}

.work-card__inner {
  display: flex;
  flex-direction: column;
  width: fit-content;
  max-width: 100%;
  height: 100%;
  text-align: left;
}

.work-card__media {
  display: block;
  margin-bottom: 14px;
  text-decoration: none;
}

.work-card__img {
  height: 320px;
  width: auto;
  max-width: 100%;
}

.work-card__img :deep(.lazy-image__media) {
  width: auto;
  max-width: 100%;
  height: 320px;
  margin-inline: auto;
}

.work-card__placeholder {
  display: block;
  height: 320px;
  width: 160px;
  max-width: 100%;
  background: linear-gradient(160deg, #dcdcdc 0%, #c4c4c4 55%, #b0b0b0 100%);
}

.work-card__body {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 1;
  width: 100%;
  min-width: 0;
}

.work-card__title {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 0 0 14px;
}

.work-card__title-main {
  color: #151515;
  font-family: "Oswald", sans-serif;
  font-size: clamp(18px, 1.8vw, 22px);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  text-decoration: none;
}

.work-card__title-main:hover {
  opacity: 0.65;
}

.work-card__title-sub {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.3;
  color: #777;
}

.work-card__series-slot {
  display: flex;
  align-items: center;
  min-height: 1.2em;
  margin: 0 0 18px;
}

.work-card__series {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35em;
  margin: 0;
  font-size: 12px;
  letter-spacing: 0.06em;
  line-height: 1.2;
  text-transform: uppercase;
}

.work-card__series-label {
  color: #151515;
}

.work-card__series-link {
  color: #d51d78;
  text-decoration: none;
}

.work-card__series-link:hover {
  opacity: 0.65;
}

.work-card__specs {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  margin: 0 0 18px;
  padding: 14px 0;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}

.work-card__specs-left,
.work-card__specs-right {
  display: grid;
  gap: 4px;
}

.work-card__specs-right {
  justify-items: end;
  text-align: right;
}

.work-card__year,
.work-card__size {
  font-size: 14px;
  color: #777;
}

.work-card__status {
  font-size: 14px;
}

.work-card__status--available {
  color: #d51d78;
}

.work-card__status--sold {
  color: #888;
}

.work-card__status--reserved {
  color: #b45f00;
}

.work-card__status--in-progress {
  color: #888;
}

.work-card__price {
  min-height: 1.2em;
  font-size: 15px;
  font-weight: 600;
  color: #151515;
}

.work-card__more {
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

.work-card__more:hover {
  opacity: 0.65;
}

.work-card__more-arrow {
  color: #d51d78;
  font-size: 14px;
  line-height: 1;
}
</style>
