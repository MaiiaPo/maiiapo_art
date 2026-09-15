import catalogCutToFit from '../assets/pages/home/catalog_cutToFit.png'
import catalogHoldingItIn from '../assets/pages/home/catalog_holdingItIn.png'
import catalogReady from '../assets/pages/home/catalog_ready.png'
import { getSeriesById, seriesPath } from './series'
import { works, formatPrice, workPath, type Work } from './works'

export type FeaturedWork = {
  id: string
  index: string
  titleRu: string
  titleEn: string
  year: number
  size: string
  price: string
  status: Work['status']
  image?: string
  to: string
  seriesTitleRu?: string
  seriesTitleEn?: string
  seriesTo?: string
}

const catalogImages: Record<string, string> = {
  'cut-to-fit': catalogCutToFit,
  'holding-it-in': catalogHoldingItIn,
  ready: catalogReady,
}

const catalogTitlesRu: Record<string, string> = {
  'cut-to-fit': 'Подогнать по форме',
  'holding-it-in': 'Держать в себе',
  ready: 'Готова',
}

const seriesTitlesRu: Record<string, string> = {
  'the-error-of-being-beautiful': 'Ошибка быть красивой',
  'developer-state': 'Состояние: разработчик',
  'postponed-for-later': 'Отложено на потом',
}

const featuredOrder = ['cut-to-fit', 'holding-it-in', 'ready'] as const

export const featuredWorks: FeaturedWork[] = featuredOrder
  .map((id) => works.find((work) => work.id === id))
  .filter((work): work is NonNullable<typeof work> => Boolean(work))
  .map((work) => {
    const series = work.seriesId ? getSeriesById(work.seriesId) : undefined

    return {
      id: work.id,
      index: work.index,
      titleRu: catalogTitlesRu[work.id] ?? work.title,
      titleEn: work.title,
      year: work.year,
      size: work.size,
      price: formatPrice(work.price),
      status: work.status,
      image: catalogImages[work.id] ?? work.image,
      to: workPath(work.id),
      seriesTitleRu: series
        ? (seriesTitlesRu[series.id] ?? series.title)
        : undefined,
      seriesTitleEn: series?.title,
      seriesTo: series ? seriesPath(series.id) : undefined,
    }
  })
