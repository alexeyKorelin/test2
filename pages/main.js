import Desktop from 'components/Layouts/Desktop';
import Mobile from 'components/Layouts/Mobile';
import Index from 'components/Screens/Index';
import MobileIndex from 'components/Screens/Mobile/Index';
import Head from 'next/head';
import Page from 'components/Pages'

class IndexPage extends Page {

  static displayName = 'Pages/Index';

  render () {
    const { device: { isMobileDevice }} = this.store
    
    return isMobileDevice ? (
      <Mobile store={this.store}>
        <Head>
          <title>MentalMarket</title>
        </Head>
        <MobileIndex />
      </Mobile>
    ) : (
      <Desktop store={this.store}>
        <Head>
          <title>MentalMarket</title>
        </Head>
        <Index />
      </Desktop>
    );
  }
}

export default IndexPage;
