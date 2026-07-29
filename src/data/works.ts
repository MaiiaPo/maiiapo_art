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

import cutToFit from '../assets/featuredWorks/cutToFit.JPG'
import holdingItIn from '../assets/featuredWorks/holdingItIn.JPG'
import stillDesired from '../assets/theErrorOfTheBeautiful/01_stillDesired.JPG'
import lovedInPieces from '../assets/theErrorOfTheBeautiful/02_LovedInPieces.JPG'

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
    featured: true,
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
