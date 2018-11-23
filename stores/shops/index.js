import { types, clone, getRoot } from "mobx-state-tree";
import API from 'utils/api'
import Shop from './models';

const ShopStore = types
  .model("ShopStore", {
    current: types.maybeNull(Shop),
    editingShop: types.maybeNull(Shop)
  })
  .actions(self => ({
    fetch (domain) {
      self.current = null;
      API.shops.get(domain)
        .then(shop => self.fetchSuccess(shop))
    },
    fetchSuccess (shop) {
      self.current = Shop.create(shop);
    },
    buildShop () {
      self.editingShop = Shop.create();
    },
    editShop (shop) {
      self.editingShop = clone(shop);
    },
    dismissShop() {
      self.editingShop = null;
    }
  }));

export default ShopStore;