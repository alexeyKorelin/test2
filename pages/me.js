import UserPage from 'components/Pages/UserPage';
import Head from 'next/head';
import Desktop from 'components/Layouts/Desktop';
import Mobile from 'components/Layouts/Mobile';
import MeDesktop from 'components/Screens/Me';
import MeMobile from 'components/Screens/Mobile/Me';

class MePage extends UserPage {

  static displayName = 'Pages/Me';

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
    const profile = t('header.profile')
    return isMobileDevice ? (
      <Mobile store={this.store}>
        <Head>
          <title>MentalMarket | { profile }</title>
        </Head>
        <MeMobile />
      </Mobile>
    ) : (
      <Desktop store={this.store}>
        <Head>
          <title>MentalMarket | { profile }</title>
        </Head>
        <MeDesktop />
      </Desktop>
    );
  }
}

export default MePage;
