import { computed, ref, watch } from 'vue'

export type Locale = 'ru' | 'en'

const STORAGE_KEY = 'maiiapo-locale'

function readStoredLocale(): Locale {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    if (value === 'ru' || value === 'en') return value
  } catch {
    /* ignore */
  }
  return 'ru'
}

const locale = ref<Locale>(readStoredLocale())

watch(
  locale,
  (value) => {
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      /* ignore */
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = value
    }
  },
  { immediate: true },
)

export function useLocale() {
  const isEn = computed(() => locale.value === 'en')
  const isRu = computed(() => locale.value === 'ru')

  function setLocale(next: Locale) {
    locale.value = next
  }

  return {
    locale,
    isEn,
    isRu,
    setLocale,
  }
}
