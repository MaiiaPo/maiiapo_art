<template>
  <section class="series-about">
    <div class="series-about__inner">
      <div class="series-about__concept">
        <p class="series-about__eyebrow">[ концепция серии ]</p>
        <h2 class="series-about__title">Концепция</h2>

        <div class="series-about__body">
          <p
            v-for="(paragraph, index) in paragraphs"
            :key="index"
            :class="{ 'series-about__accent': index === paragraphs.length - 1 }"
          >
            {{ paragraph }}
          </p>
        </div>
      </div>

      <div class="series-about__process">
        <p class="series-about__eyebrow">[ процесс создания ]</p>

        <button
          v-if="current"
          class="series-about__stage"
          type="button"
          aria-label="Открыть фото на весь экран"
          @click="lightboxOpen = true"
        >
          <img
            class="series-about__main"
            :src="current"
            :alt="`Процесс создания, кадр ${paddedIndex}`"
          />
        </button>
        <div v-else class="series-about__stage series-about__stage--empty">
          <div class="series-about__placeholder" aria-hidden="true" />
        </div>

        <div class="series-about__gallery">
          <ul v-if="images.length" class="series-about__thumbs">
            <li v-for="(image, index) in visibleThumbs" :key="`${image}-${index}`">
              <button
                class="series-about__thumb"
                type="button"
                :class="{
                  'series-about__thumb--active': thumbStart + index === activeIndex,
                }"
                :aria-label="`Показать кадр ${String(thumbStart + index + 1).padStart(2, '0')}`"
                @click="activeIndex = thumbStart + index"
              >
                <img :src="image" alt="" />
              </button>
            </li>
          </ul>

          <div class="series-about__nav">
            <button
              class="series-about__arrow"
              type="button"
              aria-label="Предыдущее изображение"
              :disabled="images.length < 2"
              @click="prev"
            >
              ←
            </button>
            <button
              class="series-about__arrow"
              type="button"
              aria-label="Следующее изображение"
              :disabled="images.length < 2"
              @click="next"
            >
              →
            </button>
            <p class="series-about__counter">
              {{ paddedIndex }} / {{ paddedTotal }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="lightboxOpen && current"
        class="series-lightbox"
        role="dialog"
        aria-modal="true"
        aria-label="Просмотр фото"
        @click.self="lightboxOpen = false"
      >
        <button
          class="series-lightbox__close"
          type="button"
          aria-label="Закрыть"
          @click="lightboxOpen = false"
        >
          ×
        </button>

        <img
          class="series-lightbox__img"
          :src="current"
          :alt="`Процесс создания, кадр ${paddedIndex}`"
        />
      </div>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'

const props = defineProps<{
  paragraphs: string[]
  images: string[]
}>()

const activeIndex = ref(0)
const lightboxOpen = ref(false)
const thumbsPerPage = 6

watch(
  () => props.images,
  () => {
    activeIndex.value = 0
    lightboxOpen.value = false
  },
)

watch(lightboxOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

function onKeydown(event: KeyboardEvent) {
  if (!lightboxOpen.value) return
  if (event.key === 'Escape') lightboxOpen.value = false
  if (event.key === 'ArrowLeft') prev()
  if (event.key === 'ArrowRight') next()
}

window.addEventListener('keydown', onKeydown)

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

const current = computed(() => props.images[activeIndex.value])

const thumbStart = computed(() => {
  if (props.images.length <= thumbsPerPage) return 0
  const start = activeIndex.value - Math.floor(thumbsPerPage / 2)
  const maxStart = props.images.length - thumbsPerPage
  return Math.min(Math.max(start, 0), maxStart)
})

const visibleThumbs = computed(() =>
  props.images.slice(thumbStart.value, thumbStart.value + thumbsPerPage),
)

const paddedIndex = computed(() =>
  String(activeIndex.value + 1).padStart(2, '0'),
)
const paddedTotal = computed(() =>
  String(props.images.length).padStart(2, '0'),
)

function prev() {
  if (!props.images.length) return
  activeIndex.value =
    (activeIndex.value - 1 + props.images.length) % props.images.length
}

function next() {
  if (!props.images.length) return
  activeIndex.value = (activeIndex.value + 1) % props.images.length
}
</script>

<style scoped>
.series-about {
  background: #f3f3f3;
}

.series-about__inner {
  display: grid;
  grid-template-columns: minmax(260px, 0.9fr) minmax(320px, 1.35fr);
  gap: 48px 64px;
  align-items: start;
  max-width: 1180px;
  margin-inline: auto;
  padding: 56px 40px 72px;
}

.series-about__eyebrow {
  margin: 0 0 10px;
  font-size: 13px;
  color: #777;
}

.series-about__title {
  margin: 0 0 28px;
  font-family: "Oswald", sans-serif;
  font-size: clamp(28px, 2.8vw, 40px);
  font-weight: 600;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.series-about__body p {
  margin: 0 0 18px;
  max-width: 38ch;
  font-size: 15px;
  line-height: 1.55;
  color: #333;
}

.series-about__body p:last-child {
  margin-bottom: 0;
}

.series-about__accent {
  color: #d51d78 !important;
}

.series-about__stage {
  display: block;
  width: 100%;
  margin: 0 0 14px;
  padding: 0;
  overflow: hidden;
  border: 0;
  background: #ddd;
  cursor: zoom-in;
}

.series-about__stage--empty {
  cursor: default;
}

.series-about__main,
.series-about__placeholder {
  display: block;
  width: 100%;
  height: clamp(320px, 48vh, 480px);
  object-fit: cover;
  object-position: center;
}

.series-about__placeholder {
  background: linear-gradient(160deg, #dcdcdc 0%, #c4c4c4 55%, #b0b0b0 100%);
}

.series-about__gallery {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 16px;
  align-items: center;
}

.series-about__thumbs {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.series-about__thumb {
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
  border: 2px solid transparent;
  background: #e8e8e8;
  cursor: pointer;
}

.series-about__thumb img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  max-height: 72px;
  object-fit: cover;
  object-position: center;
}

.series-about__thumb--active {
  border-color: #d51d78;
}

.series-about__nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.series-about__arrow {
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #d51d78;
  font: inherit;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
}

.series-about__arrow:disabled {
  opacity: 0.35;
  cursor: default;
}

.series-about__counter {
  margin: 4px 0 0;
  font-size: 12px;
  letter-spacing: 0.06em;
  color: #555;
  white-space: nowrap;
}

.series-lightbox {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(10, 10, 10, 0.88);
}

.series-lightbox__img {
  display: block;
  max-width: min(96vw, 1400px);
  max-height: 92vh;
  width: auto;
  height: auto;
  object-fit: contain;
}

.series-lightbox__close {
  position: absolute;
  top: 16px;
  right: 20px;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #fff;
  font: inherit;
  font-size: 36px;
  line-height: 1;
  cursor: pointer;
}

@media (max-width: 1000px) {
  .series-about__inner {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 40px 20px 56px;
  }

  .series-about__body p {
    max-width: none;
  }

  .series-about__main,
  .series-about__placeholder {
    height: clamp(260px, 42vh, 360px);
  }

  .series-about__thumbs {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
