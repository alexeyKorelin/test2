import Desktop from 'components/Layouts/Desktop';
import Mobile from 'components/Layouts/Mobile';
import Head from 'next/head';
import NewAd from 'components/Screens/NewAd';
import MobileNewAd from 'components/Screens/Mobile/NewAd';
import UserPage from 'components/Pages/UserPage';

class NewAdPage extends UserPage {

  static displayName = 'Pages/NewAd';

  render() {
    const { locales: { t }, device: { isMobileDevice }} = this.store
    const newAd = t('profile.newAd')
    return isMobileDevice ? (
      <Mobile store={this.store}>
        <Head>
          <title>Mental Market | { newAd }</title>
        </Head>
        <MobileNewAd {...this.props}/>
      </Mobile>
    ) : (
      <Desktop store={this.store}>
        <Head>
          <title>Mental Market | { newAd }</title>
        </Head>
        <NewAd {...this.store}/>
      </Desktop>
    );
  }
}

export default NewAdPage;
