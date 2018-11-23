import {types} from "mobx-state-tree";
import API from 'utils/api';
import Advert from '../adverts/models';

const FavoritesStore = types
  .model("FavoritesStore", {
    adverts: types.maybeNull(types.array(Advert))
  })
  .views(self => ({
    get fetched () {
      return self.adverts && self.adverts.length>0;
    }
  }))
  .actions(self => ({
    post (uid) {
      return new Promise((resolve, reject) => {
        API.favorites.post(uid)
          .then((res) => {
            self.fetchAdvert(uid);
            resolve(res);
          }).catch(error => {
            reject(error);
          })
        })
    },
    delete (uid) {
      return new Promise((resolve, reject) => {
        API.favorites.delete(uid)
          .then((res) => {
            self.removeAdvert(uid);
            resolve(res);
          }).catch(error => {
            reject(error);
          })
        })
    },
    fetchAdvert (uid) {
      API.adverts.get(uid)
        .then(advert => self.fetchAdvertSuccess(advert))
    },
    removeAdvert (uid) {
      self.adverts.splice(self.adverts.findIndex(advert => advert.uid === uid), 1);
    },
    fetchAdvertSuccess (advert) {
      self.adverts.push(Advert.create(advert));
    },
    fetch (liked_ids) {
      if (liked_ids.length>0) {
        liked_ids.map(item => self.fetchAdvert(item));
      }
    }
  }))

export default FavoritesStore;
