<template>
  <nav
    v-if="crumbs.length"
    class="app-breadcrumbs"
    aria-label="Хлебные крошки"
  >
    <ol class="app-breadcrumbs__list">
      <li class="app-breadcrumbs__item">
        <RouterLink class="app-breadcrumbs__home" to="/" aria-label="Главная">
          <svg
            class="app-breadcrumbs__home-icon"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2.75 7.1 8 2.75l5.25 4.35V13.1a.65.65 0 0 1-.65.65H9.35V9.6H6.65v4.15H3.4a.65.65 0 0 1-.65-.65V7.1Z"
              stroke="currentColor"
              stroke-width="1.15"
              stroke-linejoin="round"
            />
          </svg>
        </RouterLink>
      </li>

      <li
        v-for="(crumb, index) in crumbs"
        :key="`${crumb.label}-${index}`"
        class="app-breadcrumbs__item"
      >
        <span class="app-breadcrumbs__sep" aria-hidden="true">/</span>
        <RouterLink
          v-if="crumb.to && index < crumbs.length - 1"
          class="app-breadcrumbs__link"
          :to="crumb.to"
        >
          {{ crumb.label }}
        </RouterLink>
        <span
          v-else
          class="app-breadcrumbs__current"
          aria-current="page"
        >
          {{ crumb.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getSeriesById } from '../../data/series'
import { getWorkById } from '../../data/works'

type Crumb = {
  label: string
  to?: string
}

const route = useRoute()

const crumbs = computed<Crumb[]>(() => {
  switch (route.name) {
    case 'home':
      return []
    case 'series':
      return [{ label: 'Серии' }]
    case 'series-detail': {
      const id = route.params.id
      const series = typeof id === 'string' ? getSeriesById(id) : undefined
      return [
        { label: 'Серии', to: '/series' },
        { label: series?.titleRu ?? 'Серия' },
      ]
    }
    case 'works':
      return [{ label: 'Работы' }]
    case 'work-detail': {
      const id = route.params.id
      const work = typeof id === 'string' ? getWorkById(id) : undefined
      return [
        { label: 'Работы', to: '/works' },
        { label: workLabel(work) },
      ]
    }
    case 'about':
      return [{ label: 'О художнице' }]
    case 'contacts':
      return [{ label: 'Контакты' }]
    case 'privacy':
      return [{ label: 'Политика конфиденциальности' }]
    default:
      return []
  }
})

function workLabel(work: ReturnType<typeof getWorkById>): string {
  if (!work) return 'Работа'

  if (work.seriesId) {
    const seriesWork = getSeriesById(work.seriesId)?.works.find(
      (item) => item.id === work.id,
    )
    if (seriesWork?.titleRu) return seriesWork.titleRu
  }

  return work.title
}
</script>

<style scoped>
.app-breadcrumbs {
  padding: 12px 40px 14px;
  border-top: 1px solid #d8d8d8;
  background: #f3f3f3;
  color: #151515;
  font-family: "Inter", sans-serif;
}

.app-breadcrumbs__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
  list-style: none;
  line-height: 1;
}

.app-breadcrumbs__item {
  display: inline-flex;
  align-items: center;
  min-width: 0;
  line-height: 1;
}

.app-breadcrumbs__sep {
  margin: 0 10px;
  color: #b0b0b0;
  font-size: 11px;
  line-height: 1;
}

.app-breadcrumbs__home {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 11px;
  color: #151515;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.app-breadcrumbs__home:hover {
  opacity: 0.55;
}

.app-breadcrumbs__home-icon {
  display: block;
  width: 13px;
  height: 13px;
  /* Uppercase text sits optically lower than the SVG’s geometric center */
  transform: translateY(1px);
}

.app-breadcrumbs__link,
.app-breadcrumbs__current {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.1em;
  line-height: 1;
  text-transform: uppercase;
}

.app-breadcrumbs__link {
  color: #151515;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.app-breadcrumbs__link:hover {
  opacity: 0.55;
}

.app-breadcrumbs__current {
  color: #151515;
}

@media (max-width: 900px) {
  .app-breadcrumbs {
    padding: 10px 20px 12px;
  }

  .app-breadcrumbs__sep {
    margin: 0 8px;
  }
}
</style>
