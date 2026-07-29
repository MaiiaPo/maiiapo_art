import { works, formatPrice, workPath } from './works'

export type FeaturedWork = {
  id: string
  index: string
  title: string
  size: string
  price: string
  image?: string
  to: string
}

export const featuredWorks: FeaturedWork[] = works
  .filter((work) => work.featured)
  .map((work) => ({
    id: work.id,
    index: work.index,
    title: work.title,
    size: work.size,
    price: formatPrice(work.price),
    image: work.image,
    to: workPath(work.id),
  }))
