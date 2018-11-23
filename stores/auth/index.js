import {types} from "mobx-state-tree"
import User from './models/user'
import API from 'utils/api'
import {cookie} from 'utils/utils';
import {Router} from 'routes';

const AuthStore = types
  .model("AuthStore", {
    user: types.maybeNull(User)
  })
  .views(self => {
    return {
      get authorized () {
        return !!self.user;
      }
    };
  })
  .actions(self => ({
    updateUser (params) {
      self.user = User.create(params);
    },
    signIn (code) {
      return new Promise((resolve, reject) => {
        return API.users.login(code).then(res => {
          cookie.set('authToken', res.token);
          self.updateUser(res);
          resolve(res);
        }).catch(error => {
          cookie.set('authToken', null);
          reject(error);
        })
      })
    },
    signOut () {
      self.user = null;
      cookie.remove('authToken');
      Router.pushRoute('/main');
    }
  }))

export default AuthStore;
