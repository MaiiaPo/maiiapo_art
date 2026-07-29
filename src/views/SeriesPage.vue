<template>
  <section class="series-list">
    <div class="series-list__inner">
      <p class="series-list__label">[ серии ]</p>
      <h1 class="series-list__title">Серии</h1>

      <ul class="series-list__items">
        <li v-for="item in seriesList" :key="item.id">
          <RouterLink class="series-list__link" :to="seriesPath(item.id)">
            <div class="series-list__copy">
              <h2 class="series-list__name">{{ item.title }}</h2>
              <p class="series-list__meta">{{ item.description }}</p>
            </div>

            <ul class="series-list__thumbs" aria-hidden="true">
              <li v-for="(work, index) in previewWorks(item)" :key="`${item.id}-${index}`">
                <img
                  v-if="work?.image"
                  class="series-list__thumb"
                  :src="work.image"
                  :alt="work.title"
                />
                <div v-else class="series-list__thumb series-list__thumb--empty" />
              </li>
            </ul>

            <span class="series-list__arrow" aria-hidden="true">→</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { seriesList, seriesPath, type Series, type SeriesWork } from '../data/series'

function previewWorks(series: Series): (SeriesWork | undefined)[] {
  return [0, 1, 2].map((index) => series.works[index])
}
</script>

<style scoped>
.series-list {
  padding: 64px 40px;
}

.series-list__inner {
  max-width: 1100px;
  margin-inline: auto;
}

.series-list__label {
  margin: 0 0 12px;
  font-size: 13px;
  color: #777;
}

.series-list__title {
  margin: 0 0 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #ddd;
  font-family: "Oswald", sans-serif;
  font-size: clamp(32px, 6vw, 56px);
  font-weight: 600;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.series-list__items {
  margin: 0;
  padding: 0;
  list-style: none;
}

.series-list__link {
  display: flex;
  align-items: center;
  gap: 28px;
  padding: 36px 0;
  border-bottom: 1px solid #ddd;
  color: inherit;
  text-decoration: none;
}

.series-list__link:hover {
  opacity: 0.75;
}

.series-list__copy {
  flex: 0 1 auto;
  max-width: 420px;
}

.series-list__name {
  margin: 0 0 10px;
  font-family: "Oswald", sans-serif;
  font-size: clamp(20px, 2.2vw, 28px);
  font-weight: 500;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  white-space: nowrap;
}

.series-list__meta {
  margin: 0;
  font-size: 15px;
  line-height: 1.45;
  color: #555;
}

.series-list__thumbs {
  display: grid;
  grid-template-columns: repeat(3, 72px);
  gap: 10px;
  flex-shrink: 0;
  margin: 0;
  padding: 0;
  list-style: none;
}

.series-list__thumb {
  display: block;
  width: 72px;
  height: 96px;
  object-fit: contain;
  background: #e8e8e8;
}

.series-list__thumb--empty {
  background: linear-gradient(160deg, #dcdcdc 0%, #c4c4c4 55%, #b0b0b0 100%);
}

.series-list__arrow {
  margin-left: auto;
  color: #d51d78;
  font-size: 22px;
  line-height: 1;
}

@media (max-width: 900px) {
  .series-list {
    padding: 40px 20px;
  }

  .series-list__link {
    flex-wrap: wrap;
  }

  .series-list__name {
    white-space: normal;
  }

  .series-list__copy {
    max-width: none;
    flex: 1 1 calc(100% - 40px);
  }

  .series-list__arrow {
    margin-left: 0;
  }
}
</style>
