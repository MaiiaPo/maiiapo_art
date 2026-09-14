<template>
  <section class="series-list">
    <div class="series-list__inner">
      <header class="series-list__header">
        <div class="series-list__heading">
          <p class="series-list__label">[ серии ]</p>
          <h1 class="series-list__title">Серии</h1>
        </div>

        <p class="series-list__slogan">
          <span>Искусство о том,</span>
          <span>как цифровая среда</span>
          <span>меняет человека</span>
        </p>
      </header>

      <ul class="series-list__items">
        <li
          v-for="(item, index) in seriesList"
          :key="item.id"
          class="series-list__item"
        >
          <RouterLink class="series-list__row" :to="seriesPath(item.id)">
            <div class="series-list__copy">
              <div class="series-list__titles">
                <span class="series-list__index">{{ padIndex(index) }} —</span>
                <h2 class="series-list__name-ru">{{ item.titleRu }}</h2>
                <p class="series-list__name-en">{{ item.title }}</p>
              </div>
              <p class="series-list__desc">{{ item.description }}</p>
              <span class="series-list__cta">
                Смотреть серию
                <span class="series-list__cta-arrow" aria-hidden="true">→</span>
              </span>
            </div>

            <ul class="series-list__thumbs" aria-hidden="true">
              <li
                v-for="(work, thumbIndex) in previewWorks(item)"
                :key="`${item.id}-${thumbIndex}`"
                class="series-list__thumb-wrap"
              >
                <img
                  v-if="work?.image"
                  class="series-list__thumb"
                  :src="work.image"
                  :alt="work.title"
                />
                <div v-else class="series-list__thumb series-list__thumb--empty" />
              </li>
            </ul>

            <div class="series-list__aside">
              <dl class="series-list__meta">
                <div class="series-list__meta-row">
                  <dt>Годы</dt>
                  <dd>{{ formatSeriesYears(item) }}</dd>
                </div>
                <div class="series-list__meta-row">
                  <dt>Техника</dt>
                  <dd>{{ getSeriesMedium(item) }}</dd>
                </div>
                <div class="series-list__meta-row">
                  <dt>Количество работ</dt>
                  <dd>{{ formatWorksCount(item.works.length) }}</dd>
                </div>
                <div class="series-list__meta-row">
                  <dt>Статус</dt>
                  <dd>{{ seriesStatusLabel[item.status] }}</dd>
                </div>
              </dl>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  formatSeriesYears,
  getSeriesMedium,
  seriesList,
  seriesPath,
  seriesStatusLabel,
  type Series,
  type SeriesWork,
} from '../data/series'
import { formatWorksCount } from '../data/works'

function padIndex(index: number): string {
  return String(index + 1).padStart(2, '0')
}

function previewWorks(series: Series): (SeriesWork | undefined)[] {
  return [0, 1, 2].map((index) => series.works[index])
}
</script>

<style scoped>
.series-list {
  padding: 48px 40px 72px;
  background: #f3f3f3;
  color: #151515;
}

.series-list__inner {
  max-width: 1200px;
  margin-inline: auto;
}

.series-list__header {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 24px 48px;
  align-items: start;
  padding-bottom: 28px;
  border-bottom: 1px solid #d8d8d8;
}

.series-list__label {
  margin: 0 0 14px;
  font-family: "Inter", sans-serif;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #888;
}

.series-list__title {
  margin: 0;
  font-family: "Oswald", sans-serif;
  font-size: clamp(40px, 7vw, 72px);
  font-weight: 600;
  line-height: 0.95;
  letter-spacing: -0.03em;
  text-transform: uppercase;
}

.series-list__slogan {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  margin: 10px 0 0;
  padding-left: 20px;
  border-left: 1px solid #cfcfcf;
  font-family: "Inter", sans-serif;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.08em;
  line-height: 1.35;
  text-transform: uppercase;
  color: #6a6a6a;
}

.series-list__items {
  margin: 0;
  padding: 0;
  list-style: none;
}

.series-list__item {
  border-bottom: 1px solid #d8d8d8;
}

.series-list__row {
  display: grid;
  grid-template-columns:
    minmax(220px, 1.05fr)
    minmax(240px, 1.15fr)
    minmax(140px, 0.45fr);
  gap: 28px 32px;
  align-items: stretch;
  padding: 36px 0;
  color: inherit;
  text-decoration: none;
}

.series-list__row:hover .series-list__cta {
  opacity: 0.7;
}

.series-list__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.series-list__titles {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  column-gap: 0.35em;
  row-gap: 6px;
  align-items: baseline;
  margin: 0 0 14px;
}

.series-list__index {
  grid-column: 1;
  grid-row: 1;
  color: #9a9a9a;
  font-family: "Oswald", sans-serif;
  font-size: clamp(22px, 2.4vw, 32px);
  font-weight: 500;
  line-height: 1.05;
  letter-spacing: -0.02em;
  white-space: nowrap;
}

.series-list__name-ru {
  grid-column: 2;
  grid-row: 1;
  margin: 0;
  font-family: "Oswald", sans-serif;
  font-size: clamp(22px, 2.4vw, 32px);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.series-list__name-en {
  grid-column: 2;
  grid-row: 2;
  margin: 0;
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.1em;
  line-height: 1.3;
  text-transform: uppercase;
  color: #8a8a8a;
}

.series-list__desc {
  margin: 0;
  max-width: 42ch;
  font-size: 14px;
  line-height: 1.5;
  color: #555;
}

.series-list__cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 22px;
  padding-bottom: 2px;
  border-bottom: 1px solid #151515;
  font-family: "Inter", sans-serif;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: opacity 0.2s ease;
}

.series-list__cta-arrow {
  color: #d51d78;
  font-size: 14px;
  line-height: 1;
}

.series-list__thumbs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
  height: 100%;
  align-self: stretch;
}

.series-list__thumb-wrap {
  min-width: 0;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  box-sizing: border-box;
  background: #e8e8e8;
}

.series-list__thumb {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.series-list__thumb--empty {
  width: 100%;
  height: 100%;
  background: linear-gradient(160deg, #dcdcdc 0%, #c4c4c4 55%, #b0b0b0 100%);
}

.series-list__aside {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 100%;
}

.series-list__meta {
  display: grid;
  gap: 16px;
  margin: 0;
}

.series-list__meta-row {
  margin: 0;
}

.series-list__meta-row dt {
  margin: 0 0 4px;
  font-family: "Inter", sans-serif;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #9a9a9a;
}

.series-list__meta-row dd {
  margin: 0;
  font-size: 13px;
  line-height: 1.35;
  color: #151515;
}

@media (max-width: 1000px) {
  .series-list__row {
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .series-list__thumbs {
    grid-column: 1 / -1;
    min-height: 240px;
  }

  .series-list__aside {
    grid-column: 1 / -1;
  }

  .series-list__meta {
    grid-template-columns: repeat(4, auto);
    gap: 16px 28px;
  }
}

@media (max-width: 700px) {
  .series-list {
    padding: 36px 20px 56px;
  }

  .series-list__header {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .series-list__slogan {
    padding-left: 0;
    border-left: 0;
    padding-top: 16px;
    border-top: 1px solid #cfcfcf;
  }

  .series-list__row {
    grid-template-columns: 1fr;
    padding: 28px 0;
  }

  .series-list__thumbs {
    max-width: 320px;
  }

  .series-list__aside {
    flex-direction: column;
    align-items: flex-start;
  }

  .series-list__meta {
    grid-template-columns: 1fr;
  }
}
</style>
