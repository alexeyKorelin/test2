import Desktop from 'components/Layouts/Desktop';
import Mobile from 'components/Layouts/Mobile';
import Page from 'components/Pages'
import Head from 'next/head';
import Search from 'components/Screens/Search';
import MobileSearch from 'components/Screens/Mobile/Search';
import { observe } from 'mobx';
import { Router } from 'routes';

class SearchPage extends Page {

  static displayName = 'Pages/Search';

  componentDidMount () {
    observe(this.store.searchAdverts.adverts_store, 'query', this.fetchData);
    const { searchAdverts: { adverts_store }} = this.store
    const query = Router.router.asPath.split('?query=')[1]
    if (!adverts_store.query && query) {
      adverts_store.setQuery(query)
    }
  }

  fetchData = () => {
    const {searchAdverts: {adverts_store}} = this.store;
    adverts_store.fetch();
  }

  componentWillUnmount() {
    const {searchAdverts: {adverts_store}} = this.store;
    adverts_store.setQuery(null);
  }

  render() {
    const { locales: { t }, device: { isMobileDevice }} = this.store
    const { searchQuery } = this.props
    const searchingBy = t('search.lookingBy')
    const searchingString = searchingBy + ' ' + searchQuery
    return isMobileDevice ? (
      <Mobile store={this.store}>
        <Head>
          <title>Mental Market | { searchingString }</title>
        </Head>
        <MobileSearch {...this.props}/>
      </Mobile>
    ) : (
      <Desktop store={this.store}>
        <Head>
          <title>Mental Market | { searchingString }</title>
        </Head>
        <Search {...this.props}/>
      </Desktop>
    );
  }

}

export default SearchPage;
