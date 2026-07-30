<template>
  <section
    v-if="visibleImages.length"
    class="series-interior"
    aria-labelledby="series-interior-title"
  >
    <div class="series-interior__inner">
      <div class="series-interior__copy">
        <h2 id="series-interior-title" class="series-interior__title">
          Как смотрится в интерьере
        </h2>
        <p class="series-interior__text">
          Работы серии хорошо смотрятся в современном пространстве — как
          акцент на стене, который задает тон комнате.
        </p>
        <a class="series-interior__cta" href="#series-works">
          Выбрать работу
          <span aria-hidden="true">→</span>
        </a>
      </div>

      <div class="series-interior__stage">
        <div class="series-interior__frame">
          <img
            class="series-interior__img"
            :src="current"
            :alt="`Интерьер, кадр ${paddedIndex}`"
          />
        </div>

        <div v-if="visibleImages.length > 1" class="series-interior__nav">
          <button
            class="series-interior__arrow"
            type="button"
            aria-label="Предыдущее изображение"
            @click="prev"
          >
            ←
          </button>
          <p class="series-interior__counter">
            {{ paddedIndex }} — {{ paddedTotal }}
          </p>
          <button
            class="series-interior__arrow"
            type="button"
            aria-label="Следующее изображение"
            @click="next"
          >
            →
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  images: string[]
}>()

const visibleImages = computed(() => props.images.filter(Boolean))

const activeIndex = ref(0)

watch(
  () => props.images,
  () => {
    activeIndex.value = 0
  },
)

const current = computed(() => visibleImages.value[activeIndex.value])
const paddedIndex = computed(() =>
  String(activeIndex.value + 1).padStart(2, '0'),
)
const paddedTotal = computed(() =>
  String(visibleImages.value.length).padStart(2, '0'),
)

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
  padding: 48px 40px 56px;
  background: #f2f2f2;
}

.series-interior__inner {
  display: grid;
  grid-template-columns: minmax(240px, 0.85fr) minmax(320px, 1.25fr);
  gap: 40px 56px;
  align-items: center;
  max-width: 1180px;
  margin-inline: auto;
}

.series-interior__title {
  margin: 0 0 18px;
  font-family: "Oswald", sans-serif;
  font-size: clamp(28px, 3vw, 40px);
  font-weight: 600;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.series-interior__text {
  margin: 0 0 28px;
  max-width: 34ch;
  font-size: 15px;
  line-height: 1.5;
  color: #444;
}

.series-interior__cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 22px;
  background: #151515;
  color: #fff;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
}

.series-interior__cta:hover {
  opacity: 0.85;
}

.series-interior__stage {
  min-width: 0;
}

.series-interior__frame {
  overflow: hidden;
  background: #e8e8e8;
}

.series-interior__img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

.series-interior__nav {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 14px;
  margin-top: 14px;
}

.series-interior__arrow {
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

.series-interior__counter {
  margin: 0;
  min-width: 72px;
  font-size: 13px;
  letter-spacing: 0.06em;
  text-align: center;
  color: #555;
}

@media (max-width: 900px) {
  .series-interior {
    padding: 32px 20px 40px;
  }

  .series-interior__inner {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .series-interior__text {
    max-width: none;
  }

  .series-interior__nav {
    justify-content: flex-start;
  }
}
</style>
