import Desktop from 'components/Layouts/Desktop';
import Mobile from 'components/Layouts/Mobile';
import Head from 'next/head';
import ShopsDesktop from 'components/Screens/Shops';
import ShopsMobile from 'components/Screens/Mobile/Shops';
import UserPage from 'components/Pages/UserPage';
import { withRouter } from 'next/router';
import {observer} from 'mobx-react';

@observer
class ShopsPage extends UserPage {

  static displayName = 'Pages/Shops';

  componentDidMount () {
    this.fetchData();
  }

  fetchData() {
    const {auth}  = this.store;
    const {user} = auth;

    if (user && !user.liked_store.fetched) {
      user.fetchLikedStore();
    }
  }

  render() {
    const { locales: { t }, device: { isMobileDevice }} = this.store
    const myShops = t('profile.myShops')
    return isMobileDevice ? (
      <Mobile store={this.store}>
        <Head>
          <title>Mental Market | { myShops }</title>
        </Head>
        <ShopsMobile />
      </Mobile>
    ) : (
      <Desktop store={this.store}>
        <Head>
          <title>Mental Market | { myShops }</title>
        </Head>
        <ShopsDesktop />
      </Desktop>
    )
  }
}

export default withRouter(ShopsPage);