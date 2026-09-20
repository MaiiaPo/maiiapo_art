export type SiteContactPayload = {
  contact: string
  workTitle?: string
  workId?: string
}

/**
 * Отправка заявок через свой /api/contact (Vercel).
 * Браузер в РФ не ходит на formsubmit.co напрямую — его часто режут.
 * С .art тоже бьём в API на .com (CORS разрешён).
 */
function getContactEndpoint(): string {
  if (typeof window === 'undefined') return '/api/contact'

  const host = window.location.hostname.toLowerCase()
  if (host === 'maiiapo.art' || host === 'www.maiiapo.art') {
    return 'https://www.maiiapo.com/api/contact'
  }

  return '/api/contact'
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

  if (!response.ok) {
    throw new Error('Не удалось отправить сообщение')
  }

  const result = (await response.json()) as { success?: string | boolean }

  if (!result.success) {
    throw new Error('Не удалось отправить сообщение')
  }
}
