import {
  seriesList,
  seriesPath,
  type SeriesWork,
} from './series'

export type HeroSlide = SeriesWork

export type HeroBannerData = {
  label: string
  title: string
  description: string
  ctaLabel: string
  ctaTo: string
  slides: HeroSlide[]
}

const featuredSeries = seriesList[0]

export const homeHero: HeroBannerData = {
  label: featuredSeries.label,
  title: featuredSeries.title,
  description: featuredSeries.description,
  ctaLabel: 'Смотреть серию',
  ctaTo: seriesPath(featuredSeries.id),
  slides: featuredSeries.works,
}
