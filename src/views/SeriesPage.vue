<template>
  <section class="series-list">
    <p class="series-list__label">[ серии ]</p>
    <h1 class="series-list__title">Серии</h1>

    <ul class="series-list__items">
      <li v-for="item in seriesList" :key="item.id">
        <RouterLink class="series-list__link" :to="seriesPath(item.id)">
          <span class="series-list__name">{{ item.title }}</span>
          <span class="series-list__meta">{{ item.description }}</span>
          <span class="series-list__arrow" aria-hidden="true">→</span>
        </RouterLink>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { seriesList, seriesPath } from '../data/series'
</script>

<style scoped>
.series-list {
  padding: 64px 40px;
}

.series-list__label {
  margin: 0 0 12px;
  font-size: 13px;
  color: #777;
}

.series-list__title {
  margin: 0 0 40px;
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
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 8px 24px;
  padding: 24px 0;
  border-top: 1px solid #ddd;
  color: inherit;
  text-decoration: none;
}

.series-list__link:last-child {
  border-bottom: 1px solid #ddd;
}

.series-list__link:hover {
  opacity: 0.7;
}

.series-list__name {
  font-family: "Oswald", sans-serif;
  font-size: clamp(22px, 3vw, 32px);
  font-weight: 500;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.series-list__meta {
  grid-column: 1;
  max-width: 480px;
  font-size: 15px;
  line-height: 1.4;
  color: #555;
}

.series-list__arrow {
  grid-row: 1 / span 2;
  align-self: center;
  color: #d51d78;
  font-size: 20px;
}

@media (max-width: 900px) {
  .series-list {
    padding: 40px 20px;
  }
}
</style>
