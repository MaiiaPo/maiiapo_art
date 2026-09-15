const SOURCE_HOSTS = new Set(['maiiapo.com', 'www.maiiapo.com'])
const TARGET_HOST = 'maiiapo.art'
const CACHE_KEY = 'maiiapo-geo-country'

/**
 * Для посетителей из России: maiiapo.com → maiiapo.art
 * (тот же путь и query). При ошибке геоопределения остаёмся на текущем домене.
 * @returns true, если начат редирект
 */
export async function redirectRuFromComToArt(): Promise<boolean> {
  if (typeof window === 'undefined') return false

  const host = window.location.hostname.toLowerCase()
  if (!SOURCE_HOSTS.has(host)) return false

  const country = await detectCountry()
  if (country !== 'RU') return false

  const target = new URL(window.location.href)
  target.hostname = TARGET_HOST
  target.port = ''
  window.location.replace(target.toString())
  return true
}

async function detectCountry(): Promise<string | null> {
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
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 2500)

  try {
    // Лёгкий endpoint: ответ — код страны текстом (например RU)
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
