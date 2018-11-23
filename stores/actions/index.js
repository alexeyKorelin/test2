import {types} from 'mobx-state-tree';

const ActionsStore = types
  .model("ActionsStore", {
    action: types.maybeNull(types.string),
  })
  .actions(self => ({
    setAction (action) {
      self.action = action;
    },
    closeModal () {
      self.action = null;
    }
  }));

export default ActionsStore;
