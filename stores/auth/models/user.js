import {types, applySnapshot, destroy, getRoot} from "mobx-state-tree";
import API from 'utils/api';
import {obtainDate} from 'utils/utils';
import {Router} from 'routes';
import moment from 'moment';
import FavoritesStore from '../../favorites';
import Advert from '../../adverts/models';
import Shop from '../../shops/models';

const User = types
  .model("User", {
    first_name: types.maybeNull(types.string),
    last_name: types.maybeNull(types.string),
    avatar: types.maybeNull(types.string),
    username: types.maybeNull(types.string),
    description: types.maybeNull(types.string),
    active: types.maybeNull(types.boolean),
    liked_ids: types.maybeNull(types.array(types.string)),
    adverts: types.maybeNull(types.array(Advert)),
    liked_store: types.maybeNull(FavoritesStore),
    status: types.maybeNull(types.string),
    since: types.maybeNull(types.Date),
    hidden: types.maybeNull(types.boolean),
    wallet: types.maybeNull(types.string),
    shops: types.maybeNull(types.array(Shop))
  })
  .preProcessSnapshot(snapshot => {
    if (snapshot) {
      const newSnapshot = {
        ...snapshot,
        liked_store: FavoritesStore.create({adverts: []}),
        since: obtainDate(snapshot.since)
      }
      return newSnapshot
    }
  })
  .views(self => ({    
    get date () {
      return self.since ? moment(self.since).format('DD.MM.YYYY') : null;
    },
    get advertsFetched () {
      return self.adverts && self.adverts.length > 0;
    },
    get shopsFetched () {
      return self.shops && self.shops.length > 0;
    },
    get url() {
      return `/users/${self.username}`;
    },
    get tg() {
      return `tg://resolve?domain=${self.username}`;
    },
    get name() {
      let name = '';

      if (self.username) name += self.username;
      if (!name) {
        if (self.first_name) name += self.first_name;
        if (self.last_name) name += ' ' + self.last_name;        
      }  

      return name;
    },
    get fullname() {
      let fullname = '';

      if (self.first_name) fullname += self.first_name;
      if (self.last_name) fullname += ' ' + self.last_name;
      
      return fullname ? fullname : self.username 
    },
    get shortname() {
      let shortname = '';

      if (self.first_name) shortname += self.first_name[0];
      if (self.last_name) shortname += self.last_name[0];
      if (!shortname) shortname += self.username && self.username[0];
    
      return shortname;
    },
    isLiked (uid) {
      return self.liked_ids.includes(uid);
    },
    isAdverts(username) {
      return self.username === username;
    },
    isShops(domain) {
      if (self.shopsFetched) {
        return !!self.shops.find(s => s.domain === domain);
      } else {
        return false;
      }
    },
    isActive(uid) {
      const advert = self.adverts.find(advert => advert.uid === uid);

      return advert.status == 'active';
    },
    isActiveAdvert(uid) {
      return self.isAdverts(uid) && self.isActive(uid);
    },
    advert(uid) {
      return self.adverts.find(advert => advert.uid === uid);
    },
    advertShop(uid) {
      let advert = false;
      for (let shop of self.shops) {
        advert = shop.adverts.find(advert => advert.uid === uid)
        if (advert) break;
      }
      return advert;
    }
  }))
  .actions(self => ({
    fetchLikedStore () {
      self.liked_store.fetch(self.liked_ids);
    },
    updateLikedStore (uid) {
      if (!self.liked_store.fetched) {
        self.fetchLikedStore();
      };

      if (self.isLiked(uid)) {
        self.liked_ids.remove(uid);
        self.liked_store.delete(uid);
      } else {
        self.liked_store.post(uid)
          .then(res => {
            self.addLikedId(uid);
          }).catch(res => {
            if (res.errors && res.errors.advert) {
              alert(res.errors.advert[0])
            }
          });
      };
    },
    addLikedId (uid) {
      self.liked_ids.push(uid);
    },
    deleteAdvert (uid) {
      const advert = self.adverts.find(a => a.uid == uid);

      advert && destroy(advert);
    },
    updateAdvert (advert) {
      const oldAdvert = self.adverts.find(a => a.uid == advert.uid);
      if (oldAdvert) {
        applySnapshot(oldAdvert, advert);
      } else {
        self.updateAdverts(advert);
      }
    },
    updateAdverts (advert) {
      if (advert.owner.$treenode.type.name == "Shop") {
        const shop = self.shops.find(s => s.domain === advert.owner.domain);
        shop.adverts = shop.adverts.concat(Advert.create(advert));
      } else {
        self.adverts = self.adverts.concat(Advert.create(advert));
      }
    },
    updateInfoSuccess (params) {
      self.description = params.description;
      self.hidden = params.hidden;
    },
    updateInfo (params) {
      return new Promise((resolve, reject) => {
        return API.users.updateInfo(params).then(res => {
          self.updateInfoSuccess(params);
          resolve(res);
        }).catch(error => {
          reject(error);
        })
      })
    },
    updateWalletSuccess (params) {
      self.wallet = params.wallet;
    },
    updateWallet (params) {
      return new Promise((resolve, reject) => {
        return API.users.updateWallet(params).then(res => {
          self.updateWalletSuccess(params);
          resolve(res);
        }).catch(error => {
          reject(error);
        })
      })
    },
    deleteWalletSuccess () {
      self.wallet = null;
    },
    deleteWallet () {
      return new Promise((resolve, reject) => {
        return API.users.deleteWallet().then(res => {
          self.deleteWalletSuccess();
          resolve(res);
        }).catch(error => {
          reject(error);
        })
      })
    },
    saveShopSuccess (shop) {
      const index = self.shops.map(s => s.id).indexOf(shop.id);
      const root = getRoot(self);
      if ( index !== -1 ) {
        self.shops[index] = shop;
      } else {
        self.shops = self.shops.concat(shop);
      }
      if (root.shops.current) {
        root.shops.current.applyChanges(shop)
      };
    },
    saveShop (shop, domain) {
      return new Promise((resolve, reject) => {
        const action = domain ? 'update' : 'create';
        return API.shops[action](shop, domain)
          .then(res => {
            self.saveShopSuccess(res);
            resolve(res);
          })
          .catch(error => {
            reject(error);
          })
      })
    },
    deleteShopSuccess (domain) {
      const shop = self.shops && self.shops.find(s => s.domain == domain);
      shop && destroy(shop);
    },
    deleteShop (domain) {
      return new Promise((resolve, reject) => {
        return API.shops.delete(domain).then(res => {
          self.deleteShopSuccess(domain);
          Router.pushRoute('/shops');
          resolve(res);
        }).catch(error => {
          reject(error);
        })
      })
    },
  }))

export default User;
