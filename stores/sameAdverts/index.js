import {types} from "mobx-state-tree";
import API from 'utils/api'
import Advert from '../adverts/models';

const SameAdvertsStore = types
  .model("SameAdvertsStore", {
    adverts: types.maybeNull(types.array(Advert))
  })
  .preProcessSnapshot(snapshot => {
    const newSnapshot = {...snapshot};
    if (!newSnapshot.adverts) newSnapshot.adverts = [];
    return newSnapshot;
  })
  .views(self => ({
    get fetched () {
      return self.adverts && self.adverts.length > 0
    }
  }))
  .actions(self => ({
    fetchSuccess(adverts) {
      self.adverts = adverts.map(a => Advert.create(a));
    },
    fetch(uid) {
      self.adverts = null;

      return new Promise((resolve, reject) => {
        return API.sameAdverts.index(uid).then(res => {
          self.fetchSuccess(res);
          resolve(res);
        }).catch(error => {
          reject(error);
        })
      })
    }
  }));

export default SameAdvertsStore;
