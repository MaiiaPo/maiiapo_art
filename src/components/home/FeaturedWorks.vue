<template>
  <section class="featured" aria-labelledby="featured-title">
    <div class="featured__intro">
      <p class="featured__label">[ каталог работ ]</p>
      <h2 id="featured-title" class="featured__title">Каталог работ</h2>
      <RouterLink class="featured__all" to="/works">
        Смотреть все работы
        <span class="featured__arrow" aria-hidden="true">→</span>
      </RouterLink>
    </div>

    <ul class="featured__grid">
      <li v-for="work in works" :key="work.id" class="featured__item">
        <article class="work-card">
          <RouterLink class="work-card__media" :to="work.to">
            <img
              v-if="work.image"
              class="work-card__img"
              :src="work.image"
              :alt="work.title"
            />
            <!-- TODO: изображение из src/assets/featuredWorks -->
            <div v-else class="work-card__placeholder" aria-hidden="true" />
          </RouterLink>

          <div class="work-card__body">
            <h3 class="work-card__title">[ {{ work.title }} ]</h3>
            <p class="work-card__size">{{ work.size }}</p>
            <p class="work-card__price">{{ work.price }}</p>
            <RouterLink class="work-card__more" :to="work.to">
              Подробнее
              <span class="featured__arrow" aria-hidden="true">→</span>
            </RouterLink>
          </div>
        </article>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { FeaturedWork } from '../../data/featuredWorks'

defineProps<{
  works: FeaturedWork[]
}>()
</script>

<style scoped>
.featured {
  display: grid;
  grid-template-columns: minmax(180px, 240px) minmax(0, 1fr);
  gap: 40px 48px;
  padding: 56px 40px 72px;
  background: #f7f7f7;
}

.featured__label {
  margin: 0 0 12px;
  font-size: 13px;
  color: #777;
}

.featured__title {
  margin: 0 0 28px;
  font-family: "Oswald", sans-serif;
  font-size: clamp(28px, 3.2vw, 40px);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.featured__all,
.work-card__more {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #151515;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
}

.featured__all:hover,
.work-card__more:hover {
  opacity: 0.6;
}

.featured__arrow {
  color: #d51d78;
}

.featured__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 28px 20px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.work-card__media {
  display: block;
  margin-bottom: 14px;
  color: inherit;
  text-decoration: none;
}

.work-card__img,
.work-card__placeholder {
  display: block;
  aspect-ratio: 3 / 4;
  width: 100%;
}

.work-card__img {
  object-fit: cover;
}

.work-card__placeholder {
  background: linear-gradient(160deg, #dcdcdc 0%, #c4c4c4 55%, #b0b0b0 100%);
}

.work-card__title {
  margin: 0 0 6px;
  font-size: 15px;
  font-weight: 500;
}

.work-card__size {
  margin: 0 0 8px;
  font-size: 13px;
  color: #666;
}

.work-card__price {
  margin: 0 0 14px;
  font-size: 15px;
  font-weight: 600;
}

@media (max-width: 1100px) {
  .featured__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .featured {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 40px 20px 48px;
  }
}

@media (max-width: 560px) {
  .featured__grid {
    grid-template-columns: 1fr;
  }
}
</style>
