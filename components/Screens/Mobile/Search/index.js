import React, {Component} from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'routes';
import AdsList from 'components/Modules/Mobile/AdsList';
import Icon from 'components/Base/Icon';
import Sidebar from 'components/Modules/Mobile/Sidebar';
import Filters from 'components/Modules/Mobile/Filters';
import FilteredIsEmpty from 'components/Modules/FilteredIsEmpty';
import styles from './index.sass';

@inject('locales')
@inject('searchAdverts')
@observer
class MobileSearch extends Component {
  state = {
    filtersIsOpen: false
  }

  render() {
    const { locales: { t }, searchAdverts: { adverts_store: { query }, adverts_store, fields_store } } = this.props;
    const noResults = <p>{ t('search.noResults') } <span className={styles.textBlue}>"{query}"</span> { t('search.nothingFound') }</p>

    return (
      <div>
        <div className={styles.head}>
          <h2>{ t('search.lookingBy') } <span className={styles.textBlue}>"{query}"</span></h2>
          <If condition={adverts_store.fetched && adverts_store.adverts.length > 1 || adverts_store.touched}>
            <button onClick={this.openFilters} className={styles.filtersButton}>
              <Icon icon="filters" width={18} />
            </button>
          </If>
        </div>
        <If condition={adverts_store.adverts}>
          <AdsList
            list={adverts_store.adverts}
            columnsCount={2}
            finished={adverts_store.finished}
            moreDisabled={adverts_store.loading}
            moreAction={adverts_store.loadMore}
            emptyDescription={noResults}
            isSearch
            touched={adverts_store.touched}
            loading={adverts_store.loading}
          />
        </If>
        <If condition={(!adverts_store.fetched && !adverts_store.loading && adverts_store.touched)}>
          <FilteredIsEmpty fields={adverts_store} size={'sm'} />
        </If>
        <If condition={adverts_store.fetched && adverts_store.adverts.length > 1 || adverts_store.touched}>
          <Sidebar
            className={styles.filter}
            isOpened={this.state.filtersIsOpen}
            from="right"
            onClose={this.closeFilters}
          >
            <Filters store={fields_store} onClose={this.closeFilters}/>
          </Sidebar>
        </If>
      </div>
    );
  }

  openFilters = () => this.setState({filtersIsOpen: true});

  closeFilters = () => this.setState({filtersIsOpen: false});
}

MobileSearch.displayName = 'Screens/Mobile/Search';

export default MobileSearch;
