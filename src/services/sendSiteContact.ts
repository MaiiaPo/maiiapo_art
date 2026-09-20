export type SiteContactPayload = {
  contact: string
  workTitle?: string
  workId?: string
}

/**
 * Заявки всегда на API Vercel (www.maiiapo.com).
 * На maiiapo.art backend нет — шлём кросс-доменом.
 * URLSearchParams = простой CORS-запрос без preflight OPTIONS.
 */
function getContactEndpoint(): string {
  if (typeof window === 'undefined') {
    return 'https://www.maiiapo.com/api/contact'
  }

  const host = window.location.hostname.toLowerCase()
  if (host === 'localhost' || host === '127.0.0.1') {
    return '/api/contact'
  }

  return 'https://www.maiiapo.com/api/contact'
}

export async function sendSiteContact(
  contactOrPayload: string | SiteContactPayload,
): Promise<void> {
  const payload =
    typeof contactOrPayload === 'string'
      ? { contact: contactOrPayload }
      : contactOrPayload

  const contact = payload.contact.trim()
  if (!contact) {
    throw new Error('Не удалось отправить сообщение')
  }

  const body = new URLSearchParams()
  body.set('contact', contact)
  if (payload.workTitle) body.set('workTitle', payload.workTitle)
  if (payload.workId) body.set('workId', payload.workId)

  const response = await fetch(getContactEndpoint(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body,
  })

  let result: { success?: string | boolean; error?: string } = {}
  try {
    result = (await response.json()) as typeof result
  } catch {
    throw new Error('Не удалось отправить сообщение')
  }

  if (!response.ok || !result.success) {
    throw new Error(result.error || 'Не удалось отправить сообщение')
  }
}
