import UserPage from 'components/Pages/UserPage';
import Head from 'next/head';
import Desktop from 'components/Layouts/Desktop';
import Mobile from 'components/Layouts/Mobile';
import EditAd from 'components/Screens/EditAd';
import { withRouter } from 'next/router';

class EditAdPage extends UserPage {

  static displayName = 'Pages/EditAd';

  render() {
    const { locales: { t }, device: { isMobileDevice }} = this.store
    const editAd = t('ad.edit')
    return isMobileDevice ? (
      <Mobile store={this.store}>
        <Head>
          <title>MentalMarket | { editAd }</title>
        </Head>
        <EditAd {...this.props}/>
      </Mobile>
    ) : (
      <Desktop store={this.store}>
        <Head>
          <title>MentalMarket | { editAd }</title>
        </Head>
        <EditAd {...this.store}/>
      </Desktop>
    );
  }
}

export default withRouter(EditAdPage);
