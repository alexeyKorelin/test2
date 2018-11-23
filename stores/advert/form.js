import {types} from "mobx-state-tree";
import API from 'utils/api';
import Advert from '../adverts/models';
import Field from '../fields/models';
import {Router} from 'routes';

const AdvertForm = types
  .model("AdvertForm", {
    advert: types.maybeNull(Advert),
  })
  .preProcessSnapshot(snapshot => {
    return ({
      ...snapshot,
    })
  })
  .actions(self => ({
    fetch (uid) {
      self.advert = null;
      API.adverts.get(uid)
        .then(advert => self.fetchSuccess(advert))
        .catch(error => {
          if (error.response.status == 404) {
            Router.pushRoute('/')
          }
        });
    },
    fetchSuccess (advert) {
      self.advert = Advert.create(advert);
    },
    create (params) {
      return new Promise((resolve, reject) => {
        API.adverts.create(params)
          .then(advert => {
            self.createAdvertSuccess(advert);
            resolve(self.advert);
          })
          .catch(error => {
            console.error(error);
          })
      });
    },
    createAdvertSuccess (advert) {
      self.advert = Advert.create({...advert, saved: false});
    }
  }));

export default AdvertForm;
