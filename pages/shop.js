import Desktop from 'components/Layouts/Desktop';
import Mobile from 'components/Layouts/Mobile';
import Head from 'next/head';
import ShopDesktop from 'components/Screens/Shop';
import ShopMobile from 'components/Screens/Mobile/Shop';
import Page from 'components/Pages';
import { withRouter } from 'next/router';
import { observer } from 'mobx-react';

@observer
class ShopPage extends Page {

  static displayName = 'Pages/Shop';

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
    const shopStore = this.store.shops;
    let domain; try { domain = this.props.router.query.shop } catch (e) {};
    if (!domain || (shopStore.current && shopStore.current.domain == domain)) return;
    shopStore.fetch(domain);
  }

  render() {
    const { device: { isMobileDevice }} = this.store
    const shops = this.store.shops;
    const current = shops.current;
    const title = current && current.name;
    
    return isMobileDevice ? (
      <Mobile store={this.store}>
        <Head>
          <title>Mental Market | { title }</title>
        </Head>
        <ShopMobile />
      </Mobile>
    ) : (
      <Desktop store={this.store}>
        <Head>
          <title>Mental Market | { title }</title>
        </Head>
        <ShopDesktop />
      </Desktop>
    )
  }
}

export default withRouter(ShopPage);
