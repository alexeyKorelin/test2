import { types, applySnapshot } from 'mobx-state-tree'
import AuthStore from './auth'
import CategoryStore from './categories'
import AdvertStore from './advert'
import LatestAdvertsStore from './latestAdverts'
import SearchAdvertsStore from './searchAdverts'
import CardsStore from './cards'
import UserStore from './user'
import ShopStore from './shops'
import AdvertForm from './advert/form.js'
import ActionsStore from './actions'
import LocalesStore from './locales'
import DeviceStore from './device'

let store = null

const AppStore = types
  .model("AppStore", {
    device: DeviceStore,
    auth: AuthStore,
    categories: CategoryStore,
    advert: AdvertStore,
    latestAdverts: LatestAdvertsStore,
    searchAdverts: SearchAdvertsStore,
    cards: CardsStore,
    user: UserStore,
    advertForm: AdvertForm,
    actions: ActionsStore,
    locales: LocalesStore,
    shops: ShopStore
  })
  .preProcessSnapshot(snapshot => {
    const newSnapshot = {
      ...snapshot,
    };
    if (!newSnapshot.advertForm) newSnapshot.advertForm = AdvertForm.create();
    if (!newSnapshot.searchAdverts) newSnapshot.searchAdverts = SearchAdvertsStore.create();
    if (!newSnapshot.user) newSnapshot.user = UserStore.create();
    if (!newSnapshot.advert) newSnapshot.advert = AdvertStore.create();
    if (!newSnapshot.actions) newSnapshot.actions = ActionsStore.create();
    if (!newSnapshot.shops) newSnapshot.shops = ShopStore.create();
    return newSnapshot;
  })
  .views(self => {
    return {
      get locale () {
        return self.locales.locale;
      }
    }
  });

const createStore = () => {
  return AppStore.create({
    device: DeviceStore.create(),
    auth: AuthStore.create(),
    categories: CategoryStore.create(),
    cards: CardsStore.create(),
    latestAdverts: LatestAdvertsStore.create(),
    actions: ActionsStore.create(),
    locales: LocalesStore.create(),
    searchAdverts: SearchAdvertsStore.create(),
    advertForm: AdvertForm.create(),
    shops: ShopStore.create()
  })
}

export const initStore = (isServer = false, snapshot = null, env = null) => {
  if (isServer || store === null) {
    store = createStore();
  }
  if (snapshot) {
    applySnapshot(store, snapshot);
  }
  return {...store, isServer, env}
}
