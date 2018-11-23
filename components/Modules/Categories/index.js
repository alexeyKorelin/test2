import React, {Component} from 'react';
import cx from 'classnames';
import { inject, observer } from 'mobx-react';
import styles from './index.sass';
import _uniqBy from 'lodash/uniqBy';
import Bage from 'components/Base/Bage';

@inject('auth')
@inject('locales')
@observer
class Categories extends Component {
  state = {
    current: 'all'
  }

  componentDidMount() {
    const { auth, onChange, shop } = this.props
    const adverts = shop ? shop.adverts : auth.user.adverts
    const possibleStatuses = shop.categories
    const localStatus = localStorage.getItem('adsCategory')
    const includesLocalStatus = localStatus !== 'all' ? possibleStatuses.some(possible => possible.slug === localStatus) : true
    if (!includesLocalStatus) localStorage.setItem('adsCategory', 'all')
    const updatedStatus = localStorage.getItem('adsCategory')
    this.setState({ current: updatedStatus })
    const adsList = updatedStatus !== 'all' ? adverts.filter(a => a.category_slug === updatedStatus) : adverts
    onChange(adsList)
  }

  onSort = (slug) => {
    const { auth, shop } = this.props
    localStorage.setItem('adsCategory', slug)
    const adverts = shop ? shop.adverts : auth.user.adverts
    this.setState({
      current: slug
    })
    this.props.onChange(adverts.filter(a => a.category_slug === slug))
  }

  getAll = () => {
    const { auth, shop } = this.props
    this.setState({current: 'all'})
    localStorage.setItem('adsCategory', 'all')
    const adverts = shop ? shop.adverts : auth.user.adverts
    this.props.onChange(adverts)
  }

  render() {
    const {current} = this.state;
    const {className, auth, nowrap, locales: {t}, shop} = this.props;
    const adverts = shop ? shop.adverts : auth.user.adverts
    const categories = shop.categories;
    
    return adverts ? (
      <div className={cx(styles.root, className, nowrap ? styles.root_nowrap : styles.root_wrap)}>
        <div className={styles.root__inner}>
          <div className={styles.categories}>
            <div
              className={cx(styles.category, styles.all, {[styles.selected]: current === 'all'})}
              onClick={this.getAll}
            >{t('statuses.all')}</div>
            {categories.map((category, i) => (
              <Bage
                key={i}
                className={cx(styles.category, {[styles.selected]: current === category.slug})}
                backgroundColor={category.color}
                borderColor={category.color}
                color={'#fff'}
                onClick={() => this.onSort(category.slug)}
              >{category.name}</Bage>
            ))}
          </div>
        </div>
      </div>
    ) : (null)
  }
}

Categories.displayName = 'Modules/Categories';

export default Categories;