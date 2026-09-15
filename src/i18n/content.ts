import type { Locale } from './locale'
import { aboutPage } from '../data/aboutPage'
import { seriesAboutById, type SeriesAbout } from '../data/seriesAbout'
import type { Series } from '../data/series'
import type { Work } from '../data/works'
import { getWorkTitleRu } from '../data/works'
import { getSeriesById } from '../data/series'

const manifestoEn = {
  title: 'Manifesto',
  paragraphs: [
    'I believe in the right to be yourself without the need to conform.',
    'Not to be a convenient version.\nNot to fit a given form.\nNot to become more beautiful, clearer, more productive, or more correct only because it is expected of us.',
    'We live in a world that increasingly tries to define us.',
    'Algorithms decide what to show us.\nSystems turn life into data.\nSocial roles offer ready-made scripts.\nBeauty standards explain what a body should be.\nSociety still insists especially loudly that women know how much space they are allowed to take, how to look, and how convenient to be.',
    'I am interested in the moment of resistance.',
    'When the body steps outside the frame.\nWhen the face stops being an ideal image.\nWhen identity cannot be assembled into one correct version.\nWhen a living being turns out to be more complex than a name, category, or label.',
    'For me this is not a story of destruction.\nIt is a story of the freedom not to match.',
    'I speak of self-acceptance not as reconciliation, but as the right to define yourself. Of the female body as a subject, not an object of evaluation. Of imperfection as a sign of the living. Of differences that do not have to be corrected.',
    'And of humanity in a world that becomes ever more technological.',
    'I am not against technology. Another question interests me more: what must we not lose as we become digital?',
  ],
}

const seriesAboutEn: Record<string, Omit<SeriesAbout, 'image'>> = {
  'the-error-of-being-beautiful': {
    imageAlt: 'About the series The Error of Being Beautiful',
    label: 'About the series',
    titleLines: ['Beauty', 'is always', 'in process.'],
    paragraphs: [
      'This series is about the embodiment and collapse of ideals. About a body that is constantly evaluated, compared, corrected. About the desire to be accepted — and the freedom to be different.',
      'The figures in the works are assembled from fragments, as a reflection of contemporary experience: we exist between roles, formats, and expectations. Yet even in this fragmentation, movement, strength, and life remain.',
    ],
    quoteLines: [
      'Beauty',
      'is not static.',
      'It breaks,',
      'and in that',
      'there is freedom.',
    ],
  },
  'developer-state': {
    imageAlt: 'About the series Developer State',
    label: 'About the series',
    titleLines: ['State:', 'developer.'],
    paragraphs: [
      'A series about how the profession of a developer gradually becomes a way of thinking. About attention, fragmentation, and inner states when code is no longer just work, but part of identity.',
      'In these works I look at the developer not only as a specialist, but as a person inside a system: in flow, in conflict, in insight, in search of a resource. It is a series about how the digital environment changes the inner state.',
    ],
    quoteLines: [
      'Code becomes',
      'not only',
      'a tool.',
      'It changes',
      'the inner',
      'state.',
    ],
  },
  'postponed-for-later': {
    imageAlt: 'About the series Postponed For Later',
    label: 'About the series',
    titleLines: ['Everything', 'for later.'],
    paragraphs: [
      'A series about an endless list of “later”. About desires, dreams, and versions of the self that keep being postponed. About how easy it is to hide in tasks, expectations, and other people’s priorities and lose contact with what truly matters.',
      'But even in waiting there is freedom — to notice yourself and choose another scenario.',
    ],
    quoteLines: [
      'Plans do not disappear;',
      'they wait for the status',
      '“now”.',
    ],
  },
}

const seriesConceptEn: Record<string, string[]> = {
  'the-error-of-being-beautiful': [
    'In digital space, beauty less and less belongs to a person as a whole. It turns into an image that can be examined, zoomed in on, taken apart, saved, and shown again. The body becomes not just a body, but a surface of expectations: to be attractive, collected, desirable, correct enough.',
    'The Error of Being Beautiful speaks of the moment when this image begins to break. Beauty does not disappear, but it stops being safe. It shifts form, divides the body into fragments, disrupts the connection between parts. The person is still visible, still attractive, but their wholeness gradually slips away.',
    'In the works of the series, beauty exists as an error that people keep looking at.',
  ],
  'developer-state': [
    'A series about how the profession of a developer gradually becomes a way of thinking. About attention, fragmentation, and inner states when code is no longer just work, but part of identity.',
  ],
  'postponed-for-later': [
    'Sometimes readiness turns out not to be a finale, but a pause — a form that has already been assembled, but not yet chosen.',
  ],
}

const seriesDescriptionEn: Record<string, string> = {
  'the-error-of-being-beautiful':
    'About the body, beauty, and the attempt to keep yourself inside other people’s expectations.',
  'developer-state':
    'About how the developer profession becomes a way of thinking and an inner state.',
  'postponed-for-later':
    'About desires, decisions, and versions of the self postponed “for later”.',
}

const workDescriptionsEn: Record<string, string> = {
  'still-desired':
    'She no longer looks whole and ideal, but she is still desired. What matters to me here is this strange moment: the image has already begun to break, yet the familiar gaze keeps searching it for beauty and attractiveness.',
  'loved-in-pieces':
    'Sometimes a person is noticed not as a whole, but in parts. A single gesture, a line of the body, a detail of appearance suddenly matters more than everything else. This work is about that kind of gaze — one that chooses fragments and builds its own image from them.',
  'losing-my-shape':
    'Here the figure no longer tries to stay correct and composed. It shifts and changes, as if stepping out of the form it was meant to fit. And for me there is not only loss in that — but a sense of freedom.',
  'cut-to-fit':
    'Sometimes we try so hard to keep a beautiful form that we do not notice how we are being fitted into it. The body remains attractive, but distortions and mismatches appear inside.',
  'holding-it-in':
    'We spend a surprising amount of energy not on being beautiful, but on preserving beauty.',
  ready:
    '“Ready” is about an inner shift — when the familiar state no longer fits, and a sense of movement appears ahead. The decision has not yet become action, but doubts grow quieter: we are about to take a step, leave the known boundaries, and try something new.',
  'stack-of-thoughts':
    'A developer’s thoughts rarely exist one by one. They stack into a multilayered system where each new level rests on the previous one.',
  'merge-conflict':
    'About the inner conflict when different versions of the self, tasks, and decisions collide and refuse to merge into one.\n\nA removable magnet-mounted element lets you change the composition of the work.',
  'developer-state':
    'A portrait of a state in which the profession becomes identity: focus, system, and continuous update.',
}

export function getManifesto(locale: Locale) {
  return locale === 'en' ? manifestoEn : aboutPage.manifesto
}

export function getSeriesAboutLocalized(
  seriesId: string,
  locale: Locale,
): SeriesAbout | undefined {
  const base = seriesAboutById[seriesId]
  if (!base) return undefined
  if (locale === 'ru') return base

  const en = seriesAboutEn[seriesId]
  if (!en) return base

  return {
    ...base,
    ...en,
  }
}

export function getSeriesDescription(series: Series, locale: Locale): string {
  if (locale === 'en') {
    return seriesDescriptionEn[series.id] ?? series.description
  }
  return series.description
}

export function getSeriesConcept(series: Series, locale: Locale): string[] {
  if (locale === 'en') {
    return seriesConceptEn[series.id] ?? series.concept
  }
  return series.concept
}

export function getSeriesDisplayTitle(series: Series, locale: Locale): string {
  return locale === 'en' ? series.title : series.titleRu
}

export function getSeriesTitleLines(
  series: Series,
  locale: Locale,
): [string, string] | string[] {
  if (locale === 'en') {
    const parts = series.title.split(' ')
    if (series.id === 'the-error-of-being-beautiful') {
      return ['THE ERROR OF', 'BEING BEAUTIFUL']
    }
    if (series.id === 'developer-state') {
      return ['DEVELOPER', 'STATE']
    }
    if (series.id === 'postponed-for-later') {
      return ['POSTPONED', 'FOR LATER']
    }
    const mid = Math.ceil(parts.length / 2)
    return [parts.slice(0, mid).join(' '), parts.slice(mid).join(' ')]
  }
  return series.titleRuLines ?? [series.titleRu]
}

export function getWorkDisplayTitle(work: Work, locale: Locale): string {
  return locale === 'en' ? work.title : getWorkTitleRu(work)
}

export function getWorkSubtitle(work: Work, locale: Locale): string {
  if (locale === 'en') return ''
  const titleRu = getWorkTitleRu(work)
  return titleRu === work.title ? '' : work.title
}

export function getWorkDescription(work: Work, locale: Locale): string {
  if (locale === 'en') {
    return workDescriptionsEn[work.id] ?? work.description ?? ''
  }
  return work.description ?? ''
}

export function getSeriesTitleForWork(
  work: Work,
  locale: Locale,
): string | undefined {
  if (!work.seriesId) return undefined
  const series = getSeriesById(work.seriesId)
  if (!series) return undefined
  return getSeriesDisplayTitle(series, locale)
}
