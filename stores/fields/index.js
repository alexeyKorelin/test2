import {types, getParent} from "mobx-state-tree";
import API from 'utils/api'
import Field from './models';
import {fieldsToQuery} from 'utils'
import {coinField, priceField} from './content'

const FieldsStore = types
  .model("FieldsStore", {
    fields: types.maybeNull(types.array(Field)),
    fetched: types.maybeNull(types.boolean),
    touched: types.maybeNull(types.boolean),
    applied: types.maybeNull(types.boolean),
  })
  .preProcessSnapshot(snapshot => {
    return {
      ...snapshot,
      fields: [Field.create(coinField), Field.create(priceField)],
    }
  })
  .views(self => {
    return {
      get fieldsAreSet() {
        let fieldsAreSet = false;

        for (let field of self.fields) {
          if (field.slug == 'coin') {
            if (field.value && field.value.length > 0) fieldsAreSet = true;
          } else if (field.slug == 'price') {
            if (field.values != null) fieldsAreSet = true;
          } else if (field.type == 'checkbox') {
              if (field.value != false) fieldsAreSet = true;
          } else if (field.type == 'list') {
              if (field.value && field.value.length > 0) fieldsAreSet = true;
          } else if (field.type == 'number' || field.type == 'floating') {
            if (field.values != null) fieldsAreSet = true;
          }

          if (fieldsAreSet) break;
        };

        return fieldsAreSet;
      }
    }
  })
  .actions(self => ({
    fetchSuccess(res) {
      const newFields = res.fields.map(f => Field.create(f));
      self.fields = self.fields.concat(newFields);
      self.fetched = true;
    },
    fetch(categorySlug) {
      return new Promise((resolve, reject) => {
        return API.categories.get(categorySlug).then(res => {
          self.fetchSuccess(res);
          resolve(res);
        }).catch(error => {
          reject(error);
        })
      })
    },
    touch() {
      self.touched = true;
    },
    applyFilter() {
      const query = fieldsToQuery(self.fields);
      const parent = getParent(self);
      parent.adverts_store.applyFilter(query);
      self.applied = true;
    },
    resetFilter () {
      self.fields.forEach(field => {
        if (field.slug == 'coin') {
          field.value = [];
        }
        if (field.slug == 'price') {
          field.value = null
        }
        if (field.type == 'checkbox') {
          field.value = false;
        }
        if (field.type == 'list') {
          field.value = [];
        }
        if (field.type == 'number' || field.type == 'floating') {
          field.value = null
        }
      });
      const parent = getParent(self);
      parent.adverts_store.applyFilter({});
      self.touched = false;
      self.applied = false;
    }
  }));

export default FieldsStore;
