import type { VercelRequest, VercelResponse } from '@vercel/node'
import nodemailer from 'nodemailer'

const TO_EMAIL = 'maiiapoart@gmail.com'
const CONTACT_SUBJECT = 'Контакт с сайта maiiapo'
const ORDER_SUBJECT = 'Заказ работы с сайта maiiapo'

type ContactBody = {
  contact?: unknown
  workTitle?: unknown
  workId?: unknown
}

function isAllowedOrigin(origin: string): boolean {
  try {
    const { hostname, protocol } = new URL(origin)
    if (protocol !== 'http:' && protocol !== 'https:') return false
    if (hostname === 'localhost' || hostname === '127.0.0.1') return true
    return (
      hostname === 'maiiapo.com' ||
      hostname === 'www.maiiapo.com' ||
      hostname === 'maiiapo.art' ||
      hostname === 'www.maiiapo.art'
    )
  } catch {
    return false
  }
}

function setCors(res: VercelResponse, origin: string | undefined) {
  if (origin && isAllowedOrigin(origin)) {
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

async function sendViaTelegram(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return false

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    }),
  })

  if (!response.ok) {
    const raw = await response.text()
    console.error('Telegram error', response.status, raw.slice(0, 300))
    return false
  }

  return true
}

async function sendViaGmail(subject: string, text: string, replyTo?: string): Promise<boolean> {
  const user = process.env.GMAIL_USER || TO_EMAIL
  const pass = process.env.GMAIL_APP_PASSWORD
  if (!pass) return false

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  })

  await transporter.sendMail({
    from: `maiiapo site <${user}>`,
    to: TO_EMAIL,
    subject,
    text,
    replyTo: replyTo || undefined,
  })

  return true
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
    const body = (
      typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    ) as ContactBody

    const contact = asString(body?.contact, 300)
    const workTitle = asString(body?.workTitle, 200)
    const workId = asString(body?.workId, 80)

    if (!contact) {
      return res.status(400).json({ success: false, error: 'Contact is required' })
    }

    const isOrder = Boolean(workTitle || workId)
    const subject = isOrder ? ORDER_SUBJECT : CONTACT_SUBJECT
    const lines = [
      isOrder ? 'Запрос на заказ работы' : 'Контакт с сайта',
      '',
      workTitle ? `Работа: ${workTitle}` : null,
      workId ? `ID: ${workId}` : null,
      `Контакт: ${contact}`,
      origin ? `Источник: ${origin}` : null,
    ].filter((line): line is string => line !== null)

    const text = lines.join('\n')
    const emailLike = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)
      ? contact
      : undefined

    let sent = false

    try {
      if (await sendViaTelegram(`${subject}\n\n${text}`)) sent = true
    } catch (error) {
      console.error('Telegram error', error)
    }

    try {
      if (await sendViaGmail(subject, text, emailLike)) sent = true
    } catch (error) {
      console.error('Gmail error', error)
    }

    if (!sent) {
      console.error('No mail transport configured or all failed', {
        hasTelegram: Boolean(
          process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID,
        ),
        hasGmail: Boolean(process.env.GMAIL_APP_PASSWORD),
      })
      return res.status(503).json({
        success: false,
        error: 'Mail transport is not configured',
      })
    }

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Contact API error', error)
    return res.status(500).json({ success: false, error: 'Internal error' })
  }
}
