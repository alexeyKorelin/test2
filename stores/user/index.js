import {types} from "mobx-state-tree";
import API from 'utils/api'
import User from 'stores/auth/models/user';

const UserStore = types
  .model("UserStore", {
    current: types.maybeNull(User),
  })
  .actions(self => ({
    fetch (username) {
      self.current = null;
      API.users.get(username)
        .then(user => self.fetchSuccess(user))
    },
    fetchSuccess (user) {
      self.current = User.create(user);
    }
  }));

export default UserStore;
