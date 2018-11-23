import React, {Component} from 'react';
import {Link} from 'routes';
import cx from 'classnames'
import { inject, observer } from 'mobx-react';
import AdsList from 'components/Modules/Mobile/AdsList';
import Icon from 'components/Base/Icon';
import Sidebar from 'components/Modules/Mobile/Sidebar';
import Filters from 'components/Modules/Mobile/Filters';
import styles from './index.sass';
import ChildrenCategoriesLinks from 'components/Modules/ChildrenCategoriesLinks';
import FixedTop from 'components/Modules/Mobile/FixedTop';
import FilteredIsEmpty from 'components/Modules/FilteredIsEmpty';

@inject('categories')
@observer
class MobileCategory extends Component {

  state = {
    filtersIsOpen: false
  };

  render() {
    const category = this.props.categories.findByPath(this.props.router.asPath);
    const {categories} = this.props.categories;

    if (!category) return null;
    return (
      <div>
        <div className={styles.head}>
          <h2 onClick={this.onTitleClick}>{category.name}</h2>
          {(category.adverts_store.adverts.length > 1 || category.fields_store.touched) &&
            <button onClick={this.openFilters} className={styles.filtersButton}>
              <Icon icon="filters" width={18} />
            </button>
          }
        </div>
        <If
          condition={
            (category.adverts_store.fetched && category.adverts_store.adverts.length) ||
            category.fields_store.touched
          }
        >
          <FixedTop className={styles.childrenLinks}>
            <ChildrenCategoriesLinks
              categories={category.children}
              slug={category.slug}
              nowrap
            />
          </FixedTop>
        </If>
        <AdsList
          list={category.adverts_store.adverts}
          columnsCount={2}
          finished={category.adverts_store.finished}
          moreDisabled={category.adverts_store.loading}
          moreAction={this.fetchData}
          isCategory
          categories={categories}
          slug={category.slug}
          touched={category.fields_store.touched}
          loading={category.adverts_store.loading}
        />
        <If condition={(!category.adverts_store.adverts.length && !category.adverts_store.loading && category.fields_store.touched)}>
          <FilteredIsEmpty fields={category.fields_store} size={'sm'} />
        </If>
        {(category.adverts_store.adverts.length > 1 || category.fields_store.touched) &&
          <Sidebar
            className={styles.filter}
            isOpened={this.state.filtersIsOpen}
            from="right"
            onClose={this.closeFilters}
          >
            <Filters store={category.fields_store} onClose={this.closeFilters}/>
          </Sidebar>
        }
      </div>
    );
  }

  fetchData = () => {
    const category = this.props.categories.findByPath(this.props.asPath);
    category.adverts_store.loadMore();
  }

  onTitleClick = () => {
    window.history.back();
  }

  openFilters = () => this.setState({ filtersIsOpen: true });

  closeFilters = () => this.setState({ filtersIsOpen: false });
}

MobileCategory.displayName = 'Screens/Mobile/MobileCategory';

export default MobileCategory;
