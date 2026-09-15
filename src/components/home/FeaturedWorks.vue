<template>
  <section class="featured" aria-labelledby="featured-title">
    <div class="featured__inner">
      <div class="featured__intro">
        <p class="featured__label">[ {{ t('home.featuredLabel') }} ]</p>
        <h2 id="featured-title" class="featured__title">{{ t('home.featuredTitle') }}</h2>
        <RouterLink class="featured__all" to="/works">
          {{ t('home.featuredAll') }}
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
                :alt="isEn ? work.titleEn : `${work.titleRu} / ${work.titleEn}`"
              />
              <div v-else class="work-card__placeholder" aria-hidden="true" />
            </RouterLink>

            <div class="work-card__body">
              <h3 class="work-card__title">
                <span class="work-card__title-ru">
                  {{ isEn ? work.titleEn : work.titleRu }}
                </span>
                <span v-if="!isEn" class="work-card__title-en">{{ work.titleEn }}</span>
              </h3>

              <div class="work-card__series-slot">
                <p
                  v-if="work.seriesTo && (work.seriesTitleRu || work.seriesTitleEn)"
                  class="work-card__series"
                >
                  <span class="work-card__series-label">{{ t('home.seriesLabel') }}</span>
                  <RouterLink class="work-card__series-link" :to="work.seriesTo">
                    {{ isEn ? work.seriesTitleEn : work.seriesTitleRu }}
                  </RouterLink>
                </p>
              </div>

              <div class="work-card__specs">
                <div class="work-card__specs-left">
                  <span class="work-card__year">{{ work.year }}</span>
                  <span class="work-card__size">{{ localizeSize(work.size, locale) }}</span>
                </div>
                <div class="work-card__specs-right">
                  <span
                    class="work-card__status"
                    :class="`work-card__status--${work.status}`"
                  >
                    {{ t(`status.${work.status}`) }}
                  </span>
                  <span class="work-card__price">{{ work.price }}</span>
                </div>
              </div>

              <RouterLink class="work-card__more" :to="work.to">
                {{ t('home.featuredMore') }}
                <span class="featured__arrow" aria-hidden="true">→</span>
              </RouterLink>
            </div>
          </article>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { FeaturedWork } from '../../data/featuredWorks'
import { localizeSize, useI18n } from '../../i18n'

defineProps<{
  works: FeaturedWork[]
}>()

const { t, isEn, locale } = useI18n()
</script>

<style scoped>
.featured {
  padding: 56px 40px 72px;
  background: #f7f7f7;
}

.featured__inner {
  display: grid;
  grid-template-columns: minmax(180px, 240px) minmax(0, 1fr);
  gap: 40px 48px;
  max-width: 1200px;
  margin-inline: auto;
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
  opacity: 0.7;
}

.featured__arrow {
  color: #d51d78;
}

.featured__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 36px 32px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.featured__item {
  min-width: 0;
}

.work-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 0;
}

.work-card__media {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: clamp(240px, 26vw, 300px);
  margin-bottom: 22px;
  color: inherit;
  text-decoration: none;
}

.work-card__img,
.work-card__placeholder {
  display: block;
  height: 100%;
  width: auto;
  max-width: 100%;
}

.work-card__img {
  object-fit: contain;
  object-position: bottom center;
}

.work-card__placeholder {
  width: 100%;
  background: linear-gradient(160deg, #dcdcdc 0%, #c4c4c4 55%, #b0b0b0 100%);
}

.work-card__body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
}

.work-card__title {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 0 0 14px;
}

.work-card__title-ru {
  font-family: "Oswald", sans-serif;
  font-size: clamp(18px, 1.8vw, 22px);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.work-card__title-en {
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
  font-size: 15px;
  font-weight: 600;
  color: #151515;
}

.work-card__more {
  margin-top: auto;
}

@media (max-width: 1100px) {
  .featured__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .featured {
    padding: 40px 20px 48px;
  }

  .featured__inner {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

@media (max-width: 560px) {
  .featured__grid {
    grid-template-columns: 1fr;
  }
}
</style>
