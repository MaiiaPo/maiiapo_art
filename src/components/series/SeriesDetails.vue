<template>
  <section
    v-if="visibleImages.length"
    class="series-details"
    aria-labelledby="series-details-title"
  >
    <div class="series-details__inner">
      <h2 id="series-details-title" class="series-details__title">
        Детали серии
      </h2>

      <ul class="series-details__grid">
        <li v-for="(image, index) in visibleImages" :key="`${image}-${index}`">
          <img
            class="series-details__img"
            :src="image"
            :alt="`Деталь ${String(index + 1).padStart(2, '0')}`"
          />
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  images: string[]
}>()

const visibleImages = computed(() => props.images.filter(Boolean))
</script>

<style scoped>
.series-details {
  padding: 56px 40px;
  background: #f2f2f2;
}

.series-details__inner {
  max-width: 1180px;
  margin-inline: auto;
}

.series-details__title {
  margin: 0 0 28px;
  font-family: "Oswald", sans-serif;
  font-size: clamp(28px, 3vw, 40px);
  font-weight: 600;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.series-details__grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.series-details__img {
  display: block;
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  background: #e8e8e8;
}

@media (max-width: 900px) {
  .series-details {
    padding: 40px 20px;
  }

  .series-details__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .series-details__grid {
    grid-auto-flow: column;
    grid-auto-columns: minmax(140px, 70vw);
    grid-template-columns: none;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding-bottom: 8px;
  }

  .series-details__grid li {
    scroll-snap-align: start;
  }
}
</style>
