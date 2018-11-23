import Desktop from 'components/Layouts/Desktop';
import Mobile from 'components/Layouts/Mobile';
import Head from 'next/head';
import UserDesktop from 'components/Screens/User';
import UserMobile from 'components/Screens/Mobile/User';
import Page from 'components/Pages';
import { withRouter } from 'next/router';
import {observer} from 'mobx-react';

@observer
class UserPage extends Page {

  static displayName = 'Pages/User';

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
    const userStore = this.store.user;
    let username; try { username = this.props.router.query.user } catch (e) {};
    if (!username || (userStore.current && userStore.current.username == username)) return;
    userStore.fetch(username);
  }

  render() {
    const { device: { isMobileDevice }} = this.store
    const user = this.store.user
    const current = user.current
    const username = current && current.username
    return isMobileDevice ? (
      <Mobile store={this.store}>
        <Head>
          <title>Mental Market | { username }</title>
        </Head>
        <UserMobile />
      </Mobile>
    ) : (
      <Desktop store={this.store}>
        <Head>
          <title>Mental Market | { username }</title>
        </Head>
        <UserDesktop />
      </Desktop>
    )
  }
}

export default withRouter(UserPage);
