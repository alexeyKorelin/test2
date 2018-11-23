import {Link} from 'routes';
import Head from 'next/head';
import Desktop from 'components/Layouts/Desktop';
import Mobile from 'components/Layouts/Mobile';
import Subcategory from 'components/Screens/Subcategory';
import MobileSubcategory from 'components/Screens/Mobile/Subcategory';
import Page from 'components/Pages';
import {isMobile} from 'utils/utils';
import { withRouter } from 'next/router';
import {observer} from 'mobx-react';

@observer
class SubcategoryPage extends Page {

  static displayName = 'Pages/Subcategory';

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
    const subcategory = this.store.categories.findByPath(asPath);
    if (subcategory && !subcategory.adverts_store.fetched) {
      subcategory.adverts_store.fetch();
    };
    if (subcategory && !subcategory.fields_store.fetched) {
      subcategory.fields_store.fetch(subcategory.slug);
    }
  }

  render() {
    const { locales: { t }, categories, device: { isMobileDevice }} = this.store
    const { asPath } = this.props.router
    const subcategory = categories.findByPath(asPath)
    const subcategoryName = t(`categories.${subcategory.slug}`)

    return isMobileDevice ? (
      <Mobile store={this.store}>
        <Head>
          <title>Mental Market | { subcategoryName }</title>
        </Head>
        <MobileSubcategory {...this.props}/>
      </Mobile>
    ) : (
      <Desktop store={this.store}>
        <Head>
          <title>Mental Market | { subcategoryName }</title>
        </Head>
        <Subcategory {...this.props}/>
      </Desktop>
    );
  }

}

export default withRouter(SubcategoryPage);
