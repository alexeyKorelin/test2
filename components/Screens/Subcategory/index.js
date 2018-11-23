import React, {Component} from 'react';
import {Link} from 'routes';
import {Container, Row, Col} from 'components/Base/Grid';
import { inject, observer } from 'mobx-react';
import AdPath from 'components/Modules/AdPath';
import AdsList from 'components/Modules/AdsList';
import Filters from 'components/Modules/Filters';
import styles from './index.sass';
import ChildrenCategoriesLinks from 'components/Modules/ChildrenCategoriesLinks';
import FixedTop from 'components/Modules/FixedTop';
import FilteredIsEmpty from 'components/Modules/FilteredIsEmpty';
import IconNew from 'components/Base/IconNew';

@inject('categories') @observer
class Subcategory extends Component {
  state = {
    filterShift: null
  }

  render() {
    const category = this.props.categories.findByPath(this.props.router.asPath);
    if (!category) return null;
    const {categories} = this.props.categories;
    const parent = category.parent;
    const {filterShift} = this.state;

    return (
      <Container>
        <AdPath className={styles.adPath}>
          <Link route="/main"><a><IconNew i={'home'} size={20} /></a></Link>
          <span>{">"}</span>
          <Link route={category.parent.url}><a>{parent.name}</a></Link>
          <span>{">"}</span>
          <Link route={category.url}><a>{category.name}</a></Link>
        </AdPath>
        <h1 className={styles.h1}>{category.name}</h1>
        <If
          condition={
            (category.adverts_store.fetched && category.adverts_store.adverts.length) ||
            category.fields_store.touched
          }
        >
          <FixedTop className={styles.childrenLinks} onHeightChange={this.updateFilterShift}>
            <ChildrenCategoriesLinks
              categories={parent.children}
              slug={category.slug}
            />
          </FixedTop>
        </If>
        <Row>
          <Col size={!(category.adverts_store.adverts.length > 1 || category.fields_store.touched) ? 12 : '4-5'}>
            <AdsList
              list={category.adverts_store.adverts}
              columnsCount={!(category.adverts_store.adverts.length > 1 || category.fields_store.touched) ? null : 4}
              columnSize={!(category.adverts_store.adverts.length > 1 || category.fields_store.touched) ? '1-5' : null}
              finished={category.adverts_store.finished}
              moreDisabled={category.adverts_store.loading}
              moreAction={this.fetchData}
              isSubcategory
              categories={parent.children}
              slug={category.slug}
              touched={category.fields_store.touched}
              loading={category.adverts_store.loading}
            />
            <If condition={(!category.adverts_store.adverts.length && !category.adverts_store.loading && category.fields_store.touched)}>
              <FilteredIsEmpty fields={category.fields_store} className={styles.filteredIsEmpty} />
            </If>
          </Col>
          {(category.adverts_store.adverts.length > 1 || category.fields_store.touched) &&
            <Col size={'1-5'}>
              <Filters store={category.fields_store} shift={filterShift} />
            </Col>
          }
        </Row>
      </Container>
    );
  }

  updateFilterShift = (childrenLinksNode) => {
    this.setState({filterShift: childrenLinksNode.offsetHeight});
  }

  fetchData = () => {
    const category = this.props.categories.findByPath(this.props.asPath);
    category.adverts_store.loadMore();
  }
}

export default Subcategory;
