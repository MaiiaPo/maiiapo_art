import { getCountryCode } from './geo'

const SOURCE_HOSTS = new Set(['maiiapo.com', 'www.maiiapo.com'])
const TARGET_HOST = 'maiiapo.art'

/**
 * Для посетителей из России: maiiapo.com → maiiapo.art
 * (тот же путь и query). При ошибке геоопределения остаёмся на текущем домене.
 * @returns true, если начат редирект
 */
export async function redirectRuFromComToArt(): Promise<boolean> {
  if (typeof window === 'undefined') return false

  const host = window.location.hostname.toLowerCase()
  if (!SOURCE_HOSTS.has(host)) return false

  const country = await getCountryCode()
  if (country !== 'RU') return false

  const target = new URL(window.location.href)
  target.hostname = TARGET_HOST
  target.port = ''
  window.location.replace(target.toString())
  return true
}
