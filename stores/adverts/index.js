import {types, getParent, destroy} from "mobx-state-tree";
import API from 'utils/api'
import Advert from './models';
import {parse} from 'query-string';
import {defaultPerPage} from 'utils/pagination';

const queryFromUrl = () => {
  try {
    return parse(document.location.search)['query']
  } catch (err) {
    return ''
  }
}

const AdvertsStore = types
  .model("AdvertsStore", {
    adverts: types.optional(types.array(Advert), []),
    per_page: types.optional(types.number, defaultPerPage),
    loading: types.optional(types.boolean, false),
    query: types.maybeNull(types.string),
    total: types.maybeNull(types.number),
    page: types.maybeNull(types.number),
    filter: types.frozen()
  })
  .preProcessSnapshot(snapshot => {
    return {
      ...snapshot,
      query: snapshot.query || queryFromUrl(),
    }
  })
  .views(self => ({
    get fetched () {
      return self.adverts && self.adverts.length > 0;
    },
    get category () {
      const parent = getParent(self);
      return parent && parent.slug;
    },
    get finished () {
      return self.total == self.adverts.length;
    }
  }))
  .actions(self => ({
    toogleLoading () {
      self.loading = !self.loading;
    },
    fetch(params = {}, callback) {
      self.toogleLoading();
      return new Promise((resolve, reject) => {
        const options = {
          ...params,
          ...self.filter,
          query: self.query,
          per_page: self.per_page,
          category: self.category
        };
        return API.adverts.index(options)
          .then(res => {
            if (callback) {
              callback.call(this, res)
            } else {
              self.fetchSuccess(res)
            }
            self.toogleLoading();
            resolve(res);
          }).catch(error => {
            self.toogleLoading();
            reject(error);
          })
      })
    },
    fetchSuccess (res) {
      self.adverts = res.data;
      self.total = res.total;
    },
    loadMore() {
      const page = self.adverts ? Math.ceil(self.adverts.length / self.per_page) + 1 : 1;
      self.fetch({page}, self.loadMoreSuccess);
    },
    loadMoreSuccess (res) {
      if (!self.adverts) self.adverts = [];
      self.adverts = self.adverts.concat(res.data);
      self.total = res.total;
    },
    setQuery (query) {
      self.query = query;
    },
    reset () {
      self.adverts = [];
    },
    touch() {
      self.touched = true;
    },
    resetFilter() {
      self.filter = null;
      self.touched = false;
      self.fields.forEach(field => {
        if (field.slug == 'coin') {
          field.value = [];
        }
        if (field.slug == 'price') {
          field.value = null
        }
        if (field.type == 'checkbox') {
          field.value = false;
        }
        if (field.type == 'list') {
          field.value = [];
        }
        if (field.type == 'number' || field.type == 'floating') {
          field.value = null
        }
      })
      self.fetch();
    },
    applyFilter (filter = {}) {
      self.adverts = [];
      self.filter = filter;
      self.fetch();
    },
    deleteAdvert (uid) {
      if (self.fetched) {
        const advert = self.adverts.find(advert => advert.uid == uid);

        advert && destroy(advert);
      }
    }
  }));

export default AdvertsStore;
