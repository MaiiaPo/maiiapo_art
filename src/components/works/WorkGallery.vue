<template>
  <div class="work-gallery">
    <div class="work-gallery__stage">
      <button
        v-if="current"
        class="work-gallery__main"
        type="button"
        aria-label="Увеличить изображение"
        @click="lightboxOpen = true"
      >
        <img :src="current" :alt="alt" />
      </button>
      <div v-else class="work-gallery__main work-gallery__main--empty" aria-hidden="true">
        <div class="work-gallery__placeholder" />
      </div>

      <button
        v-if="current"
        class="work-gallery__zoom"
        type="button"
        @click="lightboxOpen = true"
      >
        <svg
          class="work-gallery__zoom-icon"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" stroke-width="1.6" />
          <path d="M15.5 15.5 21 21" stroke="currentColor" stroke-width="1.6" />
        </svg>
        Увеличить
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
          <img :src="image" alt="" />
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
        <img class="work-lightbox__img" :src="current" :alt="alt" />
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'

const props = defineProps<{
  images: string[]
  alt: string
}>()

const activeIndex = ref(0)
const lightboxOpen = ref(false)

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
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 16px;
  align-items: start;
}

.work-gallery__stage {
  display: grid;
  gap: 12px;
  justify-items: center;
}

.work-gallery__main {
  display: block;
  width: 100%;
  max-width: 420px;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: zoom-in;
}

.work-gallery__main--empty {
  cursor: default;
}

.work-gallery__main img,
.work-gallery__placeholder {
  display: block;
  width: 100%;
  max-height: min(72vh, 640px);
  height: auto;
  object-fit: contain;
  background: #ececec;
}

.work-gallery__placeholder {
  aspect-ratio: 1 / 2;
  background: linear-gradient(160deg, #dcdcdc 0%, #c4c4c4 55%, #b0b0b0 100%);
}

.work-gallery__zoom {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #555;
  font: inherit;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
}

.work-gallery__zoom:hover {
  color: #111;
}

.work-gallery__zoom-icon {
  display: block;
  flex-shrink: 0;
}

.work-gallery__thumbs {
  display: grid;
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
  border: 2px solid transparent;
  background: #e8e8e8;
  cursor: pointer;
}

.work-gallery__thumb img {
  display: block;
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
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
  display: block;
  max-width: min(96vw, 1400px);
  max-height: 92vh;
  width: auto;
  height: auto;
  object-fit: contain;
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
  .work-gallery {
    grid-template-columns: 1fr;
  }

  .work-gallery__thumbs {
    grid-auto-flow: column;
    grid-auto-columns: 64px;
    justify-content: start;
    overflow-x: auto;
  }

  .work-gallery__main {
    max-width: none;
  }
}
</style>
