import Head from 'next/head';
import Desktop from 'components/Layouts/Desktop';
import Mobile from 'components/Layouts/Mobile';
import AdsDesktop from 'components/Screens/Ads';
import AdsMobile from 'components/Screens/Mobile/Ads';
import UserPage from 'components/Pages/UserPage';

class AdsPage extends UserPage {

  static displayName = 'Pages/Ads';

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
    const myAds = t('header.myAds')
    return isMobileDevice ? (
      <Mobile store={this.store}>
        <Head>
          <title>MentalMarket | { myAds }</title>
        </Head>
        <AdsMobile />
      </Mobile>
    ) : (
      <Desktop store={this.store}>
        <Head>
          <title>MentalMarket | { myAds }</title>
        </Head>
        <AdsDesktop />
      </Desktop>
    );
  }
}

export default AdsPage;
