import { Component } from 'react';
import { initStore } from 'stores';
import { Router } from 'routes';
import { initState } from 'server/states';
import { /*checkUser, */checkNotFound, checkAccess } from './utils';

class Page extends Component {

  constructor(props) {
    super(props);
    this.store = initStore(props.isServer, props.initialState, props.env);
  }

  static async getInitialProps(props) {
    checkNotFound(props);
    checkAccess(props);
    return initState(props);
  }

  redirect = (path = '/main') => {
    Router.pushRoute(path);
  }
}

export default Page;
