import artistPhoto from '../assets/pages/home/aboutArtist.png'

export type ArtistSpotlight = {
  label: string
  lead: string
  text: string
  imageAlt: string
  ctaLabel: string
  ctaTo: string
  image: string
}

export const artistSpotlight: ArtistSpotlight = {
  label: 'о художнице',
  lead: 'Я Майя По, разработчик и художница.',
  text: 'Пишу о человеке в цифровой среде: о том, как код, экраны и алгоритмы меняют тело, память и ощущение себя.',
  imageAlt: 'Майя По',
  ctaLabel: 'Подробнее о художнице',
  ctaTo: '/about',
  image: artistPhoto,
}
