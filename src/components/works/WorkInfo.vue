<template>
  <div class="work-info">
    <p class="work-info__label">[ оригинальная работа ]</p>
    <h1 class="work-info__title">{{ work.title }}</h1>

    <ul class="work-info__meta">
      <li>{{ work.year }}</li>
      <li>{{ work.medium }}</li>
      <li>{{ work.size }}</li>
    </ul>

    <p
      class="work-info__status"
      :class="`work-info__status--${work.status}`"
    >
      {{ workStatusLabel[work.status] }}
    </p>
    <p v-if="work.status !== 'sold' && work.price > 0" class="work-info__price">
      {{ formatPrice(work.price) }}
    </p>

    <div class="work-info__accordions">
      <details v-if="work.description" class="work-info__item">
        <summary>О работе</summary>
        <p>{{ work.description }}</p>
      </details>

      <details class="work-info__item">
        <summary>Детали</summary>
        <ul class="work-info__details">
          <li><span>Год</span>{{ work.year }}</li>
          <li><span>Техника</span>{{ work.medium }}</li>
          <li><span>Размер</span>{{ work.size }}</li>
          <li><span>Статус</span>{{ workStatusLabel[work.status] }}</li>
        </ul>
      </details>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  formatPrice,
  workStatusLabel,
  type Work,
} from '../../data/works'

defineProps<{
  work: Work
}>()
</script>

<style scoped>
.work-info__label {
  margin: 0 0 10px;
  font-size: 13px;
  color: #777;
}

.work-info__title {
  margin: 0 0 20px;
  font-family: "Oswald", sans-serif;
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.05;
  text-transform: uppercase;
}

.work-info__meta {
  display: grid;
  gap: 4px;
  margin: 0 0 20px;
  padding: 0;
  list-style: none;
  font-size: 15px;
  line-height: 1.5;
  color: #333;
}

.work-info__status {
  margin: 0 0 6px;
  font-size: 15px;
}

.work-info__status--available {
  color: #d51d78;
}

.work-info__status--sold {
  color: #888;
}

.work-info__status--reserved {
  color: #b45f00;
}

.work-info__price {
  margin: 0 0 28px;
  font-size: 22px;
  font-weight: 600;
}

.work-info__accordions {
  display: grid;
  border-top: 1px solid #ddd;
}

.work-info__item {
  border-bottom: 1px solid #ddd;
}

.work-info__item summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  list-style: none;
}

.work-info__item summary::-webkit-details-marker {
  display: none;
}

.work-info__item summary::after {
  content: "+";
  font-size: 18px;
  font-weight: 400;
  color: #888;
}

.work-info__item[open] summary::after {
  content: "−";
}

.work-info__item p {
  margin: 0 0 18px;
  max-width: 36ch;
  font-size: 14px;
  line-height: 1.55;
  color: #444;
}

.work-info__details {
  display: grid;
  gap: 10px;
  margin: 0 0 18px;
  padding: 0;
  list-style: none;
  font-size: 14px;
  color: #333;
}

.work-info__details li {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 12px;
}

.work-info__details span {
  color: #888;
}
</style>
