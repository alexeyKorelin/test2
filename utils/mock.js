import Settings from 'config';

/* Texts */

/* About */
export const aboutPage = {
  'pc': {
    title: ``,
    description: ``
  },
  'mobile': {
    title: `Что такое MentalMarket`,
    description: `Это не просто доска объявлений, а\u00A0цифровая экосистема, предоставляющая пользователям полноценную инфраструктуру для совершения сделок за\u00A0криптовалюту. На площадке размещено более 1000 актуальных предложений различных товаров и услуг со всего СНГ. Наша миссия - Сделать ежедневное применение криптовалюты таким же привычным и простым, как и\u00A0использование банковских карточек`
  }
}

/* Landing */
export const main = {
  'title': 'MentalMarket',
  'description': '— цифровая экосистема покупки и продажи товаров<br />и\u00A0услуг за криптовалюту'
}

export const about = {
  'pc': {
    'title': 'О MentalMarket',
    'description': 'Это не просто доска объявлений, а\u00A0цифровая экосистема, предоставляющая пользователям полноценную инфраструктуру для совершения сделок за\u00A0криптовалюту. На площадке размещено более 1000 актуальных предложений различных товаров и услуг со всего СНГ. Наша миссия - Сделать ежедневное применение криптовалюты таким же привычным и простым, как и\u00A0использование банковских карточек',
    'advs': [
      {
        src: `${Settings.assetHost}/uploads/advs/about-adv-2.svg`,
        title: 'Широкий ассортимент',
        description: 'Пользователи сообщества ежедневно генерируют предложения товаров и услуг, что позволяет найти на площадке практически все'
      },
      {
        src: `${Settings.assetHost}/landing/adv-2.svg`,
        title: 'Прогрессивность',
        description: 'Оптимизируем пользовательские бизнес-процессы за счет многоуровневой интеграции с Telegram'
      },
      {
        src: `${Settings.assetHost}/landing/adv-3.svg`,
        title: 'Удобство',
        description: 'Вы не сделаете лишнего клика — мы убрали все лишние действия, оставив только самые необходимые'
      },
      {
        src: `${Settings.assetHost}/landing/adv-4.svg`,
        title: 'Безопасность',
        description: 'Используем только Telegram, что делает невозможным передачу персональных данных третьей стороне'
      }
    ]
  },
  mobile: {
    'title': 'О MentalMarket',
    'description': 'Это не просто доска объявлений, а\u00A0цифровая экосистема, предоставляющая пользователям полноценную инфраструктуру для\u00A0совершения сделок за\u00A0криптовалюту',
    'advs': [
      {
        src: `${Settings.assetHost}/uploads/advs/about-adv-2.svg`,
        title: 'Широкий ассортимент',
        description: 'Пользователи сообщества ежедневно генерируют предложения товаров и\u00A0услуг, что позволяет найти на\u00A0площадке практически все'
      },
      {
        src: `${Settings.assetHost}/landing/adv-2.svg`,
        title: 'Прогрессивность',
        description: 'Оптимизируем пользовательские бизнес-процессы за счет многоуровневой интеграции с\u00A0Telegram',
      },
      {
        src: `${Settings.assetHost}/landing/adv-3.svg`,
        title: 'Удобство',
        description: 'Вы не сделаете лишнего клика — мы\u00A0убрали все лишние действия, оставив только самые необходимые'
      },
      {
        src: `${Settings.assetHost}/landing/adv-4.svg`,
        title: 'Безопасность',
        description: 'Используем только Telegram, что\u00A0делает невозможным передачу персональных данных третьей стороне'
      }
    ],
    postText: 'Наша миссия — сделать ежедневное применение криптовалюты таким же привычным и\u00A0простым, как\u00A0и\u00A0использование банковских карточек'
  }
}

export const catalog = {
  pc: {
    'title': 'Просто и удобно',
    'description': 'Мы распределили товары и услуги по удобным категориям и продумали интуитивный поиск'
  }
}

export const works = {
  pc: {
    'title': '3 простых шага',
    'description': 'Все действия на MentalMarket продуманы до мельчайших деталей и\u00A0оптимизированы под пользователя.<br />Процесс поиска и\u00A0подачи объявления доведен до\u00A0нескольких простых\u00A0шагов',
    'steps': [
      {
        src: `${Settings.assetHost}/landing/works-1.png`,
        title: 'Авторизация',
        description: 'В один клик с помощью Telegram. Ничего лишнего, просто напишите боту, получите код и\u00A0используйте его. Поздравляем, Вы стали частью MentalMarket',
        button: false
      },
      {
        src: `${Settings.assetHost}/landing/works-2.png`,
        title: 'Действия',
        description: 'Все действия на MentalMarket продуманы до\u00A0мельчайших деталей и\u00A0оптимизированы под\u00A0пользователя. Процесс поиска и подачи объявления доведен до нескольких простых\u00A0шагов',
        button: false,
        left: true
      },
      {
        src: `${Settings.assetHost}/landing/works-3.png`,
        title: 'Результат',
        description: 'Находите и продавайте нужные товары и услуги. Совершайте сделки самостоятельно или при поддержке MentalMarket',
        button: true
      }
    ]
  },
  mobile: {
    'title': 'Как работает',
    'description': 'Все действия на MentalMarket продуманы до мельчайших деталей и\u00A0оптимизированы под пользователя.<br />Процесс поиска и подачи объявления доведен до нескольких простых\u00A0шагов',
    'steps': [
      {
        image: {
          file: `${Settings.assetHost}/landing/step-1-sm`,
          type: 'png'
        },
        title: 'Авторизация',
        description: 'В один клик с помощью Telegram. Ничего лишнего, просто напишите боту, получите код и\u00A0используйте его. Поздравляем, Вы\u00A0стали частью MentalMarket',
        button: false
      },
      {
        image: {
          file: `${Settings.assetHost}/landing/step-2-sm`,
          type: 'png'
        },
        title: 'Действия',
        description: 'Все действия на MentalMarket продуманы до\u00A0мельчайших деталей и\u00A0оптимизированы под\u00A0пользователя. Процесс поиска и подачи объявления доведен до нескольких простых\u00A0шагов',
        button: false,
        left: true
      },
      {
        image: {
          file: `${Settings.assetHost}/landing/step-3-sm`,
          type: 'png'
        },
        title: 'Результат',
        description: 'Находите и продавайте нужные товары и\u00A0услуги. Совершайте сделки самостоятельно или при поддержке MentalMarket',
        button: true
      }
    ]
  }
}

export const live = {
  title: 'Уникальный и живой контент',
  description: 'Единомышленники, число которых превышает уже 20 тысяч, ежедневно пользуются MentalMarket, создавая<br />уникальные предложения товаров и услуг на нашем сайте и Telegram-канале. Именно сообщество MentalMarket<br />является местом, куда пользователи обращается за по-настоящему актуальным контентом. В эко-системе<br />MentalMarket совершено уже более 500 сделок, и их количество растёт ежедневно'
}

export const advantages = {
  pc: {
    title: 'Преимущества',
    buyer: [
      {
        src: `${Settings.assetHost}/uploads/advs/about-adv-1.svg`,
        title: 'Никаких комиссий',
        description:
          `Используя MentalMarket не нужно<br />
          продавать криптовалюту, платить<br />
          процент и подвергать себя риску,<br />
          чтобы приобрести товар`
      },
      {
        src: `${Settings.assetHost}/uploads/advs/about-adv-2.svg`,
        title: 'Ассортимент товара',
        description:
          `Ежедневно консолидируем<br />
          актуальные предложения<br />
          в одном месте`
      },
      {
        src: `${Settings.assetHost}/uploads/advs/about-adv-3.svg`,
        title: 'Безопасные сделки',
        description:
          `Осуществляйте сделки даже<br />
          не встречаясь с продавцом,<br />
          проект берет на себя функцию<br />
          гаранта сделки`,
        soon: true
      },
      {
        src: `${Settings.assetHost}/uploads/advs/about-adv-4.svg`,
        title: 'Система рейтинга',
        description:
          `Используйте рейтинг<br />
          продавца, чтобы быть<br />
          уверенным в качестве товара<br />
          или услуги`,
        soon: true
      }
    ],
    seller: [
      {
        src: `${Settings.assetHost}/uploads/advs/about-adv-5.svg`,
        title: 'Интеграция с Telegram',
        description:
          `Взаимодействуйте с MentalMarket<br />
          и покупателями в одном<br />
          приложении`
      },
      {
        src: `${Settings.assetHost}/uploads/advs/about-adv-6.svg`,
        title: 'Новый канал продаж',
        description:
          `Создайте эффективный канал<br />
          продаж для работы с новым<br />
          типом клиентов`
      },
      {
        src: `${Settings.assetHost}/uploads/advs/about-adv-7.svg`,
        title: 'Система развития компаний',
        description:
          `Формируйте лояльность<br />
          покупателей за счет расширенного<br />
          функционала и адаптивной<br />
          системы продвижения`,
        soon: true
      },
      {
        src: `${Settings.assetHost}/uploads/advs/about-adv-4.svg`,
        title: 'Система рейтинга',
        description:
          `Увеличивайте продажи<br />
          товаров за счет повышенного<br />
          к вам доверия покупателей`,
        soon: true
      }
    ],
    description: 'И самое главное — используйте экосистему MentalMarket<br />для ежедневного применения криптовалюты'
  },
  mobile: {
    title: 'Преимущества',
    buyer: [
      {
        src: `${Settings.assetHost}/uploads/advs/about-adv-1.svg`,
        title: 'Никаких комиссий',
        description:
          `Используя MentalMarket не нужно<br />
          продавать криптовалюту, платить<br />
          процент и подвергать себя риску,<br />
          чтобы приобрести товар`
      },
      {
        src: `${Settings.assetHost}/uploads/advs/about-adv-2.svg`,
        title: 'Ассортимент товара',
        description:
          `Ежедневно консолидируем<br />
          актуальные предложения<br />
          в одном месте`
      },
      {
        src: `${Settings.assetHost}/uploads/advs/about-adv-3.svg`,
        title: 'Безопасные сделки',
        description:
          `Осуществляйте сделки даже<br />
          не встречаясь с продавцом,<br />
          проект берет на себя функцию<br />
          гаранта сделки`,
        soon: true
      },
      {
        src: `${Settings.assetHost}/uploads/advs/about-adv-4.svg`,
        title: 'Система рейтинга',
        description:
          `Используйте рейтинг<br />
          продавца, чтобы быть<br />
          уверенным в качестве товара<br />
          или услуги`,
        soon: true
      }
    ],
    seller: [
      {
        src: `${Settings.assetHost}/uploads/advs/about-adv-5.svg`,
        title: 'Интеграция с Telegram',
        description:
          `Взаимодействуйте с MentalMarket<br />
          и покупателями в одном<br />
          приложении`
      },
      {
        src: `${Settings.assetHost}/uploads/advs/about-adv-6.svg`,
        title: 'Новый канал продаж',
        description:
          `Создайте эффективный канал<br />
          продаж для работы с новым<br />
          типом клиентов`
      },
      {
        src: `${Settings.assetHost}/uploads/advs/about-adv-7.svg`,
        title: 'Система развития компаний',
        description:
          `Формируйте лояльность<br />
          покупателей за счет расширенного<br />
          функционала и адаптивной<br />
          системы продвижения`,
        soon: true
      },
      {
        src: `${Settings.assetHost}/uploads/advs/about-adv-4.svg`,
        title: 'Система рейтинга',
        description:
          `Увеличивайте продажи<br />
          товаров за счет повышенного<br />
          к вам доверия покупателей`,
        soon: true
      }
    ],
    description: 'И самое главное — используйте экосистему<br />MentalMarket для ежедневного<br />применения криптовалюты'
  },
};

export const events = {
  pc: {
    title: 'Оставайтесь в курсе событий',
    description:
      `На нашем Telegram-канале мы ежедневно публикуем самые интересные объявления,<br />
      еженедельно издаем авторскую новостную подборку по использованию криптовалют<br />
      в мире и составляем рейтинг самых необычных и примечательных лотов`,
    postText:
      `Актуально для тех, кто хочет сфокусировать свое внимание только на самом важном`
  },
  mobile: {
    title: 'Оставайтесь в курсе событий',
    description: `На нашем Telegram-канале мы ежедневно публикуем самые интересные объявления, еженедельно издаем авторскую новостную подборку по использованию криптовалют в мире и\u00A0составляем рейтинг самых необычных и\u00A0примечательных лотов`,
    postText:
      `Актуально для тех, кто хочет сфокусировать свое внимание только на самом важном`
  }
}

export const months = [
  {
    title: 'Январь',
    description:
    [
      'Запуск Telegram канала<br />MentalMarket'
    ],
    cardStyle: {
      top: '132px',
      left: '24px'
    },
    marker: {
      l: 1
    }
  },
  {
    title: 'Февраль',
    description:
    [
      'Создание Telegram бота для публикации<br />и поиска объявлений на канале Telegram'
    ],
    cardStyle: {
      bottom: '-55px',
      left: '30px'
    },
    marker: {
      l: 1
    }
  },
  {
    title: 'Март',
    description:
    [
      `Разработка стратегии развития проекта`,
      `CheckPoints:<br />
        \u00A0\u00A0• 10 000 пользователей<br />
        \u00A0\u00A0• 350 объявлений`
    ],
    cardStyle: {
      top: '176px',
      left: '164px',
      maxWidth: '230px'
    },
    marker: {
      l: 1
    }
  },
  {
    title: 'Апрель',
    description:
    [
      `Старт разработки web-версии проекта`,
      `Расширение географии пользователей<br />до стран СНГ`
    ],
    cardStyle: {
      bottom: '-128px',
      left: '247px'
    },
    marker: {
      l: 1
    }
  },
  {
    title: 'Май',
    description:
    [
      `Выпуск Beta-версии`,
      `Интеграция с Telegram: авторизация<br />пользователей / отправка уведомлений<br />пользователям о статусах<br />объявлений`
    ],
    cardStyle: {
      top: '265px',
      left: '339px'
    },
    marker: {
      l: 1
    }
  },
  {
    title: 'Июнь',
    description:
    [
      `Запуск рабочей web-версии проекта`,
      `CheckPoints:<br />
      \u00A0\u00A0• 20 000 пользователей<br />
      \u00A0\u00A0• 1000 объявлений`,
      `Выпуск Whitepaper и сопутствующей<br />документации проекта`
    ],
    cardStyle: {
      bottom: '-211px',
      left: '460px'
    },
    marker: {
      l: 1
    }
  },
  {
    title: 'Июль',
    description:
    [
      `Private Sale ICO MentalMarket`,
      `Создание раздела &laquo;Резюме/Вакансии&raquo;`,
      `Внедрение системы AML/KYC`
    ],
    cardStyle: {
      top: '323px',
      left: '572px',
      maxWidth: '232px'
    },
    marker: {
      l: 1
    }
  },
  {
    title: 'Август',
    description:
    [
      `Старт Pre-ICO MentalMarket`,
      `Внедрение внутренней системы рейтингов<br />для продавцов и покупателей`,
      `Внедрение функционала &laquo;Безопасная сделка&raquo;,<br />работающего на смарт-контрактах`
    ],
    cardStyle: {
      bottom: '-239px',
      left: '662px',
      maxWidth: '250px'
    },
    marker: {
      l: 1
    }
  },
  {
    title: 'Сентябрь',
    description:
    [
      `Запуск площадки в Европе`,
      `Запуск системы премиального размещения объявлений`,
      `Внедрение системы продвижения магазинов`
    ],
    cardStyle: {
      top: '322px',
      left: '798px',
      maxWidth: '195px'
    },
    marker: {
      l: 1
    }
  },
  {
    title: 'Октябрь',
    description:
    [
      `Старт ICO MentalMarket`,
      `Выпуск приложения<br />для IOS`,
      ``
    ],
    cardStyle: {
      bottom: '-204px',
      left: '878px',
      maxWidth: '186px'
    },
    marker: {
      l: 1
    }
  },
  {
    title: 'Ноябрь',
    description:
    [
      `Запуск площадки в Азии`,
      `Выпуск приложения для Android`,
      ``
    ],
    cardStyle: {
      top: '249px',
      left: '977px'
    },
    marker: {
      l: 1
    }
  },
  {
    title: 'Декабрь',
    description:
    [
      `Окончание ICO`,
      `Интеграция с системой<br />TON (Telegram)`
    ],
    cardStyle: {
      bottom: '-121px',
      left: '1030px'
    },
    marker: {
      l: 1
    }
  }
];

export const quarters = [
  {
    'title': 'I',
    'description': [
      `Запуск Telegram канала MentalMarket`,
      `Достижение аудитории в 10 000 пользователей`,
      `Разработка стратегии развития проекта`
    ]
  },
  {
    'title': 'II',
    'description': [
      `Запуск мобильной и web-версии проекта`,
      `Подготовка к ICO и выпуск сопутствующей документации проекта`,
      `Достижение аудитории в 20 000 пользователей`
    ]
  },
  {
    'title': 'III',
    'description': [
      `Начало ICO`,
      `Внедрение функционала &laquo;Безопасная сделка&raquo;`,
      `Внедрение внутренней системы рейтингов для продавцов и покупателей`,
      `Внедрение системы продвижения магазинов и объявлений`
    ]
  },
  {
    'title': 'IV',
    'description': [
      `Выпуск приложения для IOS и Android`,
      `Выход на рынки стран Азии и Европы`,
      `Начало интеграции с системой TON (Telegram)`,
      `Окончание ICO`
    ]
  }
];

export const persons = [
  {
    image: {
      file: `${Settings.assetHost}/landing/person-1-sm`,
      type: 'png'
    },
    title: 'Для владельцев криптовалют',
    description:
    `Для тех, кто хочет потратить<br />
    накопленную криптовалюту<br />
    для покупки товаров и услуг`
  },
  {
    image: {
      file: `${Settings.assetHost}/landing/person-2-sm`,
      type: 'png'
    },
    title: 'Для владельцев бизнеса',
    description:
    `Для тех, кто хочет запустить<br />
    новый канал продаж<br />
    на быстрорастущем рынке`
  },
  {
    image: {
      file: `${Settings.assetHost}/landing/person-3-sm`,
      type: 'png'
    },
    title: 'Для частных лиц',
    description:
    `Для тех, кто хочет получить<br />
    криптовалюту, продав<br />
    ненужные вещи`
  },
  {
    image: {
      file: `${Settings.assetHost}/landing/person-4-sm`,
      type: 'png'
    },
    title: 'Для инвесторов',
    description:
    `Для тех, кто хочет<br />
    инвестировать в развитие<br />
    MentalMarket`
  }
];

export const final = {
  pc: {
    title: 'MentalMarket',
    description: 'Думай прогрессивно. Всегда.'
  },
  mobile: {
    title: 'MentalMarket',
    description: 'Думай прогрессивно. Всегда.'
  }
}
