const CONTACT_EMAIL = 'maiiapo.com@gmail.com'
const CONTACT_SUBJECT = 'Вам отправлен контакт для связи с сайта maiiapo.com'
const ORDER_SUBJECT = 'Заказ работы с сайта maiiapo.com'

export type SiteContactPayload = {
  contact: string
  workTitle?: string
  workId?: string
}

export async function sendSiteContact(
  contactOrPayload: string | SiteContactPayload,
): Promise<void> {
  const payload =
    typeof contactOrPayload === 'string'
      ? { contact: contactOrPayload }
      : contactOrPayload

  const contact = payload.contact.trim()
  const isOrder = Boolean(payload.workTitle || payload.workId)

  const lines = [
    isOrder ? 'Запрос на заказ работы с сайта maiiapo.com' : 'Контакт с сайта maiiapo.com',
    '',
    payload.workTitle ? `Работа: ${payload.workTitle}` : null,
    payload.workId ? `ID: ${payload.workId}` : null,
    `Контакт: ${contact}`,
  ].filter((line): line is string => line !== null)

  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: isOrder ? ORDER_SUBJECT : CONTACT_SUBJECT,
        _captcha: 'false',
        _template: 'box',
        message: lines.join('\n'),
      }),
    },
  )

  if (!response.ok) {
    throw new Error('Не удалось отправить сообщение')
  }

  const result = (await response.json()) as { success?: string | boolean }

  if (!result.success) {
    throw new Error('Не удалось отправить сообщение')
  }
}
