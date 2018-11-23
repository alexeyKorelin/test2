import Page from '../Pages';
import { checkUser, checkNotFound, checkAccess } from './utils';
import { initState } from 'server/states';

export default class UserPage extends Page {
  static async getInitialProps(props) {
    checkNotFound(props);
    checkUser(props);
    checkAccess(props);
    return initState(props);
  }
}
