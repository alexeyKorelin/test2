import React, {Component} from 'react';
import {Link} from 'routes';
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
class MobileSubcategory extends Component {

  state = {
    filtersIsOpen: false
  };

  render() {
    const category = this.props.categories.findByPath(this.props.router.asPath);
    if (!category) return null;
    const {categories} = this.props.categories;
    const parent = category.parent;

    return (
      <div>
        <div className={styles.head}>
          <h2>
            <Link route={`/${parent.slug}`}>
              <a>
                <Icon style={{marginRight: 7, position: 'relative', top: 2}} icon="chevron-left" width={12} fill="#1C1C1C"/>
                {category.name}
              </a>
            </Link>
          </h2>
          {(category.adverts_store.adverts.length > 1  || category.fields_store.touched) &&
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
              categories={parent.children}
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
          isSubcategory
          categories={parent.children}
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

  openFilters = () => this.setState({ filtersIsOpen: true });

  closeFilters = () => this.setState({ filtersIsOpen: false });
}

MobileSubcategory.displayName = 'Screens/Mobile/MobileSubcategory';

export default MobileSubcategory;
