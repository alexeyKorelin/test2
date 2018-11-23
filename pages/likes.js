import Head from 'next/head';
import Desktop from 'components/Layouts/Desktop';
import Mobile from 'components/Layouts/Mobile';
import LikesDesktop from 'components/Screens/Likes';
import LikesMobile from 'components/Screens/Mobile/Likes';
import UserPage from 'components/Pages/UserPage';

class LikesPage extends UserPage {

  static displayName = 'Pages/Likes';

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
    const favs = t('profile.favs')
    return isMobileDevice ? (
      <Mobile store={this.store}>
        <Head>
          <title>MentalMarket | { favs }</title>
        </Head>
        <LikesMobile />
      </Mobile>
    ) : (
      <Desktop store={this.store}>
        <Head>
          <title>MentalMarket | { favs }</title>
        </Head>
        <LikesDesktop />
      </Desktop>
    );
  }
}

export default LikesPage;
