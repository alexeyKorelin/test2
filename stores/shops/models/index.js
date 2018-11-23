import { types, getRoot, getParent } from "mobx-state-tree";
import Advert from 'stores/adverts/models';
import User from 'stores/auth/models/user';
import { obtainDate } from 'utils/utils';
import moment from 'moment';
import _compact from 'lodash/compact';

const Shop = types
  .model("Shop", {
    id: types.maybeNull(types.number),
    name: types.optional(types.maybeNull(types.string), ''),
    domain: types.optional(types.maybeNull(types.string), ''),
    description: types.optional(types.maybeNull(types.string), ''),
    status: types.optional(types.maybeNull(types.string), ''),
    external_url: types.optional(types.maybeNull(types.string), ''),
    address: types.optional(types.frozen(), ''),
    avatar: types.optional(types.maybeNull(types.string), ''),
    since: types.maybeNull(types.Date),
    adverts: types.maybeNull(types.array(types.late(() => Advert))),
    adverts_count: types.optional(types.number, 0),
    adverts_categories: types.optional(types.maybeNull(types.array(types.string)), []),
    user: types.maybeNull(types.late(() => User))
  })
  .preProcessSnapshot(snapshot => {
    if (snapshot) {
      const newSnapshot = {
        ...snapshot,
        since: obtainDate(snapshot.since)
      }
      return newSnapshot
    }
  })
  .views(self => ({
    get url() {
      return `/shops/${self.domain}`;
    },
    get place() {
      return _compact([self.address.country, self.address.city, self.address.street, self.address.house]).join(', ');
    },
    get categories() {
      const root = getRoot(self);
      return self.adverts_categories ? root.categories.categories.filter(c => c.slug == self.adverts_categories.find(slug => slug == c.slug)) : null;
    },
    get shortname() {
      const name_without_spaces = self.name.replace(/\s+/g, '');
      let shortname = '';
      shortname += name_without_spaces[0];
      const index = name_without_spaces.match(/(-|_)/) && name_without_spaces.match(/(-|_)/).index;
      if (index && index !== -1 ) {
        if (name_without_spaces[index + 1]) {
          shortname += name_without_spaces[index + 1];
        }
      }
      return shortname;
    },
    get date () {
      return self.since ? moment(self.since).format('DD.MM.YYYY') : null;
    }
  }))
  .actions(self => ({
    applyChanges (options={}) {
      for (let key in options) {
        self[key] = options[key];
      }
    },
    edit () {
      const root = getRoot(self);
      root.shops.editShop(self);
    },
    delete () {
      const root = getRoot(self);
      if (confirm(root.locales.t(`shops.areYourSureDelete`))) {
        root.auth.user.deleteShop(self.domain)
      }
    }
  }))

export default Shop;
