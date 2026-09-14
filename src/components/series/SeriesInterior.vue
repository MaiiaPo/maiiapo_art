<template>
  <section
    v-if="hasContent"
    class="series-interior"
    aria-labelledby="series-interior-title"
  >
    <div class="series-interior__inner">
      <div class="series-interior__main">
        <div class="series-interior__copy">
          <div class="series-interior__copy-top">
            <p class="series-interior__label">[ Интерьер ]</p>
            <h2 id="series-interior-title" class="series-interior__title">
              Картины в интерьере
            </h2>
            <p class="series-interior__text">
              Картина меняет комнату. Комната меняет картину.
            </p>

            <div v-if="visibleImages.length" class="series-interior__controls">
              <button
                class="series-interior__arrow"
                type="button"
                aria-label="Предыдущее изображение"
                :disabled="visibleImages.length < 2"
                @click="prev"
              >
                ←
              </button>
              <button
                class="series-interior__arrow"
                type="button"
                aria-label="Следующее изображение"
                :disabled="visibleImages.length < 2"
                @click="next"
              >
                →
              </button>
            </div>
          </div>

          <div v-if="visibleImages.length" class="series-interior__progress">
            <p class="series-interior__counter">
              {{ paddedIndex }} / {{ paddedTotal }}
            </p>
            <div
              class="series-interior__bar"
              role="progressbar"
              :aria-valuenow="activeIndex + 1"
              :aria-valuemin="1"
              :aria-valuemax="visibleImages.length"
            >
              <span
                class="series-interior__bar-fill"
                :style="{ width: progressPercent }"
              />
            </div>
          </div>
        </div>

        <div class="series-interior__stage">
          <img
            v-if="current"
            class="series-interior__img"
            :src="current"
            :alt="imageAlt"
          />
        </div>
      </div>

      <div
        v-if="selectableWorks.length"
        class="series-interior__picker"
        :class="{ 'series-interior__picker--single': !showSeriesTab }"
        role="tablist"
        aria-label="Выбор работы"
      >
        <button
          v-if="showSeriesTab"
          class="series-interior__picker-label"
          type="button"
          role="tab"
          :aria-selected="selectedWorkId === null"
          :class="{ 'is-active': selectedWorkId === null }"
          @click="selectWork(null)"
        >
          Работы серии
          <span class="series-interior__picker-rule" aria-hidden="true" />
        </button>

        <button
          v-for="work in selectableWorks"
          :key="work.id"
          class="series-interior__picker-item"
          type="button"
          role="tab"
          :aria-selected="selectedWorkId === work.id"
          :class="{ 'is-active': selectedWorkId === work.id }"
          @click="selectWork(work.id)"
        >
          <span class="series-interior__picker-index">{{ work.index }}</span>
          <span class="series-interior__picker-title">
            {{ work.title }}
            <span class="series-interior__picker-arrow" aria-hidden="true">→</span>
          </span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Series } from '../../data/series'

const props = defineProps<{
  series: Series
}>()

const selectedWorkId = ref<string | null>(null)
const activeIndex = ref(0)

const selectableWorks = computed(() =>
  props.series.works.filter((work) => (work.interiorImages?.length ?? 0) > 0),
)

const showSeriesTab = computed(() =>
  props.series.interiorImages.some(Boolean),
)

const visibleImages = computed(() => {
  if (selectedWorkId.value) {
    const work = props.series.works.find((item) => item.id === selectedWorkId.value)
    return (work?.interiorImages ?? []).filter(Boolean)
  }

  return props.series.interiorImages.filter(Boolean)
})

const hasContent = computed(
  () =>
    props.series.interiorImages.some(Boolean) || selectableWorks.value.length > 0,
)

const current = computed(() => visibleImages.value[activeIndex.value])
const paddedIndex = computed(() =>
  String(activeIndex.value + 1).padStart(2, '0'),
)
const paddedTotal = computed(() =>
  String(Math.max(visibleImages.value.length, 1)).padStart(2, '0'),
)
const progressPercent = computed(() => {
  const total = visibleImages.value.length
  if (total <= 0) return '0%'
  return `${((activeIndex.value + 1) / total) * 100}%`
})

const imageAlt = computed(() => {
  if (selectedWorkId.value) {
    const work = props.series.works.find((item) => item.id === selectedWorkId.value)
    return work
      ? `${work.title} в интерьере, кадр ${paddedIndex.value}`
      : `Интерьер, кадр ${paddedIndex.value}`
  }

  return `Интерьер серии, кадр ${paddedIndex.value}`
})

function ensureSelection() {
  if (!showSeriesTab.value && selectableWorks.value.length > 0) {
    selectedWorkId.value = selectableWorks.value[0].id
    return
  }

  selectedWorkId.value = null
}

watch(visibleImages, () => {
  activeIndex.value = 0
})

watch(
  () => props.series.id,
  () => {
    activeIndex.value = 0
    ensureSelection()
  },
  { immediate: true },
)

function selectWork(id: string | null) {
  selectedWorkId.value = id
}

function prev() {
  if (visibleImages.value.length < 2) return
  activeIndex.value =
    (activeIndex.value - 1 + visibleImages.value.length) %
    visibleImages.value.length
}

function next() {
  if (visibleImages.value.length < 2) return
  activeIndex.value = (activeIndex.value + 1) % visibleImages.value.length
}
</script>

<style scoped>
.series-interior {
  padding: 56px 40px;
  background: #f4f2ef;
  color: #151515;
}

.series-interior__inner {
  display: grid;
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
}

.series-interior__main {
  display: grid;
  grid-template-columns: minmax(240px, 0.85fr) minmax(0, 1.35fr);
  gap: 40px 48px;
  height: 420px;
  align-items: stretch;
}

.series-interior__copy {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;
  padding: 8px 0 0;
  background: transparent;
}

.series-interior__label {
  margin: 0 0 22px;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #777;
}

.series-interior__title {
  margin: 0 0 14px;
  max-width: 10ch;
  font-family: "Oswald", sans-serif;
  font-size: clamp(28px, 3.2vw, 40px);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.series-interior__title::after {
  content: "";
  display: block;
  width: 48px;
  height: 3px;
  margin-top: 14px;
  background: #d51d78;
}

.series-interior__text {
  margin: 0 0 36px;
  max-width: 32ch;
  font-size: 15px;
  line-height: 1.55;
  color: #5c5a56;
}

.series-interior__controls {
  display: flex;
  gap: 12px;
}

.series-interior__arrow {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  margin: 0;
  padding: 0;
  border: 1px solid #2a2a2a;
  border-radius: 50%;
  background: transparent;
  color: #151515;
  font: inherit;
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.series-interior__arrow:hover:not(:disabled) {
  background: #151515;
  color: #f4f2ef;
}

.series-interior__arrow:disabled {
  opacity: 0.35;
  cursor: default;
}

.series-interior__progress {
  display: grid;
  gap: 10px;
}

.series-interior__counter {
  margin: 0;
  font-size: 13px;
  letter-spacing: 0.08em;
  color: #3a3a3a;
}

.series-interior__bar {
  position: relative;
  width: 100%;
  max-width: 220px;
  height: 1px;
  background: #c8c4be;
}

.series-interior__bar-fill {
  position: absolute;
  inset: 0 auto 0 0;
  height: 2px;
  margin-top: -0.5px;
  background: #151515;
  transition: width 0.25s ease;
}

.series-interior__stage {
  position: relative;
  min-width: 0;
  height: 100%;
  overflow: hidden;
  background: #f4f2ef;
}

.series-interior__img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.series-interior__picker {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid #d6d2cb;
  background: #f4f2ef;
}

.series-interior__picker--single {
  grid-template-columns: minmax(0, 1fr);
  max-width: 280px;
}

.series-interior__picker-label,
.series-interior__picker-item {
  display: grid;
  align-content: center;
  gap: 6px;
  min-height: 88px;
  margin: 0;
  padding: 22px 24px;
  border: 0;
  border-right: 1px solid #d6d2cb;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s ease;
}

.series-interior__picker-label:last-child,
.series-interior__picker-item:last-child {
  border-right: 0;
}

.series-interior__picker-label:hover,
.series-interior__picker-item:hover,
.series-interior__picker-label.is-active,
.series-interior__picker-item.is-active {
  background: #efece7;
}

.series-interior__picker-label {
  font-family: "Oswald", sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.series-interior__picker-rule {
  display: block;
  width: 36px;
  height: 1px;
  background: #9a9690;
}

.series-interior__picker-index {
  font-size: 11px;
  letter-spacing: 0.08em;
  color: #6a6762;
}

.series-interior__picker-title {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: "Oswald", sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.series-interior__picker-arrow {
  font-size: 13px;
  font-weight: 400;
}

@media (max-width: 900px) {
  .series-interior {
    padding: 40px 20px;
  }

  .series-interior__main {
    grid-template-columns: 1fr;
    height: auto;
  }

  .series-interior__copy {
    gap: 28px;
    padding: 0;
  }

  .series-interior__title {
    max-width: none;
  }

  .series-interior__text {
    max-width: none;
    margin-bottom: 28px;
  }

  .series-interior__stage {
    height: 280px;
  }

  .series-interior__picker {
    grid-template-columns: 1fr 1fr;
  }

  .series-interior__picker-label {
    grid-column: 1 / -1;
    border-right: 0;
    border-bottom: 1px solid #d6d2cb;
  }

  .series-interior__picker-item:nth-child(2n) {
    border-right: 0;
  }

  .series-interior__picker-item:nth-child(n + 3) {
    border-top: 1px solid #d6d2cb;
  }
}
</style>
