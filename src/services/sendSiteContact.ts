export type SiteContactPayload = {
  contact: string
  workTitle?: string
  workId?: string
}

/**
 * Заявки всегда уходят на API Vercel (www.maiiapo.com).
 * На maiiapo.art своего backend нет — только статика на reg.ru.
 */
function getContactEndpoint(): string {
  if (typeof window === 'undefined') {
    return 'https://www.maiiapo.com/api/contact'
  }

  const host = window.location.hostname.toLowerCase()
  if (host === 'localhost' || host === '127.0.0.1') {
    return '/api/contact'
  }

  // И .com, и .art бьют в один рабочий endpoint на Vercel
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

  const response = await fetch(getContactEndpoint(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      contact,
      workTitle: payload.workTitle,
      workId: payload.workId,
    }),
  })

  let result: { success?: string | boolean } = {}
  try {
    result = (await response.json()) as { success?: string | boolean }
  } catch {
    throw new Error('Не удалось отправить сообщение')
  }

  if (!response.ok || !result.success) {
    throw new Error('Не удалось отправить сообщение')
  }
}
