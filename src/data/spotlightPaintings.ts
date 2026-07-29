export type SpotlightPainting = {
  id: string
  label: string
  text: string
  title: string
  ctaLabel: string
  ctaTo: string
  // TODO: путь к изображению картины
  image?: string
}

export const spotlightPaintings: SpotlightPainting[] = [
  {
    id: 'holding-it-in',
    label: 'о проекте',
    text: 'Каждый портрет — это попытка собрать образ, который система постоянно искажает.',
    title: 'Holding It In',
    ctaLabel: 'Читать дальше',
    ctaTo: '/about',
  },
  {
    id: 'cut-to-fit',
    label: 'о проекте',
    text: 'Красота здесь не идеал, а сбой: образ держится, пока его не начинают «править».',
    title: 'Cut To Fit',
    ctaLabel: 'Читать дальше',
    ctaTo: '/about',
  },
  {
    id: 'still-desired',
    label: 'о проекте',
    text: 'Отдельная картина — как кадр ошибки: что-то уже сломано, но всё ещё выглядит желанным.',
    title: 'Still Desired',
    ctaLabel: 'Читать дальше',
    ctaTo: '/about',
  },
]
