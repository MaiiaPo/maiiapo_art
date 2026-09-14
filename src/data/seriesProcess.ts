import postponedDraftCover from '../assets/pages/series/savedForLater/draft/01.png'

export type SeriesProcessVariant = 'gallery' | 'teaser'

export type SeriesProcess = {
  label: string
  title: string
  text: string
  images: string[]
  variant?: SeriesProcessVariant
  /** Фон правой части для teaser */
  coverImage?: string
}

/** Все кадры из папки draft серии, по имени файла */
const errorSeriesDraftImages = Object.entries(
  import.meta.glob(
    '../assets/pages/series/theErrorOfTheBeautiful/draft/*.{jpg,JPG,jpeg,JPEG,png,PNG}',
    { eager: true, import: 'default' },
  ) as Record<string, string>,
)
  .sort(([a], [b]) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }),
  )
  .map(([, url]) => url)

const developerStateDraftImages = Object.entries(
  import.meta.glob(
    '../assets/pages/series/developerState/draft/*.{jpg,JPG,jpeg,JPEG,png,PNG}',
    { eager: true, import: 'default' },
  ) as Record<string, string>,
)
  .sort(([a], [b]) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }),
  )
  .map(([, url]) => url)

export const seriesProcessById: Record<string, SeriesProcess> = {
  'the-error-of-being-beautiful': {
    label: 'Процесс',
    title: 'Как собиралась серия',
    text: 'От первого наброска до момента, когда больше уже нечего исправлять',
    images: errorSeriesDraftImages,
    variant: 'gallery',
  },
  'developer-state': {
    label: 'Процесс',
    title: 'Как собиралась серия',
    text: 'От первого наброска до момента, когда больше уже нечего исправлять',
    images: developerStateDraftImages,
    variant: 'gallery',
  },
  'postponed-for-later': {
    label: 'Процесс',
    title: 'Скоро появится',
    text: 'Новые кадры из мастерской, этапы и детали создания серии.',
    images: [],
    variant: 'teaser',
    coverImage: postponedDraftCover,
  },
}
