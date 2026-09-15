<template>
  <div class="work-gallery">
    <div class="work-gallery__viewer">
      <button
        class="work-gallery__arrow"
        type="button"
        aria-label="Предыдущее изображение"
        :disabled="images.length < 2"
        @click="prev"
      >
        <svg
          class="work-gallery__arrow-icon"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M10 3.5 5.5 8 10 12.5"
            stroke="currentColor"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <button
        v-if="current"
        class="work-gallery__main"
        type="button"
        aria-label="Увеличить изображение"
        :style="stageStyle"
        @click="lightboxOpen = true"
      >
        <LazyImage
          class="work-gallery__main-img"
          fill
          eager
          :src="current"
          :alt="alt"
          object-fit="contain"
        />
      </button>
      <div
        v-else
        class="work-gallery__main work-gallery__main--empty"
        aria-hidden="true"
        :style="stageStyle"
      >
        <div class="work-gallery__placeholder" />
      </div>

      <button
        class="work-gallery__arrow"
        type="button"
        aria-label="Следующее изображение"
        :disabled="images.length < 2"
        @click="next"
      >
        <svg
          class="work-gallery__arrow-icon"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 3.5 10.5 8 6 12.5"
            stroke="currentColor"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <ul v-if="images.length > 1" class="work-gallery__thumbs">
      <li v-for="(image, index) in images" :key="`${image}-${index}`">
        <button
          class="work-gallery__thumb"
          type="button"
          :class="{ 'work-gallery__thumb--active': index === activeIndex }"
          :aria-label="`Показать кадр ${String(index + 1).padStart(2, '0')}`"
          @click="activeIndex = index"
        >
          <LazyImage
            class="work-gallery__thumb-img"
            fill
            :src="image"
            alt=""
            object-fit="cover"
          />
        </button>
      </li>
    </ul>

    <Teleport to="body">
      <div
        v-if="lightboxOpen && current"
        class="work-lightbox"
        role="dialog"
        aria-modal="true"
        aria-label="Просмотр изображения"
        @click.self="lightboxOpen = false"
      >
        <button
          class="work-lightbox__close"
          type="button"
          aria-label="Закрыть"
          @click="lightboxOpen = false"
        >
          ×
        </button>
        <LazyImage
          class="work-lightbox__img"
          eager
          :src="current"
          :alt="alt"
          object-fit="contain"
        />
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import LazyImage from '../ui/LazyImage.vue'

const props = defineProps<{
  images: string[]
  alt: string
}>()

const activeIndex = ref(0)
const lightboxOpen = ref(false)
const stageSize = ref<{ width: number; height: number } | null>(null)

const current = computed(() => props.images[activeIndex.value])

const stageStyle = computed(() => {
  if (!stageSize.value) return undefined
  return {
    width: `${stageSize.value.width}px`,
    height: `${stageSize.value.height}px`,
  }
})

function measureFirstImage(src: string) {
  const img = new Image()
  img.onload = () => {
    const maxW = Math.min(420, window.innerWidth - 140)
    const maxH = Math.min(window.innerHeight * 0.7, 620)
    const scale = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight, 1)
    stageSize.value = {
      width: Math.max(1, Math.round(img.naturalWidth * scale)),
      height: Math.max(1, Math.round(img.naturalHeight * scale)),
    }
  }
  img.src = src
}

watch(
  () => props.images,
  (images) => {
    activeIndex.value = 0
    lightboxOpen.value = false
    if (images[0]) measureFirstImage(images[0])
    else stageSize.value = null
  },
  { immediate: true },
)

watch(lightboxOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && lightboxOpen.value) {
    lightboxOpen.value = false
    return
  }
  if (event.key === 'ArrowLeft') prev()
  if (event.key === 'ArrowRight') next()
}

window.addEventListener('keydown', onKeydown)

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

function prev() {
  if (props.images.length < 2) return
  activeIndex.value =
    (activeIndex.value - 1 + props.images.length) % props.images.length
}

function next() {
  if (props.images.length < 2) return
  activeIndex.value = (activeIndex.value + 1) % props.images.length
}
</script>

<style scoped>
.work-gallery {
  display: grid;
  gap: 20px;
  justify-items: center;
  min-width: 0;
}

.work-gallery__viewer {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 16px;
  align-items: center;
  justify-items: center;
  width: 100%;
}

.work-gallery__arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin: 0;
  padding: 0;
  border: 1px solid #2a2a2a;
  border-radius: 50%;
  background: transparent;
  color: #151515;
  line-height: 0;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.work-gallery__arrow-icon {
  display: block;
  width: 16px;
  height: 16px;
}

.work-gallery__arrow:hover:not(:disabled) {
  background: #151515;
  color: #f3f3f3;
}

.work-gallery__arrow:disabled {
  opacity: 0.35;
  cursor: default;
}

.work-gallery__main {
  display: grid;
  place-items: center;
  width: 100%;
  max-width: 420px;
  min-height: 280px;
  margin: 0 auto;
  padding: 0;
  border: 0;
  overflow: hidden;
  background: #ececec;
  cursor: zoom-in;
}

.work-gallery__main--empty {
  cursor: default;
}

.work-gallery__main-img {
  width: 100%;
  height: 100%;
  min-height: 280px;
}

.work-gallery__placeholder {
  width: 100%;
  height: 100%;
  min-height: 280px;
  background: linear-gradient(160deg, #dcdcdc 0%, #c4c4c4 55%, #b0b0b0 100%);
}

.work-gallery__thumbs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.work-gallery__thumb {
  display: block;
  width: 72px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  border: 1px solid transparent;
  background: #e8e8e8;
  cursor: pointer;
}

.work-gallery__thumb-img {
  width: 100%;
  aspect-ratio: 1;
}

.work-gallery__thumb--active {
  border-color: #d51d78;
}

.work-lightbox {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(10, 10, 10, 0.88);
}

.work-lightbox__img {
  max-width: min(96vw, 1400px);
  max-height: 92vh;
  background: transparent;
}

.work-lightbox__img :deep(.lazy-image__media) {
  max-width: min(96vw, 1400px);
  max-height: 92vh;
  width: auto;
  height: auto;
}

.work-lightbox__close {
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

@media (max-width: 900px) {
  .work-gallery__viewer {
    gap: 10px;
  }

  .work-gallery__arrow {
    width: 40px;
    height: 40px;
  }

  .work-gallery__main {
    max-width: none;
  }

  .work-gallery__thumbs {
    justify-content: flex-start;
    max-width: 100%;
    overflow-x: auto;
  }
}
</style>
