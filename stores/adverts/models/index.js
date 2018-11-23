import {types, getRoot, destroy, detach, applySnapshot, getParent} from "mobx-state-tree";
import _compact from 'lodash/compact';
import _sortBy from 'lodash/sortBy';
import _intersection from 'lodash/intersection';
import {obtainDate} from 'utils/utils';
import {Router} from 'routes';
import API from 'utils/api';
import moment from 'moment';
import Price from './price';
import Image from './image';
import Field from 'stores/fields/models';
import User from 'stores/auth/models/user';
import Shop from 'stores/shops/models';
import Version from './version';
import {statuses} from './mock.js';

const Advert = types
  .model("Advert", {
    name: types.maybeNull(types.string),
    uid: types.identifier,
    coin: types.maybeNull(types.string),
    category_slug: types.maybeNull(types.string),
    subcategory_slug: types.maybeNull(types.string),
    avatar: types.maybeNull(Image),
    status: types.maybeNull(types.string),
    coin_price: types.maybeNull(types.number),
    price: types.maybeNull(types.number),
    prices: types.maybeNull(types.array(Price)),
    usd_price: types.maybeNull(types.number),
    images: types.maybeNull(types.array(Image)),
    fields: types.maybeNull(types.array(Field)),
    description: types.maybeNull(types.string),
    meta: types.frozen(),
    published_at: types.maybeNull(types.Date),
    saved: types.optional(types.boolean, false),
    indexing: types.optional(types.boolean, false),
    locale: types.maybeNull(types.string),
    versions: types.maybeNull(types.array(Version)),
    owner: types.maybeNull(types.late(() => {
      return types.union({
        dispatcher: (snapshot) => {
          if (snapshot && snapshot.domain) {
            return Shop;
          }
          return User;
        }
      })
    })),
    owner_id: types.maybeNull(types.number),
    owner_type: types.maybeNull(types.string)
  })
  .views(self => ({
    get place() {
      return _compact([self.meta.country, self.meta.city]).join(', ');
    },
    get currentPrice () {
      const priceObject = self.prices.find(p => p.coin == self.currentCoin);
      if (priceObject) return priceObject.value;
      return self.price;
    },
    get currentCoin () {
      const parent = getParent(getParent(getParent(self)));
      if (parent.$treenode.type.name == "Category") {
        const filterCoins = parent.fields_store.fields[0].value;
        const coins = self.prices.map(p => p.coin);
        const sameCoin = _intersection(coins, filterCoins)[0];
        if (sameCoin) return sameCoin;
      }
      return self.coin;
    },
    get url() {
      return `/${self.category_slug}/${self.subcategory_slug}/ad/${self.uid}`;
    },
    get editUrl () {
      return `/edit_ad/${self.uid}`;
    },
    get subcategoryName () {
      return self.subcategory.name;
    },
    get category () {
      const {categories} = getRoot(self).categories;
      return categories.find(c => c.slug == self.category_slug);
    },
    get subcategory () {
      return self.category.children.find(c => c.slug == self.subcategory_slug);
    },
    get date () {
      return self.published_at ? moment(obtainDate(self.published_at)).format('DD.MM.YYYY') : null;
    },
    get fullStatus () {
      const root = getRoot(self);

      return {
        ...statuses.find(fullStatus => fullStatus.slug == self.status),
        name: root.locales.t(`statuses.${self.status}`)
      };
    },
    get isActive () {
      return self.status === 'active';
    },
    get isArchived () {
      return self.status === 'archived';
    }
  }))
  .actions(self => ({
    applyChanges (options={}) {
      Object.keys(options).forEach(key => {
        if (key != 'meta') {
          self[key] = options[key];
        }
      })
    },
    applyMetaChanges (options = {}) {
      const newMeta = { ...self.meta };
      for (let key in options) {
        newMeta[key] = options[key];
      }
      self.meta = newMeta;
    },
    updateVersions (versions) {
      self.versions = versions.map(version => Version.create(version));
    },
    translate (locale) {
      return new Promise((resolve, reject) => {
        return API.adverts.translate(self.uid, locale)
          .then(ad => {
            const root = getRoot(getParent(getParent(self)));
            const {auth: {user}} = root;
            user && user.updateAdverts(ad);
            self.updateVersions(ad.versions);
            root.advertForm.fetchSuccess(ad);
            Router.pushRoute(`/edit_ad/${ad.uid}`);
            resolve(ad);
          }).catch(error => {
            reject(error);
          })
      });
    },
    delete () {
      return new Promise((resolve, reject) => {
        return API.adverts.delete(self.uid)
          .then(res => {
            const root = getRoot(self);
            const {auth, advert, categories, latestAdverts, searchAdverts, user} = root;
            auth.user && auth.user.deleteAdvert(self.uid);
            latestAdverts && latestAdverts.deleteAdvert(self.uid);
            searchAdverts.adverts_store && searchAdverts.adverts_store.deleteAdvert(self.uid);
            categories.deleteAdvert(self.uid);
            user.current && user.current.deleteAdvert(self.uid);
            Router.pushRoute('/ads');
            advert && advert.clear();
        }).catch(error => {
          reject(error);
        })
      })
    },
    goEdit (step) {
      const advertForm = getRoot(self).advertForm;
      if (self.fields && self.meta) {
        advertForm.fetchSuccess(self.toJSON());
        const url = step == 'price' ? (self.editUrl + '?step=prices') : self.editUrl;
        Router.pushRoute(url);
      } else {
        API.adverts.get(self.uid)
          .then(res => {
            applySnapshot(self, res);
            self.goEdit(step);
          });
      }
    },
    goVersion (locale) {
      const version = self.versions.find(version => version.locale == locale);
      if (version) Router.pushRoute(`/${self.category_slug}/${self.subcategory_slug}/ad/${version.uid}`);
    },
    archive (reason) {
      return API.adverts.archive(self.uid, reason)
        .then(res => {
          const root = getRoot(self);
          const {auth} = root;

          auth.user && auth.user.updateAdvert(res);
        })
    }
  }));

export default Advert;
