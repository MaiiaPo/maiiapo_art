/**
 * Каталог работ.
 *
 * Как добавить картинки на страницу работы:
 * 1. Серия: src/assets/pages/series/{SeriesFolder}/{workFolder}/main.png + detail1.png...
 * 2. Без серии: src/assets/pages/works/{workFolder}/main.JPG + detail1.JPG...
 * 3. Импортируйте main сверху и укажите в поле image
 * 4. detail* подхватятся автоматически (см. workDetailFolderById)
 */

import cutToFit from '../assets/pages/works/cutToFit/main.png'
import holdingItIn from '../assets/pages/works/holdingItIn/main.png'
import ready from '../assets/pages/series/savedForLater/ready/main.png'
import almostOut from '../assets/pages/series/savedForLater/almostOut/main.png'
import inProgress from '../assets/pages/series/savedForLater/inProgress/main.png'
import settledIn from '../assets/pages/series/savedForLater/settledIn/main.png'
import noRush from '../assets/pages/series/savedForLater/noRush/main.png'
import stillDesired from '../assets/pages/series/theErrorOfTheBeautiful/stillDesired/main.png'
import lovedInPieces from '../assets/pages/series/theErrorOfTheBeautiful/lovedInPieces/main.png'
import losingMyShape from '../assets/pages/series/theErrorOfTheBeautiful/losingMyShape/main.png'
import stackOfThoughts from '../assets/pages/series/developerState/stackOfThoughts/main.png'
import mergeConflict from '../assets/pages/series/developerState/mergeConflict/main.png'
import developerStateWork from '../assets/pages/series/developerState/developerState/main.png'
import { getSeriesById } from './series'

/** detail1, detail2... из папок работ (серии и standalone) */
const workDetailImages = import.meta.glob(
  '../assets/pages/{series,works}/**/detail*.{png,PNG,jpg,JPG,jpeg,JPEG}',
  { eager: true, import: 'default' },
) as Record<string, string>

/**
 * Папка работы относительно src/assets/pages —
 * для автоподхвата detail*
 */
const workDetailFolderById: Record<string, string> = {
  'still-desired': 'series/theErrorOfTheBeautiful/stillDesired',
  'loved-in-pieces': 'series/theErrorOfTheBeautiful/lovedInPieces',
  'losing-my-shape': 'series/theErrorOfTheBeautiful/losingMyShape',
  ready: 'series/savedForLater/ready',
  'almost-out': 'series/savedForLater/almostOut',
  'in-progress': 'series/savedForLater/inProgress',
  'settled-in': 'series/savedForLater/settledIn',
  'no-rush': 'series/savedForLater/noRush',
  'stack-of-thoughts': 'series/developerState/stackOfThoughts',
  'merge-conflict': 'series/developerState/mergeConflict',
  'developer-state': 'series/developerState/developerState',
  'cut-to-fit': 'works/cutToFit',
  'holding-it-in': 'works/holdingItIn',
}

function getWorkDetails(workId: string): string[] {
  const folder = workDetailFolderById[workId]
  if (!folder) return []

  const needle = `/pages/${folder}/`.toLowerCase()

  return Object.entries(workDetailImages)
    .filter(([path]) => path.replace(/\\/g, '/').toLowerCase().includes(needle))
    .sort(([a], [b]) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }),
    )
    .map(([, url]) => url)
}

export type WorkStatus = 'available' | 'sold' | 'reserved' | 'in-progress'

export type Work = {
  /** URL-имя работы, например still-desired → /works/still-desired */
  id: string
  /** Номер для отображения: 01, 02... */
  index: string
  title: string
  year: number
  /** Например: 50 × 100 см */
  size: string
  /** Например: Холст, масло */
  medium: string
  /** Цена в рублях. Для проданных можно оставить 0 — на сайте не покажется */
  price: number
  status: WorkStatus
  /** id серии из series.ts или null, если без серии */
  seriesId: string | null
  /** Импортированное изображение (см. комментарий выше) */
  image?: string
  /** Доп. кадры для галереи на странице работы (кроме основного image) */
  galleryImages?: string[]
  /** Текст для блока / аккордеона «Описание работы» */
  description?: string
  /** Показывать в блоке «Избранные работы» на главной */
  featured?: boolean
  /** Показывать в каталоге /works. По умолчанию true */
  listed?: boolean
}

export const works: Work[] = [
  {
    id: 'still-desired',
    index: '01',
    title: 'Still Desired',
    year: 2026,
    size: '50 × 100 см',
    medium: 'Холст, масло',
    price: 85000,
    status: 'available',
    seriesId: 'the-error-of-being-beautiful',
    image: stillDesired,
    description:
      'Она уже не выглядит цельной и идеальной, но все еще остается желанной. Мне здесь важен этот странный момент: образ уже начал ломаться, а привычный взгляд все равно продолжает искать в нем красоту и привлекательность.',
    featured: false,
  },
  {
    id: 'loved-in-pieces',
    index: '02',
    title: 'Loved In Pieces',
    year: 2026,
    size: '50 × 100 см',
    medium: 'Холст, масло',
    price: 85000,
    status: 'available',
    seriesId: 'the-error-of-being-beautiful',
    image: lovedInPieces,
    description:
      'Иногда человека замечают не целиком, а по частям. Отдельный жест, линия тела, деталь внешности вдруг становятся важнее всего остального. Эта работа как раз про такой взгляд, который выбирает фрагменты и собирает из них свой образ.',
    featured: false,
  },
  {
    id: 'losing-my-shape',
    index: '03',
    title: 'Losing My Shape',
    year: 2026,
    size: '50 × 100 см',
    medium: 'Холст, масло',
    price: 85000,
    status: 'available',
    seriesId: 'the-error-of-being-beautiful',
    image: losingMyShape,
    description:
      'Здесь фигура уже не старается оставаться правильной и собранной. Она смещается, меняется, будто выходит из формы, в которую ее пытались поместить. И в этом для меня есть не только потеря, но и ощущение свободы.',
    featured: false,
  },
  {
    id: 'cut-to-fit',
    index: '04',
    title: 'Cut To Fit',
    year: 2026,
    size: '50 × 60 см',
    medium: 'Холст, масло',
    price: 12000,
    status: 'available',
    seriesId: null,
    image: cutToFit,
    description:
      'Иногда мы так стараемся сохранить красивую форму, что не замечаем, как нас начинают подгонять под нее. Тело остается привлекательным, но внутри появляются искажения и несоответствия.',
    featured: true,
  },
  {
    id: 'holding-it-in',
    index: '05',
    title: 'Holding It In',
    year: 2026,
    size: '40 × 60 см',
    medium: 'Холст, масло',
    price: 15000,
    status: 'available',
    seriesId: null,
    image: holdingItIn,
    description:
      'Мы тратим удивительно много сил не на то, чтобы быть красивыми, а на то, чтобы сохранить красоту.',
    featured: true,
  },
  {
    id: 'ready',
    index: '06',
    title: 'Ready',
    year: 2026,
    size: '60 × 70 см',
    medium: 'Холст, масло',
    price: 22000,
    status: 'available',
    seriesId: 'postponed-for-later',
    image: ready,
    description:
      '«Готова» — о моменте внутреннего сдвига, когда привычное состояние уже перестаёт устраивать, а впереди появляется ощущение движения. Решение ещё не стало действием, но сомнений становится меньше: мы собираемся сделать шаг, выйти за знакомые границы и попробовать что-то новое.',
    featured: true,
  },
  {
    id: 'almost-out',
    index: '10',
    title: 'Almost Out',
    year: 2026,
    size: '60 × 70 см',
    medium: 'Холст, масло',
    price: 0,
    status: 'in-progress',
    seriesId: 'postponed-for-later',
    image: almostOut,
    listed: false,
  },
  {
    id: 'in-progress',
    index: '11',
    title: 'In Progress',
    year: 2026,
    size: '60 × 70 см',
    medium: 'Холст, масло',
    price: 0,
    status: 'in-progress',
    seriesId: 'postponed-for-later',
    image: inProgress,
    listed: false,
  },
  {
    id: 'settled-in',
    index: '12',
    title: 'Settled In',
    year: 2026,
    size: '60 × 70 см',
    medium: 'Холст, масло',
    price: 0,
    status: 'in-progress',
    seriesId: 'postponed-for-later',
    image: settledIn,
    listed: false,
  },
  {
    id: 'no-rush',
    index: '13',
    title: 'No Rush',
    year: 2026,
    size: '60 × 70 см',
    medium: 'Холст, масло',
    price: 0,
    status: 'in-progress',
    seriesId: 'postponed-for-later',
    image: noRush,
    listed: false,
  },
  {
    id: 'stack-of-thoughts',
    index: '07',
    title: 'Stack Of Thoughts',
    year: 2025,
    size: '50 × 100 см',
    medium: 'Холст, масло',
    price: 0,
    status: 'sold',
    seriesId: 'developer-state',
    image: stackOfThoughts,
    description:
      'Мысли разработчика редко существуют по одной. Они складываются в многослойную систему, где каждый новый уровень опирается на предыдущий.',
  },
  {
    id: 'merge-conflict',
    index: '08',
    title: 'Merge Conflict',
    year: 2025,
    size: '50 × 100 см',
    medium: 'Холст, масло',
    price: 0,
    status: 'sold',
    seriesId: 'developer-state',
    image: mergeConflict,
    description:
      'Две версии одного человека не сходятся в одну. Конфликт слияния — когда внутренние правки противоречат друг другу, и система отказывается выбрать «правильную».\n\nСъемный элемент на магнитном креплении позволяет менять композицию работы.',
  },
  {
    id: 'developer-state',
    index: '09',
    title: 'Developer State',
    year: 2026,
    size: '50 × 100 см',
    medium: 'Холст, масло',
    price: 0,
    status: 'sold',
    seriesId: 'developer-state',
    image: developerStateWork,
    description:
      'Рабочие состояния становятся почти интерфейсом личности, переключаясь также быстро, как режимы программы.',
  },
]

export const workStatusLabel: Record<WorkStatus, string> = {
  available: 'Доступна',
  sold: 'Продана',
  reserved: 'Зарезервирована',
  'in-progress': 'В работе',
}

/** Показывать цену только для доступных / зарезервированных работ */
export function shouldShowWorkPrice(work: Work): boolean {
  return (
    (work.status === 'available' || work.status === 'reserved') &&
    work.price > 0
  )
}

export function getWorkById(id: string): Work | undefined {
  return works.find((work) => work.id === id)
}

export function getWorksBySeriesId(seriesId: string): Work[] {
  return works.filter((work) => work.seriesId === seriesId)
}

/** main + detail1, detail2... (из папки работы) или явные galleryImages */
export function getWorkGallery(work: Work): string[] {
  const autoDetails = getWorkDetails(work.id)
  const extras = autoDetails.length > 0 ? autoDetails : (work.galleryImages ?? [])
  const images = [work.image, ...extras].filter(
    (src): src is string => Boolean(src),
  )
  return [...new Set(images)]
}

export function workPath(id: string): string {
  return `/works/${id}`
}

const standaloneTitlesRu: Record<string, string> = {
  'cut-to-fit': 'Подогнать по форме',
  'holding-it-in': 'Держать в себе',
}

/** Русское название работы (из серии или каталога) */
export function getWorkTitleRu(work: Work): string {
  if (work.seriesId) {
    const seriesWork = getSeriesById(work.seriesId)?.works.find(
      (item) => item.id === work.id,
    )
    if (seriesWork?.titleRu) return seriesWork.titleRu
  }

  return standaloneTitlesRu[work.id] ?? work.title
}

export function formatPrice(price: number): string {
  return `${price.toLocaleString('ru-RU')} ₽`
}

/** 1 работа, 2 работы, 5 работ */
export function formatWorksCount(count: number): string {
  const mod10 = count % 10
  const mod100 = count % 100

  if (mod10 === 1 && mod100 !== 11) {
    return `${count} работа`
  }

  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return `${count} работы`
  }

  return `${count} работ`
}
