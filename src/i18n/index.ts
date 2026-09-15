import { computed } from 'vue'
import { useLocale, type Locale } from './locale'
import { translate, translateList } from './messages'

export function useI18n() {
  const { locale, isEn, isRu, setLocale } = useLocale()

  function t(path: string, params?: Record<string, string | number>) {
    return translate(locale.value, path, params)
  }

  function tList(path: string) {
    return translateList(locale.value, path)
  }

  return {
    locale,
    isEn,
    isRu,
    setLocale,
    t,
    tList,
  }
}

export function formatWorksCountLocalized(count: number, locale: Locale): string {
  if (locale === 'en') {
    return count === 1 ? `${count} work` : `${count} works`
  }

  const mod10 = count % 10
  const mod100 = count % 100

  if (mod10 === 1 && mod100 !== 11) return `${count} работа`
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return `${count} работы`
  }
  return `${count} работ`
}

export function formatSeriesCountLocalized(count: number, locale: Locale): string {
  if (locale === 'en') {
    return count === 1 ? `${count} series` : `${count} series`
  }

  const mod10 = count % 10
  const mod100 = count % 100

  if (mod10 === 1 && mod100 !== 11) return `${count} серия`
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return `${count} серии`
  }
  return `${count} серий`
}

export function localizeSize(size: string, locale: Locale): string {
  if (locale === 'en') return size.replace(/см/g, 'cm')
  return size
}

export function localizeMedium(medium: string, locale: Locale): string {
  if (locale === 'ru') return medium
  if (medium === 'Холст, масло') return 'Canvas, oil'
  return medium
}

export function useLocalizedTitle() {
  const { isEn } = useLocale()

  function workTitle(titleRu: string, titleEn: string) {
    return computed(() => (isEn.value ? titleEn : titleRu))
  }

  return { workTitle, isEn }
}
