import Desktop from 'components/Layouts/Desktop';
import Mobile from 'components/Layouts/Mobile';
import Head from 'next/head';
import Category from 'components/Screens/Category';
import MobileCategory from 'components/Screens/Mobile/Category';
import Page from 'components/Pages';
import { withRouter } from 'next/router';
import {observer} from 'mobx-react';

@observer
class CategoryPage extends Page {

  static displayName = 'Pages/Category';

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
    const {asPath} = params.router;
    const category = this.store.categories.findByPath(asPath);
    if (category && !category.adverts_store.fetched) {
      category.adverts_store.fetch();
    };
  }

  render() {
    const { locales: { t }, categories, device: { isMobileDevice } } = this.store
    const {asPath} = this.props.router;
    const category = this.store.categories.findByPath(asPath);
    const categoryName = t(`categories.${category.slug}`)

    return isMobileDevice ? (
      <Mobile store={this.store}>
        <Head>
          <title>MentalMarket | { categoryName }</title>
        </Head>
        <MobileCategory {...this.props}/>
      </Mobile>
    ) : (
      <Desktop store={this.store}>
        <Head>
          <title>MentalMarket | { categoryName }</title>
        </Head>
        <Category {...this.props}/>
      </Desktop>
    );
  }
}

export default withRouter(CategoryPage);
