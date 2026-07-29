import stillDesired from '../assets/theErrorOfTheBeautiful/01_stillDesired.JPG'
import lovedInPieces from '../assets/theErrorOfTheBeautiful/02_LovedInPieces.JPG'
import banner from '../assets/theErrorOfTheBeautiful/banner/banner.JPG'
import draft01 from '../assets/theErrorOfTheBeautiful/draft/IMG_0601.JPG'
import draft02 from '../assets/theErrorOfTheBeautiful/draft/IMG_0602.JPG'
import draft03 from '../assets/theErrorOfTheBeautiful/draft/IMG_0603.JPG'
import draft04 from '../assets/theErrorOfTheBeautiful/draft/IMG_0604.JPG'
import draft05 from '../assets/theErrorOfTheBeautiful/draft/IMG_0605.JPG'
import draft06 from '../assets/theErrorOfTheBeautiful/draft/IMG_0606.JPG'
import draft07 from '../assets/theErrorOfTheBeautiful/draft/IMG_0607.JPG'
import draft08 from '../assets/theErrorOfTheBeautiful/draft/IMG_0608.JPG'
import stackOfThoughts from '../assets/developerState/01_stackOfThoughts.JPG'
import mergeConflict from '../assets/developerState/02_mergeConflict.JPG'
import developerStateCover from '../assets/developerState/03_DeveloperState.JPG'
import developerStateBanner from '../assets/developerState/banner/banner_.JPG'
import dsDraft01 from '../assets/developerState/draft/IMG_0630.JPG'
import dsDraft02 from '../assets/developerState/draft/IMG_0631.JPG'
import dsDraft03 from '../assets/developerState/draft/IMG_0632.JPG'
import dsDraft04 from '../assets/developerState/draft/IMG_4862.jpg'
import dsDraft05 from '../assets/developerState/draft/IMG_7239.jpg'
import dsDraft06 from '../assets/developerState/draft/IMG_8138.jpg'

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
  /** Отдельная картинка для баннера страницы серии */
  bannerImage?: string
  /** Абзацы концепции; последний можно выделить акцентом */
  concept: string[]
  processImages: string[]
  works: SeriesWork[]
}

export const seriesList: Series[] = [
  {
    id: 'the-error-of-being-beautiful',
    title: 'The Error of Being Beautiful',
    label: 'цифровые портреты',
    description: 'Картины о красоте, которая постепенно ломается под чужими ожиданиями',
    bannerImage: banner,
    concept: [
      'Серия исследует, как чужие ожидания постепенно искажают образ человека. Каждый портрет начинается с цельного лица и заканчивается тем, что система уже не может его «прочитать» правильно.',
      'Красота здесь не идеал, а сбой: она ещё держится, но уже трескается по швам чужих правил, фильтров и готовых шаблонов.',
      'Работая с маслом и цифровым слоем, я собираю образ заново — так, будто пытаюсь сохранить человека до того, как его окончательно поправят.',
    ],
    processImages: [
      draft01,
      draft02,
      draft03,
      draft04,
      draft05,
      draft06,
      draft07,
      draft08,
    ],
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
  {
    id: 'developer-state',
    title: 'Developer State',
    label: 'цифровые портреты',
    description: 'Как профессия разработчика постепенно становится способом мышления',
    bannerImage: developerStateBanner,
    concept: [
      'Серия о том, как работа с кодом перестаёт быть просто профессией и начинает формировать взгляд на мир.',
      'Разработчик мыслит системами, состояниями и ошибками — и эти привычки постепенно проникают в повседневную жизнь.',
      'Картины фиксируют этот переход: от инструмента к способу мышления.',
    ],
    processImages: [
      dsDraft01,
      dsDraft02,
      dsDraft03,
      dsDraft04,
      dsDraft05,
      dsDraft06,
    ],
    works: [
      {
        id: 'stack-of-thoughts',
        index: '01',
        title: 'Stack Of Thoughts',
        year: '2026',
        medium: 'Холст, масло',
        size: '50 × 100 см',
        image: stackOfThoughts,
      },
      {
        id: 'merge-conflict',
        index: '02',
        title: 'Merge Conflict',
        year: '2026',
        medium: 'Холст, масло',
        size: '50 × 100 см',
        image: mergeConflict,
      },
      {
        id: 'developer-state',
        index: '03',
        title: 'Developer State',
        year: '2026',
        medium: 'Холст, масло',
        size: '50 × 100 см',
        image: developerStateCover,
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
