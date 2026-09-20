import aboutSeriesImage from '../assets/pages/series/theErrorOfTheBeautiful/aboutSeries.png'
import developerStateAboutImage from '../assets/pages/series/developerState/aboutSeries.png'
import postponedAboutImage from '../assets/pages/series/savedForLater/aboutSeries.png'
import outsideTheSeriesAboutImage from '../assets/pages/series/outsideTheSeries/aboutSeries.JPG'

export type SeriesAbout = {
  /** Если нет — блок «О серии» без левого изображения */
  image?: string
  imageAlt: string
  label: string
  titleLines: string[]
  paragraphs: string[]
  quoteLines: string[]
}

export const seriesAboutById: Record<string, SeriesAbout> = {
  'the-error-of-being-beautiful': {
    image: aboutSeriesImage,
    imageAlt: 'О серии The Error of Being Beautiful',
    label: 'О серии',
    titleLines: ['Красота', 'всегда', 'в процессе.'],
    paragraphs: [
      'Эта серия — о воплощении и разрушении идеалов. О теле, которое постоянно оценивают, сравнивают, корректируют. О желании быть принятой — и о свободе быть разной.',
      'Фигуры в работах собраны из фрагментов, как отражение современного опыта: мы существуем между ролями, форматами и ожиданиями. Но даже в этой фрагментированности остается движение, сила и жизнь.',
    ],
    quoteLines: [
      'Красота',
      'не статична.',
      'Она ломается,',
      'и в этом есть',
      'свобода.',
    ],
  },
  'developer-state': {
    image: developerStateAboutImage,
    imageAlt: 'О серии Developer State',
    label: 'О серии',
    titleLines: ['Состояние:', 'разработчик.'],
    paragraphs: [
      'Серия о том, как профессия разработчика постепенно становится способом мышления. О внимании, фрагментации и внутренних состояниях, когда код уже не просто работа, а часть личности.',
      'В этих работах я рассматриваю разработчика не только как специалиста, но и как человека внутри системы: в потоке, в конфликте, в инсайте, в поиске ресурса. Это серия о том, как цифровая среда меняет внутреннее состояние.',
    ],
    quoteLines: [
      'Код становится',
      'не только',
      'инструментом.',
      'Он меняет',
      'внутреннее',
      'состояние.',
    ],
  },
  'postponed-for-later': {
    image: postponedAboutImage,
    imageAlt: 'О серии Postponed For Later',
    label: 'О серии',
    titleLines: ['Все', 'на потом.'],
    paragraphs: [
      'Серия о бесконечном списке «потом». О желаниях, мечтах и версиях себя, которые постоянно откладываются. О том, как легко спрятаться в делах, ожиданиях и чужих приоритетах и потерять контакт с тем, что по-настоящему важно.',
      'Но даже в ожидании есть свобода — заметить себя и выбрать другой сценарий.',
    ],
    quoteLines: [
      'Планы не исчезают,',
      'они ждут статуса',
      '«сейчас».',
    ],
  },
  'outside-the-series': {
    image: outsideTheSeriesAboutImage,
    imageAlt: 'Вне серии',
    label: 'Вне серии',
    titleLines: ['Не каждая идея', 'хочет становиться', 'серией.'],
    paragraphs: [
      'Не каждая идея хочет становиться серией. Иногда образ появляется очень ясно и существует сам по себе.',
      'Мне хочется просто его запечатлеть, не придумывая ему продолжение. Здесь собраны такие одиночные работы, каждая со своей историей, состоянием и интонацией.',
    ],
    quoteLines: [
      'Не каждая идея',
      'хочет становиться',
      'серией.',
    ],
  },
}
