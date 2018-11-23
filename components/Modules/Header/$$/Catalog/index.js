import React, {Component} from 'react';
import cx from 'classnames';
import {Link} from 'routes';
import { inject, observer } from 'mobx-react';
import styles from './index.sass';
import _sortBy from 'lodash/sortBy';
import Toggle from 'components/Base/Toggle';

@inject('locales')
@observer
class Catalog extends Component {
  state = {
    isOpen: false
  }

  render() {
    const { categories, locales: { t }} = this.props;

    return (
      <div ref={this.setDropdownRef} className={cx(styles.root, this.props.className, {[styles.root_open]: this.state.isOpen})}>
        <button onClick={this.toggle} className={styles.button}>{ t('header.catalog') }</button>
        <Toggle>
          <If condition={this.state.isOpen}>
            <div className={styles.dropdown}>
              <div className={styles.dropdown__inner}>
                {_sortBy(categories, 'name').map((category, i) => (
                  <div key={i} className={styles.dropdown__col}>
                    <Link route={`/${category.slug}`}>
                      <a className={styles.dropdown__category}>{ category.name }</a>
                    </Link>
                    {category.children.length > 0 &&
                      <ul className={styles.dropdown__ul}>
                        {_sortBy(category.children, 'name').map((subcategory, j) => (
                          <li key={j} className={styles.dropdown__li}>
                            <Link route={`/${category.slug}/${subcategory.slug}`}>
                              <a className={styles.dropdown__subcategory}>{ subcategory.name }</a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    }
                  </div>
                ))}
              </div>
            </div>
          </If>
        </Toggle>
      </div>
    );
  }

  componentDidMount () {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setDropdownRef = (node) => {
    this.dropdownRef = node;
  }

  handleClickOutside = (e) => {
    if (this.dropdownRef && !this.dropdownRef.contains(e.target)) {
      this.setState({isOpen: false});
    }
  }

  toggle = () => {
    this.setState({isOpen: !this.state.isOpen});
  }
}

Catalog.displayName = 'Modules/Header/Catalog';

export default Catalog;
