import { works, workPath, type Work } from './works'

const EXCLUDED_SERIES_ID = 'the-error-of-being-beautiful'

export type SpotlightPainting = {
  id: string
  label: string
  text: string
  title: string
  ctaLabel: string
  ctaTo: string
  image?: string
}

function toSpotlight(work: Work): SpotlightPainting {
  return {
    id: work.id,
    label: 'о картине',
    text: work.description ?? work.title,
    title: work.title,
    ctaLabel: 'Подробнее о картине',
    ctaTo: workPath(work.id),
    image: work.image,
  }
}

/** Все картины, кроме серии The Error of Being Beautiful — ротация на главной */
export const spotlightPaintings: SpotlightPainting[] = works
  .filter((work) => work.seriesId !== EXCLUDED_SERIES_ID)
  .map(toSpotlight)
