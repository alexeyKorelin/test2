import Desktop from 'components/Layouts/Desktop';
import Mobile from 'components/Layouts/Mobile';
import Head from 'next/head';
import Page from 'components/Pages';
import Ad from 'components/Screens/Ad';
import MobileAd from 'components/Screens/Mobile/Ad';
import {withRouter} from 'next/router'
import {observer} from 'mobx-react';

@observer
class AdPage extends Page {

  static displayName = 'Pages/Ad';

  componentDidMount () {
    this.fetchData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const {asPath} = nextProps.router;
    if (asPath != this.props.router.asPath) {
      this.fetchData(nextProps);
    }
  }

  fetchData(params) {
    const advertStore = this.store.advert;
    let uid; try { uid = params.router.query.ad; } catch (e) {};
    if (!uid || (advertStore.current && advertStore.current.uid == uid)) return;
    advertStore.fetch(uid);
  }

  render() {
    const currentAdvert = this.store.advert.current;
    const name = currentAdvert && currentAdvert.name;
    const isMobileDevice = this.store.device.isMobileDevice
    let ogImage;
    try { ogImage = currentAdvert.images[0].mid } catch (e) {};

    return isMobileDevice ? (
      <Mobile store={this.store}>
        <Head>
          <title>MentalMarket | { name }</title>
          <meta property="og:image" content={ogImage} />
        </Head>
        <MobileAd />
      </Mobile>
    ) : (
      <Desktop store={this.store}>
        <Head>
          <title>MentalMarket | { name }</title>
          <meta property="og:image" content={ogImage} />
        </Head>
        <Ad />
      </Desktop>
    );
  }
}

export default withRouter(AdPage);
