import Head from 'next/head';
import AppWrapper from 'components/Layouts/AppWrapper';
import Page from 'components/Pages';
import MobileNotFound from 'components/Screens/Mobile/NotFound';
import NotFound from 'components/Screens/NotFound';

class NotFoundPage extends Page {

  static displayName = 'Pages/NotFound';

  render() {
    const { device: { isMobileDevice }} = this.store
    return (
      <AppWrapper store={this.store}>
        <Head>
          <title>Mental Market | 404</title>
        </Head>
        {isMobileDevice ? (
          <MobileNotFound />
        ) : (
          <NotFound />
        )}
      </AppWrapper>
    )
  }
}


export default NotFoundPage;
