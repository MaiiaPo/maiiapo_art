const CACHE_KEY = 'maiiapo-geo-country'

export const SITE_URL_COM = 'https://maiiapo.com'
export const SITE_URL_ART = 'https://maiiapo.art'

const ART_HOSTS = new Set(['maiiapo.art', 'www.maiiapo.art'])

/**
 * Код страны по IP (ISO 3166-1 alpha-2), например RU.
 * Результат кэшируется в sessionStorage. При ошибке — null.
 */
export async function getCountryCode(): Promise<string | null> {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY)
    if (cached) return cached
  } catch {
    // sessionStorage может быть недоступен
  }

  const country = await fetchCountryCode()
  if (!country) return null

  try {
    sessionStorage.setItem(CACHE_KEY, country)
  } catch {
    // ignore
  }

  return country
}

async function fetchCountryCode(): Promise<string | null> {
  if (typeof window === 'undefined') return null

  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 2500)

  try {
    const response = await fetch('https://ipapi.co/country_code/', {
      signal: controller.signal,
      cache: 'no-store',
    })
    if (!response.ok) return null

    const text = (await response.text()).trim().toUpperCase()
    return /^[A-Z]{2}$/.test(text) ? text : null
  } catch {
    return null
  } finally {
    window.clearTimeout(timeout)
  }
}

/**
 * Синхронно: .art-хост → maiiapo.art, иначе maiiapo.com.
 */
export function siteUrlFromHostname(
  hostname = typeof window !== 'undefined' ? window.location.hostname : '',
): string {
  return ART_HOSTS.has(hostname.toLowerCase()) ? SITE_URL_ART : SITE_URL_COM
}

/**
 * Публичный URL сайта для посетителя:
 * maiiapo.art — если уже на .art или регион Россия; иначе maiiapo.com.
 */
export async function resolvePublicSiteUrl(): Promise<string> {
  if (typeof window !== 'undefined') {
    const host = window.location.hostname.toLowerCase()
    if (ART_HOSTS.has(host)) return SITE_URL_ART
  }

  const country = await getCountryCode()
  return country === 'RU' ? SITE_URL_ART : SITE_URL_COM
}
