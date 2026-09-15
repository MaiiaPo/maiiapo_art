import type { Locale } from './locale'

type Dict = Record<string, unknown>

export const messages = {
  ru: {
    nav: {
      home: 'Главная',
      series: 'Серии',
      works: 'Работы',
      about: 'О художнице',
      contacts: 'Контакты',
      aria: 'Основная навигация',
    },
    lang: {
      aria: 'Язык',
    },
    breadcrumbs: {
      aria: 'Хлебные крошки',
      home: 'Главная',
      series: 'Серии',
      seriesFallback: 'Серия',
      works: 'Работы',
      workFallback: 'Работа',
      about: 'О художнице',
      contacts: 'Контакты',
      privacy: 'Политика конфиденциальности',
      consent: 'Согласие на обработку персональных данных',
    },
    footer: {
      tagline: 'О человеке в цифровой среде. Картины, которые задают вопросы.',
      works: 'Работы',
      catalog: 'Каталог',
      series: 'Серии',
      aboutMe: 'Обо мне',
      aboutArtist: 'О художнице',
      manifesto: 'Манифест',
      useful: 'Полезное',
      contacts: 'Контакты',
      follow: 'Следить',
      copyright: '© 2026 Maiia Po. Все права защищены.',
      privacy: 'Политика конфиденциальности',
      consent: 'Согласие на обработку персональных данных',
      navAria: 'Навигация в подвале',
    },
    home: {
      heroLabel: 'ГЛАВНАЯ СЕРИЯ',
      heroDescription:
        'Серия о красоте, которая продолжает быть желанной, даже когда начинает ломаться.',
      heroCta: 'Смотреть серию',
      heroAria: 'Баннер серии',
      featuredLabel: 'каталог работ',
      featuredTitle: 'Каталог работ',
      featuredAll: 'Смотреть все работы',
      featuredMore: 'Смотреть работу',
      seriesLabel: 'Серия:',
      spotlightLabel: 'о художнице',
      spotlightLead: 'Я Майя По, разработчик и художница.',
      spotlightText:
        'Пишу о человеке в цифровой среде: о том, как код, экраны и алгоритмы меняют тело, память и ощущение себя.',
      spotlightCta: 'Подробнее о художнице',
    },
    works: {
      title: 'Работы',
      lead: 'Каждая работа исследует, как цифровая среда меняет человека.',
      all: 'Все работы',
      noSeries: 'Без серии',
      empty: 'Пока нет работ в этом фильтре',
      filtersAria: 'Фильтры',
      sort: 'Сортировка:',
      sortAria: 'Варианты сортировки',
      newest: 'Новинки',
      priceAsc: 'Сначала дешевле',
      priceDesc: 'Сначала дороже',
      viewWork: 'Смотреть работу',
      original: '[ оригинальная работа ]',
      fromSeries: 'Из серии',
      aboutWork: 'Описание работы',
      details: 'Детали',
      year: 'Год',
      medium: 'Техника',
      size: 'Размер',
      status: 'Статус',
      order: 'Заказать работу',
      orderLead: 'Оставьте свой контакт — и я вам напишу',
      orderContact: 'Ваш e-mail или Telegram',
      orderSend: 'Отправить',
      orderSending: 'Отправляю…',
      orderClose: 'Закрыть',
      orderSuccess: 'Спасибо! Сообщение отправлено.',
      orderError:
        'Не удалось отправить. Попробуйте еще раз или напишите на почту.',
      notFound: 'Работа не найдена',
      allWorks: '← Все работы',
      otherWorks: 'Другие работы серии',
      aboutSeries: 'О серии',
      cm: 'см',
      mediumCanvasOil: 'Холст, масло',
    },
    status: {
      available: 'Доступна',
      sold: 'Продана',
      reserved: 'Зарезервирована',
      'in-progress': 'В работе',
    },
    series: {
      title: 'Серии',
      labelBracket: 'серии',
      slogan: ['Искусство о том,', 'как цифровая среда', 'меняет человека'],
      lead: 'Каждая серия — отдельное исследование цифровой среды.',
      viewSeries: 'Смотреть серию',
      status: 'Статус',
      years: 'Годы',
      medium: 'Техника',
      worksCount: 'Количество работ',
      works: 'Работы',
      statusReady: 'Готова',
      statusInProgress: 'В работе',
      label: 'серия',
      notFound: 'Серия не найдена',
      allSeries: '← Все серии',
      aboutLabel: 'О серии',
      interiorTitle: 'В интерьере',
      interiorHeading: 'Картины в интерьере',
      interiorText: 'Картина меняет комнату. Комната меняет картину.',
      interiorLabel: 'Интерьер',
      interiorSeriesWorks: 'Работы серии',
      interiorPick: 'Выбрать работу',
      interiorPickWork: 'Выбор работы',
      interiorPrev: 'Предыдущее изображение',
      interiorNext: 'Следующее изображение',
      interiorInFrame: '{title} в интерьере, кадр {index}',
      process: 'Процесс',
      processTitle: 'Как собиралась серия',
      processText:
        'От первого наброска до момента, когда больше уже нечего исправлять',
      processSoonTitle: 'Скоро появится',
      processSoonText:
        'Новые кадры из мастерской, этапы и детали создания серии.',
      soon: 'Скоро появится',
    },
    about: {
      title: 'О художнице',
      education: 'Образование',
      educationText:
        'Высшее образование (педагогическое), ПГПУ, учитель русского языка и литературы, 2010',
      practice: 'Профессиональная практика',
      practiceText: 'Frontend-разработчик, UX/UI-дизайнер в IT-компании.',
      art: 'Художественная практика и концепция',
      artP1:
        'Занимаюсь живописью с 2017 года. Работаю с темами цифровой трансформации, идентичности и тела в меняющейся среде.',
      artP2:
        'Человек в моих работах — изменчивая структура, постоянно адаптирующаяся к информационному шуму, технологиям и необходимости становиться новой версией себя.',
      artP3:
        'Мой художественный язык сформирован опытом работы в IT и интерфейсах. Мне интересна точка, где логика сталкивается с интуицией, а ошибка или сбой становятся началом нового состояния.',
      quote: 'Живопись для меня — это способ зафиксировать момент трансформации.',
      metaPerm: '1988, Пермь',
      metaMoscow: 'Живу и работаю в Москве',
      manifesto: 'Манифест',
      close: 'Закрыть',
    },
    contacts: {
      label: 'контакты',
      titleLines: ['На', 'связи'],
      intro:
        'По вопросам приобретения работ, сотрудничества, выставок или просто, чтобы сказать привет.',
      formLead:
        'Если Вы хотите заказать работу, оставьте свой контакт — и я вам напишу.',
      placeholder: 'Ваш e-mail или Telegram',
      note: 'Обычно отвечаю в течение 1–2 дней.',
      send: 'Отправить',
      sending: 'Отправляю…',
      success: 'Спасибо! Сообщение отправлено.',
      error:
        'Не удалось отправить. Попробуйте еще раз или напишите на почту.',
      slogan: ['ИСКУССТВО', 'О НОВОЙ', 'ВЕРСИИ', 'ЧЕЛОВЕКА'],
    },
    legal: {
      revised: 'Редакция от {date}',
    },
  },
  en: {
    nav: {
      home: 'Home',
      series: 'Series',
      works: 'Works',
      about: 'About the artist',
      contacts: 'Contacts',
      aria: 'Main navigation',
    },
    lang: {
      aria: 'Language',
    },
    breadcrumbs: {
      aria: 'Breadcrumbs',
      home: 'Home',
      series: 'Series',
      seriesFallback: 'Series',
      works: 'Works',
      workFallback: 'Work',
      about: 'About the artist',
      contacts: 'Contacts',
      privacy: 'Privacy Policy',
      consent: 'Personal Data Consent',
    },
    footer: {
      tagline:
        'About the human in the digital environment. Paintings that ask questions.',
      works: 'Works',
      catalog: 'Catalog',
      series: 'Series',
      aboutMe: 'About',
      aboutArtist: 'About the artist',
      manifesto: 'Manifesto',
      useful: 'Useful',
      contacts: 'Contacts',
      follow: 'Follow',
      copyright: '© 2026 Maiia Po. All rights reserved.',
      privacy: 'Privacy Policy',
      consent: 'Personal Data Consent',
      navAria: 'Footer navigation',
    },
    home: {
      heroLabel: 'FEATURED SERIES',
      heroDescription:
        'A series about beauty that remains desirable even as it begins to break.',
      heroCta: 'View series',
      heroAria: 'Series banner',
      featuredLabel: 'works catalog',
      featuredTitle: 'Works catalog',
      featuredAll: 'View all works',
      featuredMore: 'View work',
      seriesLabel: 'Series:',
      spotlightLabel: 'about the artist',
      spotlightLead: 'I am Maiia Po, a developer and artist.',
      spotlightText:
        'I write about the human in the digital environment: how code, screens, and algorithms change the body, memory, and the sense of self.',
      spotlightCta: 'More about the artist',
    },
    works: {
      title: 'Works',
      lead: 'Each work explores how the digital environment transforms the human.',
      all: 'All works',
      noSeries: 'No series',
      empty: 'No works in this filter yet',
      filtersAria: 'Filters',
      sort: 'Sort:',
      sortAria: 'Sort options',
      newest: 'Newest',
      priceAsc: 'Price: low to high',
      priceDesc: 'Price: high to low',
      viewWork: 'View work',
      original: '[ original work ]',
      fromSeries: 'From the series',
      aboutWork: 'Work description',
      details: 'Details',
      year: 'Year',
      medium: 'Medium',
      size: 'Size',
      status: 'Status',
      order: 'Order work',
      orderLead: 'Leave your contact — and I will write back',
      orderContact: 'Your e-mail or Telegram',
      orderSend: 'Send',
      orderSending: 'Sending…',
      orderClose: 'Close',
      orderSuccess: 'Thank you! Your message has been sent.',
      orderError: 'Could not send. Please try again or write by e-mail.',
      notFound: 'Work not found',
      allWorks: '← All works',
      otherWorks: 'Other works in the series',
      aboutSeries: 'About the series',
      cm: 'cm',
      mediumCanvasOil: 'Canvas, oil',
    },
    status: {
      available: 'Available',
      sold: 'Sold',
      reserved: 'Reserved',
      'in-progress': 'In progress',
    },
    series: {
      title: 'Series',
      labelBracket: 'series',
      slogan: ['Art about how', 'the digital environment', 'changes the human'],
      lead: 'Each series is a separate study of the digital environment.',
      viewSeries: 'View series',
      status: 'Status',
      years: 'Years',
      medium: 'Medium',
      worksCount: 'Number of works',
      works: 'Works',
      statusReady: 'Ready',
      statusInProgress: 'In progress',
      label: 'series',
      notFound: 'Series not found',
      allSeries: '← All series',
      aboutLabel: 'About the series',
      interiorTitle: 'In interior',
      interiorHeading: 'Works in interior',
      interiorText: 'A painting changes the room. The room changes the painting.',
      interiorLabel: 'Interior',
      interiorSeriesWorks: 'Series works',
      interiorPick: 'Choose a work',
      interiorPickWork: 'Choose a work',
      interiorPrev: 'Previous image',
      interiorNext: 'Next image',
      interiorInFrame: '{title} in interior, frame {index}',
      process: 'Process',
      processTitle: 'How the series was made',
      processText:
        'From the first sketch to the moment when there is nothing left to fix',
      processSoonTitle: 'Coming soon',
      processSoonText:
        'New studio frames, stages, and details of creating the series.',
      soon: 'Coming soon',
    },
    about: {
      title: 'About the artist',
      education: 'Education',
      educationText:
        'Higher education (pedagogical), PGPU, teacher of Russian language and literature, 2010',
      practice: 'Professional practice',
      practiceText: 'Frontend developer, UX/UI designer at an IT company.',
      art: 'Artistic practice and concept',
      artP1:
        'I have been painting since 2017. I work with themes of digital transformation, identity, and the body in a changing environment.',
      artP2:
        'The human in my works is a mutable structure, constantly adapting to information noise, technology, and the need to become a new version of oneself.',
      artP3:
        'My visual language is shaped by experience in IT and interfaces. I am interested in the point where logic meets intuition, and an error or glitch becomes the beginning of a new state.',
      quote: 'Painting for me is a way to capture a moment of transformation.',
      metaPerm: '1988, Perm',
      metaMoscow: 'I live and work in Moscow',
      manifesto: 'Manifesto',
      close: 'Close',
    },
    contacts: {
      label: 'contacts',
      titleLines: ['Get', 'in touch'],
      intro:
        'For inquiries about acquiring works, collaboration, exhibitions, or simply to say hello.',
      formLead:
        'If you would like to order a work, leave your contact — and I will write back.',
      placeholder: 'Your e-mail or Telegram',
      note: 'I usually reply within 1–2 days.',
      send: 'Send',
      sending: 'Sending…',
      success: 'Thank you! Your message has been sent.',
      error: 'Could not send. Please try again or write by e-mail.',
      slogan: ['ART', 'ABOUT A NEW', 'VERSION', 'OF THE HUMAN'],
    },
    legal: {
      revised: 'Revised {date}',
    },
  },
} as const satisfies Record<Locale, Dict>

function getPath(dict: Dict, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in (acc as Dict)) {
      return (acc as Dict)[key]
    }
    return undefined
  }, dict)
}

export function translate(
  locale: Locale,
  path: string,
  params?: Record<string, string | number>,
): string {
  const value = getPath(messages[locale], path)
  const fallback = getPath(messages.ru, path)
  let text = typeof value === 'string' ? value : typeof fallback === 'string' ? fallback : path

  if (params) {
    for (const [key, param] of Object.entries(params)) {
      text = text.replace(`{${key}}`, String(param))
    }
  }

  return text
}

export function translateList(locale: Locale, path: string): string[] {
  const value = getPath(messages[locale], path)
  if (Array.isArray(value) && value.every((item) => typeof item === 'string')) {
    return value as string[]
  }
  const fallback = getPath(messages.ru, path)
  if (Array.isArray(fallback) && fallback.every((item) => typeof item === 'string')) {
    return fallback as string[]
  }
  return []
}
