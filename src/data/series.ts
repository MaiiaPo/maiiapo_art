import stillDesired from '../assets/theErrorOfTheBeautiful/01_stillDesired.JPG'
import lovedInPieces from '../assets/theErrorOfTheBeautiful/02_LovedInPieces.JPG'
import banner from '../assets/theErrorOfTheBeautiful/banner/banner.JPG'
import detail02 from '../assets/theErrorOfTheBeautiful/details/02.JPG'
import detail03 from '../assets/theErrorOfTheBeautiful/details/03.JPG'
import detail04 from '../assets/theErrorOfTheBeautiful/details/IMG_0610.JPG'
import detail05 from '../assets/theErrorOfTheBeautiful/details/IMG_0611.JPG'
import interior01 from '../assets/theErrorOfTheBeautiful/interior/01.JPG'
import interior02 from '../assets/theErrorOfTheBeautiful/interior/IMG_0609.JPG'
import stackOfThoughts from '../assets/developerState/stackOfThoughts/main.JPG'
import mergeConflict from '../assets/developerState/mergeConflict/main.JPG'
import developerStateCover from '../assets/developerState/developerState/main.JPG'
import developerStateBanner from '../assets/developerState/banner/banner_.JPG'
import dsInterior01 from '../assets/developerState/interior/01_interior.JPG'
import dsInterior02 from '../assets/developerState/interior/02_interior.JPG'
import dsInterior03 from '../assets/developerState/interior/03_interior.JPG'

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
  /** Абзацы концепции */
  concept: string[]
  /** Кадры деталей серии (папка details) */
  detailImages: string[]
  /** Кадры «в интерьере» (папка interior), листаются */
  interiorImages: string[]
  works: SeriesWork[]
}

export const seriesList: Series[] = [
  {
    id: 'the-error-of-being-beautiful',
    title: 'The Error of Being Beautiful',
    label: '',
    description:
      'Серия о красоте, которая продолжает быть желанной, даже когда начинает ломаться. В цифровом пространстве тело перестает восприниматься целиком: оно смещается, дробится, теряет связь между частями. Образ остается привлекательным, но уже не удерживает человека внутри себя.',
    bannerImage: banner,
    concept: [
      'В цифровом пространстве красота все реже принадлежит человеку целиком. Она превращается в образ, который можно рассматривать, приближать, разбирать на части, сохранять и снова показывать. Тело становится не просто телом, а поверхностью ожиданий: быть привлекательной, собранной, желанной, достаточно правильной.',
      'The Error of Being Beautiful говорит о моменте, когда этот образ начинает ломаться. Красота не исчезает, но перестает быть безопасной. Она смещает форму, разделяет тело на фрагменты, нарушает связь между частями. Человек все еще видим, все еще привлекателен, но его цельность постепенно ускользает.',
      'В работах серии красота существует как ошибка, на которую продолжают смотреть.',
    ],
    detailImages: [detail02, detail03, detail04, detail05],
    interiorImages: [interior01, interior02],
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
        id: 'losing-my-shape',
        index: '03',
        title: 'Losing My Shape',
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
      'Работа разработчика редко заканчивается вместе с рабочим днем. Постепенно код перестает быть только инструментом и становится способом воспринимать мир. Проблемы разбиваются на задачи, мысли складываются в алгоритмы, а внутренние состояния начинают ощущаться как режимы системы.',
      'Серия Developer State исследует, как профессия меняет не только навыки, но и самого человека. Логика, постоянное переключение контекста, поиск ошибок, бесконечные версии и обновления становятся частью личности. Здесь разработчик показан не за компьютером, а в момент, когда цифровое мышление уже встроилось в него самого.',
      'Это серия о людях, которые пишут код, а со временем начинают мыслить его структурами.',
    ],
    detailImages: [],
    interiorImages: [dsInterior01, dsInterior02, dsInterior03],
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
