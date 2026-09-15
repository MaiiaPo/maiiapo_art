<template>
  <section
    v-if="hasContent"
    class="series-process"
    :class="{ 'series-process--teaser': isTeaser }"
    :aria-labelledby="isTeaser ? 'series-process-teaser-title' : 'series-process-title'"
  >
    <div v-if="isTeaser" class="series-process__teaser">
      <div class="series-process__teaser-inner">
        <div class="series-process__teaser-copy">
          <p class="series-process__teaser-label">[ {{ processLabel }} ]</p>
          <h2 id="series-process-teaser-title" class="series-process__teaser-title">
            {{ processTitle }}
          </h2>
          <p class="series-process__teaser-text">{{ processText }}</p>
        </div>

        <div
          class="series-process__teaser-visual"
          :style="{ backgroundImage: `url(${process.coverImage})` }"
          role="img"
          :aria-label="processTitle"
        />
      </div>
    </div>

    <div v-else class="series-process__inner">
      <div class="series-process__copy">
        <p class="series-process__label">[ {{ processLabel }} ]</p>
        <h2 id="series-process-title" class="series-process__title">
          {{ processTitle }}
        </h2>
        <p class="series-process__text">{{ processText }}</p>
      </div>

      <div class="series-process__gallery-wrap">
        <div id="series-process-gallery" class="series-process__gallery">
          <figure
            v-for="(image, index) in visibleImages"
            :key="`${pageIndex}-${index}`"
            class="series-process__frame"
          >
            <LazyImage
              class="series-process__img"
              fill
              :src="image"
              :alt="`Процесс серии, кадр ${pageIndex * pageSize + index + 1}`"
              object-fit="cover"
            />
          </figure>
        </div>

        <div v-if="pageCount > 1" class="series-process__nav">
          <p class="series-process__counter">
            {{ paddedPage }} / {{ paddedTotal }}
          </p>
          <div class="series-process__arrows">
            <button
              class="series-process__arrow"
              type="button"
              aria-label="Предыдущие кадры"
              @click="prev"
            >
              ←
            </button>
            <button
              class="series-process__arrow"
              type="button"
              aria-label="Следующие кадры"
              @click="next"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { SeriesProcess } from '../../data/seriesProcess'
import { useI18n } from '../../i18n'
import LazyImage from '../ui/LazyImage.vue'

const props = defineProps<{
  process: SeriesProcess
}>()

const { t } = useI18n()

const pageSize = 4
const pageIndex = ref(0)

const isTeaser = computed(
  () => (props.process.variant ?? 'gallery') === 'teaser',
)

const processLabel = computed(() => t('series.process'))
const processTitle = computed(() =>
  isTeaser.value ? t('series.processSoonTitle') : t('series.processTitle'),
)
const processText = computed(() =>
  isTeaser.value ? t('series.processSoonText') : t('series.processText'),
)

const hasContent = computed(
  () =>
    isTeaser.value
      ? Boolean(props.process.coverImage)
      : props.process.images.length > 0,
)

const pageCount = computed(() =>
  Math.max(1, Math.ceil(props.process.images.length / pageSize)),
)

const visibleImages = computed(() => {
  const start = pageIndex.value * pageSize
  return props.process.images.slice(start, start + pageSize)
})

const paddedPage = computed(() =>
  String(pageIndex.value + 1).padStart(2, '0'),
)
const paddedTotal = computed(() =>
  String(pageCount.value).padStart(2, '0'),
)

function prev() {
  pageIndex.value =
    (pageIndex.value - 1 + pageCount.value) % pageCount.value
}

function next() {
  pageIndex.value = (pageIndex.value + 1) % pageCount.value
}
</script>

<style scoped>
.series-process {
  padding: 56px 40px;
  color: #151515;
}

.series-process--teaser {
  width: calc(100% + 40px);
  margin-inline: -20px;
  padding: 0;
  background: #fd4e85;
}

.series-process__teaser {
  width: 100%;
  overflow: hidden;
}

.series-process__teaser-inner {
  display: grid;
  grid-template-columns: minmax(260px, 0.42fr) minmax(0, 0.58fr);
  align-items: stretch;
  width: 100%;
  max-width: 1200px;
  min-height: 420px;
  margin-inline: auto;
}

.series-process__teaser-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0;
  padding: 56px 40px;
  background: #fd4e85;
  color: #fff;
}

.series-process__teaser-label {
  margin: 0 0 28px;
  font-family: "Inter", sans-serif;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.85);
}

.series-process__teaser-title {
  margin: 0;
  max-width: 12ch;
  font-family: "Oswald", sans-serif;
  font-size: clamp(28px, 3.4vw, 42px);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.series-process__teaser-title::after {
  content: "";
  display: block;
  width: 48px;
  height: 3px;
  margin-top: 14px;
  background: rgba(255, 255, 255, 0.9);
}

.series-process__teaser-text {
  margin: 18px 0 0;
  max-width: 32ch;
  font-family: "Inter", sans-serif;
  font-size: 15px;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.92);
}

.series-process__teaser-visual {
  min-height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  filter: blur(2px);
  transform: scale(1.04);
  transform-origin: center;
}

.series-process__inner {
  display: grid;
  grid-template-columns: minmax(240px, 0.85fr) minmax(0, 1.35fr);
  gap: 40px 48px;
  align-items: start;
  max-width: 1200px;
  margin-inline: auto;
}

.series-process__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 8px;
}

.series-process__label {
  margin: 0 0 22px;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #777;
}

.series-process__title {
  margin: 0 0 22px;
  max-width: 12ch;
  font-family: "Oswald", sans-serif;
  font-size: clamp(28px, 3.4vw, 42px);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.series-process__title::after {
  content: "";
  display: block;
  width: 48px;
  height: 3px;
  margin-top: 14px;
  background: #d51d78;
}

.series-process__text {
  margin: 0;
  max-width: 34ch;
  font-size: 15px;
  line-height: 1.55;
  color: #444;
}

.series-process__gallery-wrap {
  min-width: 0;
}

.series-process__gallery {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  outline: none;
}

.series-process__frame {
  margin: 0;
  min-width: 0;
  overflow: hidden;
  background: #e4e4e4;
  aspect-ratio: 3 / 4;
}

.series-process__img {
  width: 100%;
  height: 100%;
}

.series-process__nav {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 18px;
}

.series-process__counter {
  margin: 0;
  font-size: 12px;
  letter-spacing: 0.08em;
  color: #555;
}

.series-process__arrows {
  display: flex;
  gap: 10px;
}

.series-process__arrow {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  margin: 0;
  padding: 0;
  border: 1px solid #2a2a2a;
  border-radius: 50%;
  background: transparent;
  color: #151515;
  font: inherit;
  font-size: 15px;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.series-process__arrow:hover {
  background: #151515;
  color: #f3f3f3;
}

@media (max-width: 900px) {
  .series-process {
    padding: 40px 20px;
  }

  .series-process--teaser {
    width: calc(100% + 24px);
    margin-inline: -12px;
    padding: 0;
  }

  .series-process__teaser-inner {
    grid-template-columns: 1fr;
    min-height: 0;
  }

  .series-process__teaser-copy {
    padding: 40px 20px;
  }

  .series-process__teaser-title {
    max-width: none;
  }

  .series-process__teaser-text {
    max-width: none;
  }

  .series-process__teaser-visual {
    min-height: 280px;
  }

  .series-process__inner {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .series-process__title {
    max-width: none;
  }

  .series-process__text {
    max-width: none;
  }

  .series-process__gallery {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .series-process__nav {
    justify-content: flex-start;
  }
}
</style>
