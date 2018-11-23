import {types, getRoot} from "mobx-state-tree";
import i18n from 'i18next';
import {cookie} from 'utils/utils';
import {languages} from 'utils/const';

const localeOptions = {
  load: languages,
  fallbackLng: 'ru-RU',
  ns: ['all'],
  defaultNS: 'all',
  debug: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
    format: (value, format, lng) => {
      if (format === 'uppercase') return value.toUpperCase()
      return value
    }
  },
  initImmediate: false,
};

const LocalesStore = types
  .model({
    data: types.frozen(),
    locale: types.maybeNull(types.string),
  }).extend(self => {
    let instance;

    return {
      views: {
        t (key, options = {}) {
          instance = instance || i18n.init({...localeOptions, resources: self.data, lng: self.locale})
          if (key) return self.locale && instance.t(key, options); // hack for update computed values
        },
        get languages () {
          return localeOptions.load;
        }
      },
      actions: {
        changeLanguage(lang) {
          cookie.set('locale', lang);
          instance.changeLanguage(lang);
          self.locale = lang;
          const root = getRoot(self);
        }
      }
    }
  })
  .preProcessSnapshot(snapshot => {
    if (snapshot) {
      const newSnapshot = {
        ...snapshot,
        locale: snapshot.locale ? snapshot.locale : 'ru-RU'
      }
      return newSnapshot;
    }
  })

export default LocalesStore;
