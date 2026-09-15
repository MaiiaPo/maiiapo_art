<template>
  <section v-if="work" class="work-detail">
    <div class="work-detail__inner">
      <div class="work-detail__main">
        <WorkGallery :images="gallery" :alt="work.title" />

        <div class="work-detail__side">
          <WorkInfo :work="work" />
        </div>
      </div>

      <WorkSeriesOthers
        v-if="series"
        :series-id="series.id"
        :current-work-id="work.id"
        :series-to="seriesPath(series.id)"
      />
    </div>
  </section>

  <section v-else class="work-detail work-detail--empty">
    <h1>{{ t('works.notFound') }}</h1>
    <RouterLink to="/works">{{ t('works.allWorks') }}</RouterLink>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import WorkGallery from '../components/works/WorkGallery.vue'
import WorkInfo from '../components/works/WorkInfo.vue'
import WorkSeriesOthers from '../components/works/WorkSeriesOthers.vue'
import { getSeriesById, seriesPath } from '../data/series'
import { getWorkById, getWorkGallery } from '../data/works'
import { useI18n } from '../i18n'

const { t } = useI18n()
const route = useRoute()

const work = computed(() => {
  const id = route.params.id
  return typeof id === 'string' ? getWorkById(id) : undefined
})

const series = computed(() => {
  const seriesId = work.value?.seriesId
  return seriesId ? getSeriesById(seriesId) : undefined
})

const gallery = computed(() => (work.value ? getWorkGallery(work.value) : []))
</script>

<style scoped>
.work-detail {
  padding: 28px 40px 80px;
  background: #f7f7f7;
  color: #151515;
}

.work-detail__inner {
  max-width: 1180px;
  margin-inline: auto;
}

.work-detail__main {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.85fr);
  gap: 40px 56px;
  align-items: start;
  margin-bottom: 48px;
}

.work-detail__side {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-width: 0;
}

.work-detail--empty {
  display: grid;
  gap: 16px;
}

.work-detail--empty a {
  color: inherit;
  text-decoration: none;
}

@media (max-width: 900px) {
  .work-detail {
    padding: 20px 20px 56px;
  }

  .work-detail__main {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}
</style>
