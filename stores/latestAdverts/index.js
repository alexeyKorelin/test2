import {types, destroy} from "mobx-state-tree";
import API from 'utils/api'
import Advert from '../adverts/models';

const LatestAdvertsStore = types
  .model("LatestAdvertsStore", {
    adverts: types.optional(types.array(Advert), []),
    per_page: types.optional(types.number, 15),
    total: types.maybeNull(types.number),
    loading: types.optional(types.boolean, false),
  }).views(self => ({
    get fetched () {
      return self.adverts && self.adverts.length > 0;
    },
    get finished () {
      return self.total == self.adverts.length;
    }
  }))
  .actions(self => ({
    preFetch() {
      self.loading = true;
    },
    afterFetch() {
      self.loading = false;
    },
    fetch(params = {}, callback) {
      self.preFetch();
      return new Promise((resolve, reject) => {
        const options = {
          ...params,
          per_page: self.per_page
        };
        return API.latestAdverts.index(options)
          .then(res => {
            self.loadMoreSuccess(res);
            self.afterFetch();
            resolve(res);
          }).catch(error => {
            self.afterFetch();
            reject(error);
          })
      })
    },
    loadMore() {
      const page = Math.ceil(self.adverts.length / self.per_page) + 1;
      self.fetch({page});
    },
    loadMoreSuccess (res) {
      self.adverts = self.adverts.concat(res.data);
      self.total = res.total;
    },
    deleteAdvert(uid) {
      if (self.fetched) {
        const advert = self.adverts.find(advert => advert.uid == uid);
        advert && destroy(advert);
      }
    }
  }));

export default LatestAdvertsStore;
