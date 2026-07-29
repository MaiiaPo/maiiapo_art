/**
 * Каталог работ.
 *
 * Как добавить картинку:
 * 1. Положите файл в src/assets/... (например featuredWorks или папку серии)
 * 2. Импортируйте сверху файла
 * 3. Укажите в поле image
 *
 * Пример:
 *   import myWork from '../assets/featuredWorks/myWork.JPG'
 *   { id: 'my-work', ..., image: myWork }
 */

import cutToFit from '../assets/different/cutToFit/cutToFit.JPG'
import cutToFit01 from '../assets/different/cutToFit/01.JPG'
import cutToFit02 from '../assets/different/cutToFit/02.JPG'
import cutToFit03 from '../assets/different/cutToFit/03.JPG'
import holdingItIn from '../assets/different/holdingItIn/holdingItIn.JPG'
import holdingItIn01 from '../assets/different/holdingItIn/01.JPG'
import holdingItIn02 from '../assets/different/holdingItIn/02.JPG'
import holdingItIn03 from '../assets/different/holdingItIn/03.JPG'
import stillDesired from '../assets/theErrorOfTheBeautiful/01_stillDesired.JPG'
import stillDesired01 from '../assets/theErrorOfTheBeautiful/stillDesired/01.JPG'
import stillDesired02 from '../assets/theErrorOfTheBeautiful/stillDesired/02.JPG'
import stillDesired03 from '../assets/theErrorOfTheBeautiful/stillDesired/03.JPG'
import lovedInPieces from '../assets/theErrorOfTheBeautiful/02_LovedInPieces.JPG'
import lovedInPieces01 from '../assets/theErrorOfTheBeautiful/lovedInPieces/01.JPG'
import lovedInPieces02 from '../assets/theErrorOfTheBeautiful/lovedInPieces/02.JPG'
import lovedInPieces03 from '../assets/theErrorOfTheBeautiful/lovedInPieces/03.JPG'
import stackOfThoughts from '../assets/developerState/01_stackOfThoughts.JPG'
import mergeConflict from '../assets/developerState/02_mergeConflict.JPG'
import developerStateWork from '../assets/developerState/03_DeveloperState.JPG'

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
    galleryImages: [stillDesired01, stillDesired02, stillDesired03],
    description:
      'Портрет о желании остаться желанной даже тогда, когда образ уже трещит под чужими ожиданиями. Красота ещё держится, но система уже начинает читать её с ошибкой.',
    featured: false,
  },
  {
    id: 'loved-in-pieces',
    index: '02',
    title: 'Loved In Pieces',
    year: 2026,
    size: '50 × 100 см',
    medium: 'Холст, масло',
    price: 120000,
    status: 'available',
    seriesId: 'the-error-of-being-beautiful',
    image: lovedInPieces,
    galleryImages: [lovedInPieces01, lovedInPieces02, lovedInPieces03],
    description:
      'Любовь, собранная из фрагментов: лицо ещё узнаваемо, но уже разрезано чужими правилами. Работа о том, как принимают по частям — и теряют целое.',
    featured: false,
  },
  {
    id: 'cut-to-fit',
    index: '03',
    title: 'Cut To Fit',
    year: 2026,
    size: '50 × 100 см',
    medium: 'Холст, масло',
    price: 85000,
    status: 'available',
    seriesId: null,
    image: cutToFit,
    galleryImages: [cutToFit01, cutToFit02, cutToFit03],
    description:
      'О попытке вписаться в чужую форму: обрезать лишнее, подогнать края, стать удобной. Картина фиксирует момент, когда подгонка уже заметнее самого человека.',
    featured: true,
  },
  {
    id: 'holding-it-in',
    index: '04',
    title: 'Holding It In',
    year: 2026,
    size: '50 × 100 см',
    medium: 'Холст, масло',
    price: 85000,
    status: 'available',
    seriesId: null,
    image: holdingItIn,
    galleryImages: [holdingItIn01, holdingItIn02, holdingItIn03],
    description:
      'О сдержанности, которая уже почти не держится. Внутри накопилось слишком много — снаружи остаётся только напряжение линии и взгляда.',
    featured: true,
  },
  {
    id: 'stack-of-thoughts',
    index: '05',
    title: 'Stack Of Thoughts',
    year: 2026,
    size: '50 × 100 см',
    medium: 'Холст, масло',
    price: 85000,
    status: 'available',
    seriesId: 'developer-state',
    image: stackOfThoughts,
    description:
      'Мысли укладываются слоями, как стек вызовов: каждое новое состояние опирается на предыдущее. Портрет о перегруженном внимании и привычке держать всё в голове.',
  },
  {
    id: 'merge-conflict',
    index: '06',
    title: 'Merge Conflict',
    year: 2026,
    size: '50 × 100 см',
    medium: 'Холст, масло',
    price: 85000,
    status: 'available',
    seriesId: 'developer-state',
    image: mergeConflict,
    description:
      'Две версии одного человека не сходятся в одну. Конфликт слияния — когда внутренние правки противоречат друг другу, и система отказывается выбрать «правильную».',
  },
  {
    id: 'developer-state',
    index: '07',
    title: 'Developer State',
    year: 2026,
    size: '50 × 100 см',
    medium: 'Холст, масло',
    price: 85000,
    status: 'available',
    seriesId: 'developer-state',
    image: developerStateWork,
    description:
      'Состояние, в котором профессия уже стала способом видеть мир: через состояния, ошибки и системы. Финальный портрет серии о взгляде разработчика.',
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

/** Основное изображение + доп. кадры для галереи */
export function getWorkGallery(work: Work): string[] {
  const images = [work.image, ...(work.galleryImages ?? [])].filter(
    (src): src is string => Boolean(src),
  )
  return [...new Set(images)]
}

export function workPath(id: string): string {
  return `/works/${id}`
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
