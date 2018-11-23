import Head from 'next/head';
import Application from 'components/Layouts/Desktop';
import Help from 'components/Screens/Help';
import Page from 'components/Pages'

class HelpPage extends Page {

  static displayName = 'Pages/Help';

  render() {
    return (
      <Application store={this.store}>
        <Head>
          <title>MentalMarket | Справка и помощь</title>
        </Head>
        <Help />
      </Application>
    );
  }
}


export default HelpPage;
