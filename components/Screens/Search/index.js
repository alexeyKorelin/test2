import React, {Component} from 'react';
import {Link} from 'routes';
import {Container, Row, Col} from 'components/Base/Grid';
import { inject, observer } from 'mobx-react';
import AdPath from 'components/Modules/AdPath';
import AdsList from 'components/Modules/AdsList';
import Filters from 'components/Modules/Filters';
import styles from './index.sass';
import FilteredIsEmpty from 'components/Modules/FilteredIsEmpty';
import PriceRange from 'components/Base/Filters/PriceRange';

@inject('searchAdverts')
@inject('locales')
@observer
class Search extends Component {
  render() {
    const { locales: { t }, searchAdverts: { adverts_store: { query }, adverts_store, fields_store } } = this.props;
    const noResults = <p>{ t('search.noResults') } <span className={styles.textBlue}>"{query}"</span> { t('search.nothingFound') }</p>

    return (
      <Container>
        <h1>{ t('search.lookingBy') } <span className={styles.textBlue}>"{query}"</span></h1>
        <Row>
          <Col size={(!adverts_store.fetched && !adverts_store.touched) ? 12 : '4-5'}>
            <If condition={adverts_store.adverts}>
              <AdsList
                list={adverts_store.adverts}
                columnsCount={4}
                finished={adverts_store.finished}
                moreDisabled={adverts_store.loading}
                moreText={ t('search.showMore') }
                moreAction={adverts_store.loadMore}
                emptyDescription={noResults}
                isSearch
                touched={adverts_store.touched}
                loading={adverts_store.loading}
              />
              <If condition={(!adverts_store.adverts.length && !adverts_store.loading && adverts_store.touched)}>
                <FilteredIsEmpty fields={adverts_store} className={styles.filteredIsEmpty} />
              </If>
            </If>
          </Col>
          <If condition={adverts_store.fetched && adverts_store.adverts.length > 1 || adverts_store.touched}>
            <Col size={'1-5'}>
              <Filters store={fields_store} />
            </Col>
          </If>
        </Row>
      </Container>
    );
  }
}

export default Search;
