import { types, getParent, getRoot } from "mobx-state-tree";
import AdvertsStore from 'stores/adverts';
import FieldsStore from 'stores/fields';
import {colors} from './mock.js';

const Category = types
  .model("Category", {
    slug: types.maybeNull(types.string),
    children: types.maybeNull(types.array(types.late(() => Category))),
    fields_store: FieldsStore,
    adverts_store: AdvertsStore,
  })
  .preProcessSnapshot(snapshot => {
    const newSnapshot = {...snapshot};
    if (!newSnapshot.adverts_store) newSnapshot.adverts_store = AdvertsStore.create();
    if (!newSnapshot.fields_store) newSnapshot.fields_store = FieldsStore.create();
    return newSnapshot;
  })
  .views(self => ({
    get parent () {
      if (!self.children) {
        return getParent(getParent(self));
      }
    },
    get name () {
      const root = getRoot(self);
      return root.locales.t(`categories.${self.slug}`);
    },
    get url () {
      if (self.children) {
        return `/${self.slug}`;
      } else {
        return `/${self.parent.slug}/${self.slug}`;
      }
    },
    get color () {
      if (self.children) {
        return colors[self.slug] ? colors[self.slug] : '#00D7C5';
      } else {
        return colors[self.parent.slug] ? colors[self.parent.slug] : '#00D7C5';
      }
    }
  }))
  .actions(self => ({
    findChild (slug) {
      return self.children.find(c => c.slug == slug);
    }
  }))

export default Category
