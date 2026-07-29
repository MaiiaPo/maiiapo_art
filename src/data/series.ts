import stillDesired from '../assets/theErrorOfTheBeautiful/01_stillDesired.JPG'
import lovedInPieces from '../assets/theErrorOfTheBeautiful/02_LovedInPieces.JPG'

export type SeriesWork = {
  id: string
  index: string
  title: string
  year: string
  medium: string
  size: string
  image?: string
}

export type Series = {
  id: string
  title: string
  label: string
  description: string
  works: SeriesWork[]
}

export const seriesList: Series[] = [
  {
    id: 'the-error-of-being-beautiful',
    title: 'The Error of Being Beautiful',
    label: 'цифровые портреты',
    description: 'Картины о красоте, которая постепенно ломается под чужими ожиданиями',
    works: [
      {
        id: 'still-desired',
        index: '01',
        title: 'Still Desired',
        year: '2026',
        medium: 'Холст, масло',
        size: '50 × 100 см',
        image: stillDesired,
      },
      {
        id: 'loved-in-pieces',
        index: '02',
        title: 'Loved In Pieces',
        year: '2026',
        medium: 'Холст, масло',
        size: '50 × 100 см',
        image: lovedInPieces,
      },
      {
        id: 'work-03',
        index: '03',
        title: '—',
        year: '2026',
        medium: 'Холст, масло',
        size: '50 × 100 см',
      },
    ],
  },
]

export function getSeriesById(id: string): Series | undefined {
  return seriesList.find((item) => item.id === id)
}

export function seriesPath(id: string): string {
  return `/series/${id}`
}

/** 1 серия, 2 серии, 5 серий */
export function formatSeriesCount(count: number): string {
  const mod10 = count % 10
  const mod100 = count % 100

  if (mod10 === 1 && mod100 !== 11) {
    return `${count} серия`
  }

  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return `${count} серии`
  }

  return `${count} серий`
}
