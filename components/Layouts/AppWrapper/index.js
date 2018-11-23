import React, { Component } from 'react';
import Head from 'next/head';
import { Provider } from 'mobx-react';
import { withRouter } from 'next/router';
import cx from 'classnames';
import NeedAuthModal from 'components/Modules/NeedAuthModal';
import AccessDeniedModal from 'components/Modules/AccessDeniedModal';
import Scripts from 'components/Base/Scripts';
import "styles/main.sass";
import styles from './index.sass';
import Settings from 'config';
import Raven from 'raven-js'
import {observe} from 'mobx';
import {cookie} from 'utils/utils';

class AppWrapper extends Component {

  constructor(props) {
    super(props)
    const { env } = this.props.store
    if (env !== 'development') {
      Raven.config(Settings.sentry.react).install()
    }
    observe(this.props.store.locales, 'locale', this.updateStore);
    observe(this.props.store.auth, 'user', this.updateStore);
  }

  componentDidCatch(err, errInfo) {
    const { env } = this.props.store
    if (env !== 'development') {
      Raven.captureException(err, { extra: errInfo })
      super.componentDidCatch(err, errInfo)
    }
  }

  updateStore = () => {
    const store = this.props.store;
    const { route, asPath } = this.props.router;
    if (route == "/category" || route == "/subcategory") {
      const category = store.categories.findByPath(asPath);
      if (category) category.adverts_store.fetch();
    }
    if (route == "/user") {
      const user = store.user.current;
      if (user) store.user.fetch(user.username);
    }
    store.cards.fetch();
    store.latestAdverts.fetch();
  }

  render () {
    const { className, store, children, mobile, router } = this.props;
    const { env } = store;
   
    return (
      <Provider {...store}>
        <div className={className}>
          <Head>
            <title>MentalMarket</title>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
            <link rel="apple-touch-icon" sizes="180x180" href={`${Settings.assetHost}/favicon/apple-touch-icon.png`} />
            <link rel="icon" type="image/png" sizes="32x32" href={`${Settings.assetHost}/favicon/favicon-32x32.png`} />
            <link rel="icon" type="image/png" sizes="16x16" href={`${Settings.assetHost}/favicon/favicon-16x16.png`} />
            <link rel="manifest" href={`${Settings.assetHost}/favicon/site.webmanifest`} />
            <link rel="mask-icon" href={`${Settings.assetHost}/favicon/safari-pinned-tab.svg" color="#5bbad5`} />
            <link rel="shortcut icon" href={`${Settings.assetHost}/favicon/favicon.ico`} />
            <meta name="msapplication-TileColor" content="#19123f" />
            <meta name="msapplication-config" content={`${Settings.assetHost}/favicon/browserconfig.xml`} />
            <meta name="theme-color" content="#ffffff" />
            <script src={`https://maps.googleapis.com/maps/api/js?key=${Settings.googleApiKey}&libraries=places&language=en`}></script>
            <meta property="og:url" content={`${Settings.host}${router.asPath}`} />
            <meta property="og:image" content={`${Settings.assetHost}/landing/social4.jpg`} />
          </Head>
          <If condition={env != "development"}>
            <Scripts/>
          </If>
          { children }
          <NeedAuthModal size={mobile && 'sm'} />
          <AccessDeniedModal />
        </div>
      </Provider>
    )
  }
}

export default withRouter(AppWrapper)
