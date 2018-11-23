import {types, destroy} from "mobx-state-tree";
import API from 'utils/api';
import Advert from '../adverts/models';
import SameAdvertsStore from '../sameAdverts';

const AdvertStore = types
  .model("AdvertStore", {
    current: types.maybeNull(Advert),
    same_adverts_store: SameAdvertsStore
  })
  .actions(self => ({
    fetch (uid) {
      self.current = null;
      API.adverts.get(uid)
        .then(advert => self.fetchSuccess(advert));

      self.same_adverts_store.fetch(uid);
    },
    fetchSuccess (advert) {
      self.current = Advert.create(advert);
    },
    clear () {
      self.current = null;
      self.same_adverts_store = null;
    }
  }));

export default AdvertStore;
