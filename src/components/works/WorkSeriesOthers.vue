<template>
  <section
    v-if="others.length"
    class="work-series-others"
    aria-labelledby="work-series-others-title"
  >
    <h2 id="work-series-others-title" class="work-series-others__title">
      Другие работы серии
    </h2>

    <ul class="work-series-others__grid">
      <li v-for="item in others" :key="item.id">
        <WorkCard :work="item" />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import WorkCard from './WorkCard.vue'
import { getWorksBySeriesId } from '../../data/works'

const props = defineProps<{
  seriesId: string
  currentWorkId: string
}>()

const others = computed(() =>
  getWorksBySeriesId(props.seriesId).filter(
    (work) => work.id !== props.currentWorkId,
  ),
)
</script>

<style scoped>
.work-series-others {
  padding-top: 48px;
}

.work-series-others__title {
  margin: 0 0 28px;
  font-family: "Oswald", sans-serif;
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 600;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.work-series-others__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 28px 20px;
  margin: 0;
  padding: 0;
  list-style: none;
}

@media (max-width: 1100px) {
  .work-series-others__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .work-series-others__grid {
    grid-template-columns: 1fr;
  }
}
</style>
