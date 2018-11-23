import {types, destroy} from "mobx-state-tree"
import Category from './models'

const CategoryStore = types
  .model("CategoryStore", {
    categories: types.optional(types.array(types.late(() => Category)), [])
  })
  .views(self => ({
    get fetched () {
      return self.categories && self.categories.length > 0;
    }
  }))
  .actions(self => ({
    findByPath (path) {
      const words = path.split('/');
      const categorySlug = words[1];
      const subcategorySlug = words[2];
      const category = self.categories.find(c => c.slug == categorySlug);
      if (subcategorySlug) {
        return category.findChild(subcategorySlug);
      } else {
        return category;
      }
    },
    deleteAdvert(uid) {
      self.categories.forEach(category => {
        category.adverts_store.deleteAdvert(uid);
        
        category.children.forEach(category => category.adverts_store.deleteAdvert(uid));
      })
    }
  }));

export default CategoryStore;
