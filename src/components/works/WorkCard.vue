<template>
  <article class="work-card">
    <div class="work-card__inner">
      <RouterLink class="work-card__media" :to="workPath(work.id)">
        <img
          v-if="work.image"
          class="work-card__img"
          :src="work.image"
          :alt="work.title"
        />
        <div v-else class="work-card__placeholder" aria-hidden="true" />
      </RouterLink>

      <div class="work-card__body">
        <h3 class="work-card__title">
          <RouterLink :to="workPath(work.id)">[ {{ work.title }} ]</RouterLink>
        </h3>
        <p class="work-card__meta">{{ work.year }}</p>
        <p class="work-card__meta">{{ work.size }}</p>
        <p
          class="work-card__status"
          :class="`work-card__status--${work.status}`"
        >
          {{ workStatusLabel[work.status] }}
        </p>
        <p v-if="work.status !== 'sold' && work.price > 0" class="work-card__price">
          {{ formatPrice(work.price) }}
        </p>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  formatPrice,
  workPath,
  workStatusLabel,
  type Work,
} from '../../data/works'

defineProps<{
  work: Work
}>()
</script>

<style scoped>
.work-card {
  display: flex;
  justify-content: center;
}

.work-card__inner {
  display: flex;
  flex-direction: column;
  width: fit-content;
  max-width: 100%;
  text-align: left;
}

.work-card__media {
  display: block;
  margin-bottom: 14px;
  text-decoration: none;
}

.work-card__img {
  display: block;
  height: 320px;
  width: auto;
  max-width: 100%;
  object-fit: contain;
}

.work-card__placeholder {
  display: block;
  height: 320px;
  width: 160px;
  max-width: 100%;
  background: linear-gradient(160deg, #dcdcdc 0%, #c4c4c4 55%, #b0b0b0 100%);
}

.work-card__title {
  margin: 0 0 6px;
  font-size: 15px;
  font-weight: 500;
}

.work-card__title a {
  color: inherit;
  text-decoration: none;
}

.work-card__title a:hover {
  opacity: 0.6;
}

.work-card__meta {
  margin: 0;
  font-size: 13px;
  color: #666;
}

.work-card__status {
  margin: 8px 0 0;
  font-size: 13px;
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

.work-card__price {
  margin: 6px 0 0;
  font-size: 15px;
  font-weight: 600;
}
</style>
