import Page from 'components/Pages';
import AppWrapper from 'components/Layouts/AppWrapper';
import Head from 'next/head';
import Landing from 'components/Screens/Landing';
import MobileLanding from 'components/Screens/Mobile/Landing';

class LandingPage extends Page {

  static displayName = 'Pages/Landing';

  render() {
    const { device: { isMobileDevice }} = this.store
    return (
      <AppWrapper store={this.store}>
        <Head>
          <title>MentalMarket</title>
        </Head>
        {isMobileDevice ? (
          <MobileLanding {...this.props} />
        ) : (
          <Landing {...this.props} />
        )}
      </AppWrapper>
    )
  }
}

export default LandingPage;
