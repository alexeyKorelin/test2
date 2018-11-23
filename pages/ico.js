import Page from 'components/Pages';
import Head from 'next/head';
import AppWrapper from 'components/Layouts/AppWrapper';
import Ico from 'components/Screens/Ico';
import MobileIco from 'components/Screens/Mobile/Ico';
import Raven from 'raven-js';

class IcoPage extends Page {
  static displayName = 'Pages/Ico';

  render() {
    const { device: { isMobileDevice }} = this.store
    
    return (
      <AppWrapper store={this.store}>
        <Choose>
          <When condition={isMobileDevice}>
            <MobileIco />
          </When>
          <Otherwise>
            <Ico />
          </Otherwise>
        </Choose>
      </AppWrapper>
    )
  }
}

export default IcoPage;
