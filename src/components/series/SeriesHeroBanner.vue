<template>
  <section class="series-hero" aria-label="Баннер серии">
    <div class="series-hero__inner">
      <div class="series-hero__copy">
        <p class="series-hero__label">
          [ {{ series.label || 'серия' }} ]
        </p>
        <h1 class="series-hero__title">
          <template v-if="titleLines">
            <span class="series-hero__title-line">{{ titleLines[0] }}</span>
            <span class="series-hero__title-line">{{ titleLines[1] }}</span>
          </template>
          <template v-else>
            {{ series.titleRu }}
          </template>
        </h1>
        <p class="series-hero__title-en">{{ series.title }}</p>
        <p v-if="worksMeta" class="series-hero__meta">{{ worksMeta }}</p>
      </div>

      <div
        v-if="isFeaturedLayout"
        class="series-hero__gallery series-hero__gallery--featured"
      >
        <article
          v-if="featuredWork"
          class="series-hero__work series-hero__work--featured"
        >
          <RouterLink
            class="series-hero__work-link"
            :to="workPath(featuredWork.id)"
          >
            <div class="series-hero__work-media">
              <img
                v-if="featuredWork.image"
                class="series-hero__work-img"
                :src="featuredWork.image"
                :alt="featuredWork.titleRu ?? featuredWork.title"
              />
              <div
                v-else
                class="series-hero__work-placeholder"
                aria-hidden="true"
              />
            </div>

            <h2 class="series-hero__work-title">
              <span class="series-hero__work-title-ru">
                {{ featuredWork.titleRu ?? featuredWork.title }}
              </span>
              <span class="series-hero__work-title-en">
                {{ featuredWork.title }}
              </span>
            </h2>

            <span class="series-hero__work-cta">Смотреть →</span>
          </RouterLink>
        </article>

        <div class="series-hero__side">
          <ul class="series-hero__grid-row">
            <li
              v-for="work in gridWorksTop"
              :key="work.id"
              class="series-hero__work"
            >
              <RouterLink class="series-hero__work-link" :to="workPath(work.id)">
                <div class="series-hero__work-media">
                  <img
                    v-if="work.image"
                    class="series-hero__work-img"
                    :src="work.image"
                    :alt="work.titleRu ?? work.title"
                  />
                  <div
                    v-else
                    class="series-hero__work-placeholder"
                    aria-hidden="true"
                  />
                </div>

                <h2 class="series-hero__work-title">
                  <span class="series-hero__work-title-ru">
                    {{ work.titleRu ?? work.title }}
                  </span>
                  <span class="series-hero__work-title-en">{{ work.title }}</span>
                </h2>

                <span class="series-hero__work-cta">Смотреть →</span>
              </RouterLink>
            </li>
          </ul>

          <ul class="series-hero__grid-row">
            <li
              v-for="work in gridWorksBottom"
              :key="work.id"
              class="series-hero__work"
            >
              <RouterLink class="series-hero__work-link" :to="workPath(work.id)">
                <div class="series-hero__work-media">
                  <img
                    v-if="work.image"
                    class="series-hero__work-img"
                    :src="work.image"
                    :alt="work.titleRu ?? work.title"
                  />
                  <div
                    v-else
                    class="series-hero__work-placeholder"
                    aria-hidden="true"
                  />
                </div>

                <h2 class="series-hero__work-title">
                  <span class="series-hero__work-title-ru">
                    {{ work.titleRu ?? work.title }}
                  </span>
                  <span class="series-hero__work-title-en">{{ work.title }}</span>
                </h2>

                <span class="series-hero__work-cta">Смотреть →</span>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <ul v-else class="series-hero__works">
        <li
          v-for="work in series.works"
          :key="work.id"
          class="series-hero__work"
        >
          <RouterLink class="series-hero__work-link" :to="workPath(work.id)">
            <div class="series-hero__work-media">
              <img
                v-if="work.image"
                class="series-hero__work-img"
                :src="work.image"
                :alt="work.titleRu ?? work.title"
              />
              <div
                v-else
                class="series-hero__work-placeholder"
                aria-hidden="true"
              />
            </div>

            <h2 class="series-hero__work-title">
              <span class="series-hero__work-title-ru">
                {{ work.titleRu ?? work.title }}
              </span>
              <span class="series-hero__work-title-en">{{ work.title }}</span>
            </h2>

            <span class="series-hero__work-cta">Смотреть →</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { Series } from '../../data/series'
import { formatSeriesYears } from '../../data/series'
import { formatWorksCount, workPath } from '../../data/works'

const props = defineProps<{
  series: Series
}>()

const titleLines = computed(() => props.series.titleRuLines)

const isFeaturedLayout = computed(
  () => props.series.id === 'postponed-for-later' && props.series.works.length > 3,
)

const featuredWork = computed(() => props.series.works[0])
const gridWorksTop = computed(() => props.series.works.slice(1, 3))
const gridWorksBottom = computed(() => props.series.works.slice(3, 5))

const worksMeta = computed(() => {
  const count = props.series.works.length
  if (!count) return ''

  const years = formatSeriesYears(props.series)
  return years === '—'
    ? formatWorksCount(count)
    : `${formatWorksCount(count)}  /  ${years}`
})
</script>

<style scoped>
.series-hero {
  padding: 48px 40px 64px;
  background: #f3f3f3;
}

.series-hero__inner {
  display: grid;
  grid-template-columns: minmax(180px, 0.55fr) minmax(0, 1.45fr);
  gap: 32px 40px;
  align-items: start;
  max-width: 1200px;
  margin-inline: auto;
}

.series-hero__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 280px;
  padding-top: 8px;
}

.series-hero__label {
  margin: 0 0 18px;
  font-family: "Inter", sans-serif;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #888;
}

.series-hero__title {
  display: flex;
  flex-direction: column;
  margin: 0 0 12px;
  font-family: "Oswald", sans-serif;
  font-size: clamp(28px, 3.2vw, 44px);
  font-weight: 600;
  line-height: 0.98;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.series-hero__title-line {
  display: block;
}

.series-hero__title-en {
  margin: 0;
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #555;
}

.series-hero__title-en::after {
  content: "";
  display: block;
  width: 48px;
  height: 3px;
  margin-top: 14px;
  background: #d51d78;
}

.series-hero__meta {
  margin: 16px 0 0;
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #555;
}

.series-hero__works {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px 18px;
  margin: 0;
  padding: 0;
  list-style: none;
  min-width: 0;
  align-items: start;
}

.series-hero__works .series-hero__work-link {
  height: 100%;
}

.series-hero__works .series-hero__work-media {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 3 / 4;
  overflow: hidden;
}

.series-hero__works .series-hero__work-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.series-hero__works .series-hero__work-placeholder {
  aspect-ratio: auto;
  height: 100%;
}

.series-hero__gallery--featured {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: 18px 16px;
  align-items: stretch;
  min-width: 0;
}

.series-hero__side {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 28px;
  min-width: 0;
  height: 100%;
}

.series-hero__grid-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
  min-width: 0;
}

.series-hero__work {
  min-width: 0;
}

.series-hero__work--featured {
  height: 100%;
  min-height: 0;
}

.series-hero__work-link {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: inherit;
  text-decoration: none;
}

.series-hero__work--featured .series-hero__work-link {
  height: 100%;
  min-height: 0;
}

.series-hero__work-link:hover .series-hero__work-cta {
  opacity: 0.7;
}

.series-hero__work-media {
  display: block;
  width: 100%;
  margin-bottom: 12px;
  background: #e8e8e8;
}

.series-hero__work--featured .series-hero__work-media {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.series-hero__work-img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
}

.series-hero__work--featured .series-hero__work-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.series-hero__side .series-hero__work-img {
  aspect-ratio: 1 / 1;
  background: #e8e8e8;
}

.series-hero__work-placeholder {
  width: 100%;
  aspect-ratio: 1 / 1;
  background: linear-gradient(160deg, #dcdcdc 0%, #c4c4c4 55%, #b0b0b0 100%);
}

.series-hero__work-title {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex-shrink: 0;
  margin: 0 0 8px;
}

.series-hero__work-title-ru {
  font-family: "Oswald", sans-serif;
  font-size: clamp(14px, 1.3vw, 18px);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.series-hero__work-title-en {
  font-family: "Inter", sans-serif;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #777;
}

.series-hero__work-cta {
  flex-shrink: 0;
  margin-top: 0;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #151515;
  transition: opacity 0.2s ease;
}

.series-hero__work--featured .series-hero__work-cta {
  margin-top: auto;
}

@media (max-width: 900px) {
  .series-hero {
    padding: 36px 20px 48px;
  }

  .series-hero__inner {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .series-hero__copy {
    max-width: none;
  }

  .series-hero__works {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .series-hero__gallery--featured {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .series-hero__work--featured {
    height: auto;
  }

  .series-hero__work--featured .series-hero__work-media {
    flex: 0 0 auto;
  }

  .series-hero__work--featured .series-hero__work-img {
    height: auto;
    aspect-ratio: 1 / 1;
  }

  .series-hero__side {
    height: auto;
    gap: 32px;
  }

  .series-hero__grid-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
