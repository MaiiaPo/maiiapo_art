<template>
  <section class="spotlight" aria-label="Отдельные картины">
    <div class="spotlight__copy">
      <p class="spotlight__label">[ {{ current.label }} ]</p>
      <p class="spotlight__text">{{ current.text }}</p>
      <RouterLink class="spotlight__cta" :to="current.ctaTo">
        {{ current.ctaLabel }}
        <span class="spotlight__arrow" aria-hidden="true">→</span>
      </RouterLink>
    </div>

    <div class="spotlight__visual">
      <div class="spotlight__image">
        <img
          v-if="current.image"
          class="spotlight__img"
          :src="current.image"
          :alt="current.title"
        />
        <div v-else class="spotlight__placeholder" aria-hidden="true" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import type { SpotlightPainting } from '../../data/spotlightPaintings'

const props = defineProps<{
  paintings: SpotlightPainting[]
  intervalMs?: number
}>()

const activeIndex = ref(0)
const intervalMs = computed(() => props.intervalMs ?? 30_000)

const current = computed(
  () => props.paintings[activeIndex.value] ?? props.paintings[0],
)

let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  if (props.paintings.length < 2) return

  timer = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % props.paintings.length
  }, intervalMs.value)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.spotlight {
  display: grid;
  grid-template-columns: minmax(240px, 0.9fr) minmax(280px, 1.1fr);
  gap: 48px 64px;
  align-items: center;
  padding: 72px 40px;
  background: #111;
  color: #f3f3f3;
}

.spotlight__copy {
  max-width: 460px;
}

.spotlight__label {
  margin: 0 0 28px;
  font-size: 14px;
  color: #d51d78;
}

.spotlight__label::after {
  content: "";
  display: block;
  width: 48px;
  height: 3px;
  margin-top: 16px;
  background: #d51d78;
}

.spotlight__text {
  margin: 0 0 36px;
  font-family: "Oswald", sans-serif;
  font-size: clamp(28px, 3.6vw, 44px);
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.spotlight__cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #f3f3f3;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
}

.spotlight__cta:hover {
  opacity: 0.7;
}

.spotlight__arrow {
  color: #d51d78;
}

.spotlight__visual {
  min-width: 0;
}

.spotlight__image {
  width: 100%;
  max-width: 360px;
  height: clamp(420px, 58vh, 560px);
  background: #111;
}

.spotlight__img,
.spotlight__placeholder {
  display: block;
  width: 100%;
  height: 100%;
}

.spotlight__img {
  object-fit: contain;
  object-position: center;
}

.spotlight__placeholder {
  background: linear-gradient(160deg, #3a3a3a 0%, #2a2a2a 55%, #1f1f1f 100%);
}

@media (max-width: 900px) {
  .spotlight {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 48px 20px;
  }
}
</style>
