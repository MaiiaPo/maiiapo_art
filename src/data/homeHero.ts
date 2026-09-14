import bannerImage from '../assets/pages/home/banner.png'
import { seriesList, seriesPath } from './series'

export type HeroBannerData = {
  label: string
  titleLines: [string, string]
  titleEn: string
  description: string
  image: string
  imageAlt: string
  ctaLabel: string
  ctaTo: string
}

const featuredSeries = seriesList[0]

export const homeHero: HeroBannerData = {
  label: 'ГЛАВНАЯ СЕРИЯ',
  titleLines: ['ОШИБКА', 'БЫТЬ КРАСИВОЙ'],
  titleEn: 'The Error of Being Beautiful',
  description:
    'Серия о красоте, которая продолжает быть желанной, даже когда начинает ломаться.',
  image: bannerImage,
  imageAlt: 'Ошибка быть красивой / The Error of Being Beautiful',
  ctaLabel: 'Смотреть серию',
  ctaTo: seriesPath(featuredSeries.id),
}
