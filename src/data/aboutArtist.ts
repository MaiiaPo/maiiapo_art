import portrait from '../assets/artist/maiiapo2.png'
import signature from '../assets/artist/logo.png'

export type AboutContact = {
  label: string
  value: string
  href?: string
}

export const aboutArtist = {
  label: 'контакты',
  intro:
    'По вопросам приобретения работ, сотрудничества, выставок или просто, чтобы сказать привет.',
  contacts: [
    {
      label: 'E-mail',
      value: 'maiiapo.com@gmail.com',
      href: 'mailto:maiiapo.com@gmail.com',
    },
    {
      label: 'Telegram',
      value: '@maiiapoart',
      href: 'https://t.me/maiiapoart',
    },
    {
      label: 'Instagram',
      value: '@maiiapoart',
      href: 'https://www.instagram.com/maiiapoart',
    },
  ] satisfies AboutContact[],
  formLead: 'Если Вы хотите заказать работу, оставьте свой контакт — и я вам напишу.',
  formPlaceholder: 'Ваш e-mail или Telegram',
  formNote: 'Обычно отвечаю в течение 1–2 дней.',
  portrait,
  portraitAlt: 'Майя По',
  signature,
  slogan: ['ИСКУССТВО', 'О НОВОЙ', 'ВЕРСИИ', 'ЧЕЛОВЕКА'],
}
