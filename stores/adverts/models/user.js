import {types, getRoot, destroy, detach} from "mobx-state-tree";

const User = types
  .model("User", {
    username: types.identifier(types.string),
    first_Name: types.maybeNull(types.string),
    last_name: types.maybeNull(types.string),
    avatar: types.maybeNull(types.string),
    active: types.maybeNull(types.boolean),
    status: types.maybeNull(types.string)
  })
  .views(self => ({
    get url() {
      return `/users/${self.username}`;
    },
    get tg() {
      return `tg://resolve?domain=${self.username}`;
    }
  }))
  .actions(self => {
    return {
    };
  })

export default User;
