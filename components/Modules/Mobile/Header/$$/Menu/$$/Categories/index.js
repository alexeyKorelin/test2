import React, {Component} from 'react';
import IconNew from 'components/Base/IconNew';
import styles from './index.sass';
import {Router, Link} from 'routes';
import cx from 'classnames';
import Sidebar from 'components/Modules/Mobile/Sidebar';
import _sortBy from 'lodash/sortBy';
import { inject, observer } from 'mobx-react';

@inject('locales')
@observer
class Categories extends Component {
  state = {
    slug: ''
  }

  render() {
    const {categories, onBack, isOpened, locales: { t }} = this.props;

    return (
      <Sidebar
        from="left"
        onClose={this.onClose}
        onBack={onBack}
        isOpened={isOpened}
        saveOverflow={true}
        className={styles.sidebar}
        closeClass={styles.closeSidebar}
      >
        <h2>{ t('header.catalog') }</h2>
        {_sortBy(categories, 'name').map((category, i) => (
          <div key={i}>
            <button
              className={cx(styles.item, styles.item_collapsible)}
              onClick={() => this.changeCategory(category.slug)}
            >
              <IconNew
                i={category.slug}
                className={styles.icon}
                size={27}
              />
              {category.name}
            </button>
            <Sidebar
              from={'left'}
              onClose={this.onClose}
              onBack={this.closeCategory}
              isOpened={this.state.slug == category.slug}
              saveOverflow={true}
              className={cx(styles.sidebar, styles.fullSidebar)}
              closeClass={styles.closeSidebar}
            >
              <h2>{category.name}</h2>
              {_sortBy(category.children, 'name').map((subcategory, i) => (
                <Link key={i} route={subcategory.url}>
                  <a onClick={this.onClose} className={styles.item}>{subcategory.name}</a>
                </Link>
              ))}
              <Link route={category.url}>
                <a className={cx(styles.item, styles.item_link)} onClick={this.onClose}>{ t('header.showAll') }</a>
              </Link>
            </Sidebar>
          </div>
        ))}
      </Sidebar>
    );
  }

  onClose = () => {
    const {onClose} = this.props;

    if (this.state.slug != '') this.setState({slug: ''});
    onClose();
  }

  changeCategory = (slug) => {
    this.setState({slug: slug});
  }

  closeCategory = () => {
    this.setState({slug: ''});
  }
}

export default Categories;
