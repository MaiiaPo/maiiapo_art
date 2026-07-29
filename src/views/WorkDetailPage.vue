<template>
  <section v-if="work" class="work-detail">
    <p class="work-detail__index">[ {{ work.index }} ]</p>
    <h1 class="work-detail__title">{{ work.title }}</h1>

    <div class="work-detail__layout">
      <div class="work-detail__media">
        <img
          v-if="work.image"
          class="work-detail__img"
          :src="work.image"
          :alt="work.title"
        />
        <div v-else class="work-detail__placeholder" aria-hidden="true" />
      </div>

      <div class="work-detail__info">
        <p>{{ work.year }}</p>
        <p>{{ work.medium }}</p>
        <p>{{ work.size }}</p>
        <p>{{ workStatusLabel[work.status] }}</p>
        <p v-if="work.status !== 'sold'" class="work-detail__price">
          {{ formatPrice(work.price) }}
        </p>
      </div>
    </div>

    <RouterLink class="work-detail__back" to="/works">← Все работы</RouterLink>
  </section>

  <section v-else class="work-detail">
    <h1>Работа не найдена</h1>
    <RouterLink to="/works">← Все работы</RouterLink>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import {
  formatPrice,
  getWorkById,
  workStatusLabel,
} from '../data/works'

const route = useRoute()

const work = computed(() => {
  const id = route.params.id
  return typeof id === 'string' ? getWorkById(id) : undefined
})
</script>

<style scoped>
.work-detail {
  padding: 64px 40px;
}

.work-detail__index {
  margin: 0 0 8px;
  font-size: 13px;
  color: #777;
}

.work-detail__title {
  margin: 0 0 36px;
  font-family: "Oswald", sans-serif;
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 600;
  text-transform: uppercase;
}

.work-detail__layout {
  display: grid;
  grid-template-columns: minmax(200px, 360px) minmax(0, 1fr);
  gap: 32px;
  margin-bottom: 40px;
}

.work-detail__img,
.work-detail__placeholder {
  display: block;
  aspect-ratio: 1 / 2;
  width: 100%;
}

.work-detail__img {
  object-fit: contain;
  background: #ececec;
}

.work-detail__placeholder {
  background: linear-gradient(160deg, #dcdcdc 0%, #c4c4c4 55%, #b0b0b0 100%);
}

.work-detail__info {
  font-size: 15px;
  line-height: 1.6;
}

.work-detail__info p {
  margin: 0;
}

.work-detail__price {
  margin-top: 12px !important;
  font-size: 20px;
  font-weight: 600;
}

.work-detail__back {
  color: inherit;
  text-decoration: none;
}

.work-detail__back:hover {
  opacity: 0.6;
}

@media (max-width: 900px) {
  .work-detail {
    padding: 40px 20px;
  }

  .work-detail__layout {
    grid-template-columns: 1fr;
  }
}
</style>
