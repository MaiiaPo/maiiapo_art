import type { VercelRequest, VercelResponse } from '@vercel/node'

const CONTACT_EMAIL = 'maiiapoart@gmail.com'
const CONTACT_SUBJECT = 'Вам отправлен контакт для связи с сайта maiiapo'
const ORDER_SUBJECT = 'Заказ работы с сайта maiiapo'

const ALLOWED_ORIGINS = new Set([
  'https://maiiapo.com',
  'https://www.maiiapo.com',
  'https://maiiapo.art',
  'https://www.maiiapo.art',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
])

type ContactBody = {
  contact?: unknown
  workTitle?: unknown
  workId?: unknown
}

function setCors(res: VercelResponse, origin: string | undefined) {
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Vary', 'Origin')
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept')
}

function asString(value: unknown, max = 500): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = typeof req.headers.origin === 'string' ? req.headers.origin : undefined
  setCors(res, origin)

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  try {
    const body = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as ContactBody
    const contact = asString(body?.contact, 300)
    const workTitle = asString(body?.workTitle, 200)
    const workId = asString(body?.workId, 80)

    if (!contact) {
      return res.status(400).json({ success: false, error: 'Contact is required' })
    }

    const isOrder = Boolean(workTitle || workId)
    const lines = [
      isOrder ? 'Запрос на заказ работы' : 'Контакт с сайта',
      '',
      workTitle ? `Работа: ${workTitle}` : null,
      workId ? `ID: ${workId}` : null,
      `Контакт: ${contact}`,
    ].filter((line): line is string => line !== null)

    const emailLike = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)

    // Запрос идёт с сервера Vercel (не из РФ) → FormSubmit доступен
    const upstream = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: 'maiiapo.site',
          email: emailLike ? contact : 'noreply@maiiapo.com',
          _replyto: emailLike ? contact : undefined,
          _subject: isOrder ? ORDER_SUBJECT : CONTACT_SUBJECT,
          _captcha: 'false',
          _template: 'box',
          message: lines.join('\n'),
        }),
      },
    )

    const raw = await upstream.text()
    let result: { success?: string | boolean; message?: string } = {}
    try {
      result = JSON.parse(raw) as typeof result
    } catch {
      // FormSubmit иногда отдаёт HTML после активации
    }

    if (!upstream.ok || !result.success) {
      console.error('FormSubmit error', upstream.status, raw.slice(0, 500))
      return res.status(502).json({
        success: false,
        error: 'Upstream email service failed',
      })
    }

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Contact API error', error)
    return res.status(500).json({ success: false, error: 'Internal error' })
  }
}
