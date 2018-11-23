import {types} from "mobx-state-tree";
import AdvertsStore from 'stores/adverts';
import FieldsStore from 'stores/fields';

const SearchStore = types
  .model("SearchStore", {
    fields_store: FieldsStore,
    adverts_store: AdvertsStore,
  })
  .preProcessSnapshot(snapshot => {
    const newSnapshot = {...snapshot};
    if (!newSnapshot.adverts_store) newSnapshot.adverts_store = AdvertsStore.create()
    if (!newSnapshot.fields_store) newSnapshot.fields_store = FieldsStore.create();
    return newSnapshot;
  })

export default SearchStore;
