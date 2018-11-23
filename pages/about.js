import Head from 'next/head';
import Desktop from 'components/Layouts/Desktop';
import Mobile from 'components/Layouts/Mobile';
import Page from 'components/Pages'
import About from 'components/Screens/About';
import MobileAbout from 'components/Screens/Mobile/About';

class AboutPage extends Page {

  static displayName = 'Pages/About';

  render() {
    const { locales: { t }, device: { isMobileDevice }} = this.store
    const aboutUs = t('header.aboutUs')
    return isMobileDevice ? (
      <Mobile store={this.store}>
        <Head>
          <title>MentalMarket | { aboutUs }</title>
        </Head>
        <MobileAbout />
      </Mobile>
    ) : (
      <Desktop store={this.store}>
        <Head>
          <title>MentalMarket | { aboutUs }</title>
        </Head>
        <About />
      </Desktop>
    );
  }
}


export default AboutPage;
