/**
 * Каталог работ.
 *
 * Как добавить картинки на страницу работы:
 * 1. В папке работы: main.png + detail1.png, detail2.png...
 * 2. Импортируйте main сверху и укажите в поле image
 * 3. detail* подхватятся автоматически (см. workDetailFolderById)
 */

import cutToFit from '../assets/different/cutToFit/cutToFit.JPG'
import cutToFit01 from '../assets/different/cutToFit/01.JPG'
import cutToFit02 from '../assets/different/cutToFit/02.JPG'
import cutToFit03 from '../assets/different/cutToFit/03.JPG'
import holdingItIn from '../assets/different/holdingItIn/holdingItIn.JPG'
import holdingItIn01 from '../assets/different/holdingItIn/01.JPG'
import holdingItIn02 from '../assets/different/holdingItIn/02.JPG'
import holdingItIn03 from '../assets/different/holdingItIn/03.JPG'
import ready from '../assets/pages/series/savedForLater/ready/main.png'
import almostOut from '../assets/pages/series/savedForLater/almostOut/main.png'
import inProgress from '../assets/pages/series/savedForLater/inProgress/main.png'
import settledIn from '../assets/pages/series/savedForLater/settledIn/main.png'
import noRush from '../assets/pages/series/savedForLater/noRush/main.png'
import stillDesired from '../assets/pages/series/theErrorOfTheBeautiful/stillDesired/main.png'
import lovedInPieces from '../assets/pages/series/theErrorOfTheBeautiful/lovedInPieces/main.png'
import losingMyShape from '../assets/pages/series/theErrorOfTheBeautiful/losingMyShape/main.png'
import stackOfThoughts from '../assets/pages/series/developerState/stackOfThroughts/main.png'
import mergeConflict from '../assets/pages/series/developerState/mergeConflict/main.png'
import developerStateWork from '../assets/pages/series/developerState/developerState/main.png'
import { getSeriesById } from './series'

/** detail1, detail2... из папок работ серий */
const seriesDetailImages = import.meta.glob(
  '../assets/pages/series/**/detail*.{png,PNG,jpg,JPG,jpeg,JPEG}',
  { eager: true, import: 'default' },
) as Record<string, string>

/** Папка работы относительно pages/series — для автоподхвата detail* */
const workDetailFolderById: Record<string, string> = {
  'still-desired': 'theErrorOfTheBeautiful/stillDesired',
  'loved-in-pieces': 'theErrorOfTheBeautiful/lovedInPieces',
  'losing-my-shape': 'theErrorOfTheBeautiful/losingMyShape',
  ready: 'savedForLater/ready',
  'almost-out': 'savedForLater/almostOut',
  'in-progress': 'savedForLater/inProgress',
  'settled-in': 'savedForLater/settledIn',
  'no-rush': 'savedForLater/noRush',
  'stack-of-thoughts': 'developerState/stackOfThroughts',
  'merge-conflict': 'developerState/mergeConflict',
  'developer-state': 'developerState/developerState',
}

function getSeriesWorkDetails(workId: string): string[] {
  const folder = workDetailFolderById[workId]
  if (!folder) return []

  const needle = `/pages/series/${folder}/`.toLowerCase()

  return Object.entries(seriesDetailImages)
    .filter(([path]) => path.replace(/\\/g, '/').toLowerCase().includes(needle))
    .sort(([a], [b]) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }),
    )
    .map(([, url]) => url)
}

export type WorkStatus = 'available' | 'sold' | 'reserved'

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
  /** Текст для блока / аккордеона «О работе» */
  description?: string
  /** Показывать в блоке «Избранные работы» на главной */
  featured?: boolean
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
      'Образ, который уже нарушен, но все еще остается объектом желания.',
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
      'О взгляде, который любит не целого человека, а отдельные части, жесты, линии, фрагменты тела.',
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
      'Момент, когда красота становится нестабильной: части тела все еще привлекательны, но между ними уже нет прежней связи. Человек остается видимым, но его цельность начинает ускользать.',
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
    galleryImages: [cutToFit01, cutToFit02, cutToFit03],
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
    galleryImages: [holdingItIn01, holdingItIn02, holdingItIn03],
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
      'Момент, когда форма уже собрана и готова к показу — но внутри все еще чувствуется напряжение подгонки.',
    featured: true,
  },
  {
    id: 'almost-out',
    index: '10',
    title: 'Almost Out',
    year: 2026,
    size: '60 × 70 см',
    medium: 'Холст, масло',
    price: 22000,
    status: 'available',
    seriesId: 'postponed-for-later',
    image: almostOut,
  },
  {
    id: 'in-progress',
    index: '11',
    title: 'In Progress',
    year: 2026,
    size: '60 × 70 см',
    medium: 'Холст, масло',
    price: 22000,
    status: 'available',
    seriesId: 'postponed-for-later',
    image: inProgress,
  },
  {
    id: 'settled-in',
    index: '12',
    title: 'Settled In',
    year: 2026,
    size: '60 × 70 см',
    medium: 'Холст, масло',
    price: 22000,
    status: 'available',
    seriesId: 'postponed-for-later',
    image: settledIn,
  },
  {
    id: 'no-rush',
    index: '13',
    title: 'No Rush',
    year: 2026,
    size: '60 × 70 см',
    medium: 'Холст, масло',
    price: 22000,
    status: 'available',
    seriesId: 'postponed-for-later',
    image: noRush,
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
      'Две версии одного человека не сходятся в одну. Конфликт слияния — когда внутренние правки противоречат друг другу, и система отказывается выбрать «правильную».',
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
}

export function getWorkById(id: string): Work | undefined {
  return works.find((work) => work.id === id)
}

export function getWorksBySeriesId(seriesId: string): Work[] {
  return works.filter((work) => work.seriesId === seriesId)
}

/** main + detail1, detail2... (из папки работы) или явные galleryImages */
export function getWorkGallery(work: Work): string[] {
  const autoDetails = getSeriesWorkDetails(work.id)
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
