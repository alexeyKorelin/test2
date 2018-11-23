import ruEntities from 'config/locales/ru-RU/entities.json';
import enEntities from 'config/locales/en/entities.json';
import ruSite from 'config/locales/ru-RU/site.json';
import enSite from 'config/locales/en/site.json';
import ruReasons from 'config/locales/ru-RU/reasons.json';
import enReasons from 'config/locales/en/reasons.json';

const locales = {
  data: {
    'ru-RU': { all: {...ruEntities, ...ruSite, ...ruReasons} },
    en: { all: {...enEntities, ...enSite, ...enReasons } }
  },
}

export default locales;
