import stillDesiredMain from '../assets/pages/series/theErrorOfTheBeautiful/stillDesired/main.png'
import lovedInPiecesMain from '../assets/pages/series/theErrorOfTheBeautiful/lovedInPieces/main.png'
import losingMyShapeMain from '../assets/pages/series/theErrorOfTheBeautiful/losingMyShape/main.png'
import errorSeriesBanner from '../assets/pages/series/theErrorOfTheBeautiful/banner.png'
import interior01 from '../assets/pages/series/theErrorOfTheBeautiful/interior/01.png'
import interior02 from '../assets/pages/series/theErrorOfTheBeautiful/interior/02.png'
import interior03 from '../assets/pages/series/theErrorOfTheBeautiful/interior/03.png'
import interior04 from '../assets/pages/series/theErrorOfTheBeautiful/interior/04.jpg'
import interior05 from '../assets/pages/series/theErrorOfTheBeautiful/interior/05.jpg'
import stillDesiredInterior01 from '../assets/pages/series/theErrorOfTheBeautiful/stillDesired/interior/01.png'
import stillDesiredInterior02 from '../assets/pages/series/theErrorOfTheBeautiful/stillDesired/interior/02.png'
import stillDesiredInterior03 from '../assets/pages/series/theErrorOfTheBeautiful/stillDesired/interior/03.png'
import stillDesiredInterior04 from '../assets/pages/series/theErrorOfTheBeautiful/stillDesired/interior/04.png'
import stillDesiredInterior05 from '../assets/pages/series/theErrorOfTheBeautiful/stillDesired/interior/05.png'
import lovedInPiecesInterior01 from '../assets/pages/series/theErrorOfTheBeautiful/lovedInPieces/interior/01.png'
import lovedInPiecesInterior02 from '../assets/pages/series/theErrorOfTheBeautiful/lovedInPieces/interior/02.png'
import lovedInPiecesInterior03 from '../assets/pages/series/theErrorOfTheBeautiful/lovedInPieces/interior/03.png'
import lovedInPiecesInterior04 from '../assets/pages/series/theErrorOfTheBeautiful/lovedInPieces/interior/04.png'
import lovedInPiecesInterior05 from '../assets/pages/series/theErrorOfTheBeautiful/lovedInPieces/interior/05.png'
import losingMyShapeInterior01 from '../assets/pages/series/theErrorOfTheBeautiful/losingMyShape/interior/01.png'
import losingMyShapeInterior02 from '../assets/pages/series/theErrorOfTheBeautiful/losingMyShape/interior/02.png'
import losingMyShapeInterior03 from '../assets/pages/series/theErrorOfTheBeautiful/losingMyShape/interior/03.png'
import losingMyShapeInterior04 from '../assets/pages/series/theErrorOfTheBeautiful/losingMyShape/interior/04.png'
import losingMyShapeInterior05 from '../assets/pages/series/theErrorOfTheBeautiful/losingMyShape/interior/05.png'
import stackOfThoughts from '../assets/pages/series/developerState/stackOfThoughts/main.png'
import mergeConflict from '../assets/pages/series/developerState/mergeConflict/main.png'
import developerStateCover from '../assets/pages/series/developerState/developerState/main.png'
import developerStateAbout from '../assets/pages/series/developerState/aboutSeries.png'
import dsInterior01 from '../assets/pages/series/developerState/interior/01.JPG'
import dsInterior02 from '../assets/pages/series/developerState/interior/02.JPG'
import dsInterior03 from '../assets/pages/series/developerState/interior/03.JPG'
import readyMain from '../assets/pages/series/savedForLater/ready/main.png'
import readyInterior01 from '../assets/pages/series/savedForLater/ready/interior/01.png'
import readyInterior02 from '../assets/pages/series/savedForLater/ready/interior/02.png'
import readyInterior03 from '../assets/pages/series/savedForLater/ready/interior/03.png'
import readyInterior04 from '../assets/pages/series/savedForLater/ready/interior/04.png'
import almostOutMain from '../assets/pages/series/savedForLater/almostOut/main.png'
import inProgressMain from '../assets/pages/series/savedForLater/inProgress/main.png'
import settledInMain from '../assets/pages/series/savedForLater/settledIn/main.png'
import noRushMain from '../assets/pages/series/savedForLater/noRush/main.png'

export type SeriesWork = {
  id: string
  index: string
  title: string
  titleRu?: string
  year: string
  medium: string
  size: string
  image?: string
  /** Кадры картины в интерьере (папка work/interior) */
  interiorImages?: string[]
}

export type SeriesStatus = 'ready' | 'in-progress'

export type Series = {
  id: string
  /** Английское название */
  title: string
  /** Русское название для баннера */
  titleRu: string
  /** Русский заголовок в 2 строки на баннере */
  titleRuLines?: [string, string]
  label: string
  description: string
  /** Статус серии на странице списка */
  status: SeriesStatus
  /**
   * Баннер страницы серии.
   * Класть файл в: src/assets/pages/series/{SeriesFolder}/banner.png
   */
  bannerImage?: string
  /** Абзацы концепции */
  concept: string[]
  /** Кадры деталей серии (папка details) */
  detailImages: string[]
  /** Кадры «в интерьере» (папка interior), листаются */
  interiorImages: string[]
  works: SeriesWork[]
}

export const seriesStatusLabel: Record<SeriesStatus, string> = {
  ready: 'Готова',
  'in-progress': 'В работе',
}

export const seriesList: Series[] = [
  {
    id: 'the-error-of-being-beautiful',
    title: 'The Error of Being Beautiful',
    titleRu: 'Ошибка быть красивой',
    titleRuLines: ['Ошибка', 'быть красивой'],
    label: 'серия',
    description:
      'О теле, красоте и попытке сохранить себя внутри чужих ожиданий.',
    status: 'ready',
    bannerImage: errorSeriesBanner,
    concept: [
      'В цифровом пространстве красота все реже принадлежит человеку целиком. Она превращается в образ, который можно рассматривать, приближать, разбирать на части, сохранять и снова показывать. Тело становится не просто телом, а поверхностью ожиданий: быть привлекательной, собранной, желанной, достаточно правильной.',
      'The Error of Being Beautiful говорит о моменте, когда этот образ начинает ломаться. Красота не исчезает, но перестает быть безопасной. Она смещает форму, разделяет тело на фрагменты, нарушает связь между частями. Человек все еще видим, все еще привлекателен, но его цельность постепенно ускользает.',
      'В работах серии красота существует как ошибка, на которую продолжают смотреть.',
    ],
    detailImages: [],
    interiorImages: [interior01, interior02, interior03, interior04, interior05],
    works: [
      {
        id: 'still-desired',
        index: '01',
        title: 'Still Desired',
        titleRu: 'Все еще желанна',
        year: '2026',
        medium: 'Холст, масло',
        size: '50 × 100 см',
        image: stillDesiredMain,
        interiorImages: [
          stillDesiredInterior01,
          stillDesiredInterior02,
          stillDesiredInterior03,
          stillDesiredInterior04,
          stillDesiredInterior05,
        ],
      },
      {
        id: 'loved-in-pieces',
        index: '02',
        title: 'Loved In Pieces',
        titleRu: 'Любима по частям',
        year: '2026',
        medium: 'Холст, масло',
        size: '50 × 100 см',
        image: lovedInPiecesMain,
        interiorImages: [
          lovedInPiecesInterior01,
          lovedInPiecesInterior02,
          lovedInPiecesInterior03,
          lovedInPiecesInterior04,
          lovedInPiecesInterior05,
        ],
      },
      {
        id: 'losing-my-shape',
        index: '03',
        title: 'Losing My Shape',
        titleRu: 'Теряю форму',
        year: '2026',
        medium: 'Холст, масло',
        size: '50 × 100 см',
        image: losingMyShapeMain,
        interiorImages: [
          losingMyShapeInterior01,
          losingMyShapeInterior02,
          losingMyShapeInterior03,
          losingMyShapeInterior04,
          losingMyShapeInterior05,
        ],
      },
    ],
  },
  {
    id: 'developer-state',
    title: 'Developer State',
    titleRu: 'Состояние: разработчик',
    label: 'серия',
    description:
      'О моменте, когда код становится не только работой, но и способом думать.',
    status: 'ready',
    // TODO: заменить на src/assets/pages/series/developerState/banner.png
    bannerImage: developerStateAbout,
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
        titleRu: 'Стек мыслей',
        year: '2025',
        medium: 'Холст, масло',
        size: '50 × 100 см',
        image: stackOfThoughts,
      },
      {
        id: 'merge-conflict',
        index: '02',
        title: 'Merge Conflict',
        titleRu: 'Конфликт слияния',
        year: '2025',
        medium: 'Холст, масло',
        size: '50 × 100 см',
        image: mergeConflict,
      },
      {
        id: 'developer-state',
        index: '03',
        title: 'Developer State',
        titleRu: 'Состояние: разработчик',
        year: '2026',
        medium: 'Холст, масло',
        size: '50 × 100 см',
        image: developerStateCover,
      },
    ],
  },
  {
    id: 'postponed-for-later',
    title: 'Postponed For Later',
    titleRu: 'Отложено на потом',
    titleRuLines: ['Отложено', 'на потом'],
    label: 'серия',
    description:
      'О желаниях, решениях и версиях себя, отложенных «на потом».',
    status: 'in-progress',
    // TODO: src/assets/pages/series/savedForLater/banner.png
    concept: [
      'Иногда готовность оказывается не финалом, а паузой — формой, которую уже собрали, но еще не выбрали.',
    ],
    detailImages: [],
    interiorImages: [],
    works: [
      {
        id: 'ready',
        index: '01',
        title: 'Ready',
        titleRu: 'Готова',
        year: '2026',
        medium: 'Холст, масло',
        size: '60 × 70 см',
        image: readyMain,
        interiorImages: [
          readyInterior01,
          readyInterior02,
          readyInterior03,
          readyInterior04,
        ],
      },
      {
        id: 'almost-out',
        index: '02',
        title: 'Almost Out',
        titleRu: 'Почти вышла',
        year: '2026',
        medium: 'Холст, масло',
        size: '60 × 70 см',
        image: almostOutMain,
      },
      {
        id: 'in-progress',
        index: '03',
        title: 'In Progress',
        titleRu: 'В процессе',
        year: '2026',
        medium: 'Холст, масло',
        size: '60 × 70 см',
        image: inProgressMain,
      },
      {
        id: 'settled-in',
        index: '04',
        title: 'Settled In',
        titleRu: 'Обжилась',
        year: '2026',
        medium: 'Холст, масло',
        size: '60 × 70 см',
        image: settledInMain,
      },
      {
        id: 'no-rush',
        index: '05',
        title: 'No Rush',
        titleRu: 'Не к спеху',
        year: '2026',
        medium: 'Холст, масло',
        size: '60 × 70 см',
        image: noRushMain,
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

export function formatSeriesYears(series: Series): string {
  const years = series.works
    .map((work) => Number(work.year))
    .filter((year) => !Number.isNaN(year))
    .sort((a, b) => a - b)

  if (!years.length) return '—'

  const first = years[0]
  const last = years[years.length - 1]
  return first === last ? String(first) : `${first} — ${last}`
}

export function getSeriesMedium(series: Series): string {
  const mediums = [
    ...new Set(series.works.map((work) => work.medium).filter(Boolean)),
  ]
  return mediums[0] ?? '—'
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
