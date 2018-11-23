import {types, getParent, getRoot} from "mobx-state-tree"

const Field = types
  .model("Field", {
    slug: types.maybeNull(types.string),
    type: types.maybeNull(types.string),
    min: types.maybeNull(types.number), // if number
    max: types.maybeNull(types.number), // if number
    step: types.maybeNull(types.number), // if number
    value_keys: types.maybeNull(types.array(types.string)),
    default: types.maybeNull(types.boolean), // if checkbox
    strict: types.maybeNull(types.boolean), // unless checkbox
    value: types.frozen(), // for filters
    opened: types.maybeNull(types.boolean)
  })
  .views(self => {
    return {
      get name () {
        const root = getRoot(self);
        if (self.slug == 'price' || self.slug == 'coin') {
          return root.locales.t(`filters.${self.slug}`)
        }
        return root.locales.t(`fields.${self.category.slug}.${self.slug}`)
      },
      get category () {
        const parent = getParent(getParent(self));
        if (parent.$treenode.type.name == "Advert") {
          return parent.subcategory;
        } else if (parent.$treenode.type.name == "AdvertForm") {
          return parent.advert.subcategory;
        } else if (parent.$treenode.type.name == "FieldsStore") {
          return getParent(parent);
        }
      },
      get values () {
        const root = getRoot(self);
        if (self.type === "list") {
          return self.value_keys.map((key) => {
            return { key: key, [key]: root.locales.t(`fields.${self.category.slug}.${self.slug}_values.${key}`) }
          });
        }
      },
      get measure () {
        const key = `fields.${self.category.slug}.${self.slug}_measure`;
        const root = getRoot(self);
        return root.locales.t(key);
      },
      get label () {
        const upcased = `${self.name.charAt(0).toUpperCase()}${self.name.slice(1)}`;
        if ((self.type == 'number ' || self.type == 'floating') && self.measure) {
          return `${upcased} (${self.measure})`;
        } return upcased;
      }
    };
  })
  .actions(self => {
    return {
      applyChanges (options={}) {
        for (let key in options) {
          self[key] = options[key];
        }
        const fields_store = getParent(getParent(self));
        fields_store.touch();
      }
    };
  })

export default Field;
