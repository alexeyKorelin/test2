import React, {Component} from 'react';
import cx from 'classnames';
import { inject, observer } from 'mobx-react';
import styles from './index.sass';
import _uniqBy from 'lodash/uniqBy';

@inject('auth')
@inject('locales')
@observer
class Statuses extends Component {
  state = {
    current: 'all'
  }

  componentDidMount() {
    const { auth, onChange, shop } = this.props
    const adverts = shop ? shop.adverts : auth.user.adverts
    const possibleStatuses = _uniqBy(adverts.map(advert => advert.fullStatus), 'slug')
    const localStatus = localStorage.getItem('adsStatus')
    const includesLocalStatus = localStatus !== 'all' ? possibleStatuses.some(possible => possible.slug === localStatus) : true
    if (!includesLocalStatus) localStorage.setItem('adsStatus', 'all')
    const updatedStatus = localStorage.getItem('adsStatus')
    this.setState({ current: updatedStatus })
    const adsList = updatedStatus !== 'all' ? adverts.filter(a => a.fullStatus.slug === updatedStatus) : adverts
    onChange(adsList)
  }

  onSort = (status) => {
    const { auth, shop } = this.props
    localStorage.setItem('adsStatus', status)
    const adverts = shop ? shop.adverts : auth.user.adverts
    this.setState({
      current: status
    })
    this.props.onChange(adverts.filter(a => a.fullStatus.slug === status))
  }

  getAll = () => {
    const { auth, shop } = this.props
    this.setState({current: 'all'})
    localStorage.setItem('adsStatus', 'all')
    const adverts = shop ? shop.adverts : auth.user.adverts
    this.props.onChange(adverts)
  }

  render() {
    const {current} = this.state;
    const {className, auth, nowrap, locales: {t}, shop} = this.props;
    const adverts = shop ? shop.adverts : auth.user.adverts
    const statuses = _uniqBy(adverts.map(advert => advert.fullStatus), 'slug');
    const order = ['active', 'moderation', 'draft', 'archived', 'denied', 'blocked']
    const statusesList = order.map(o => statuses.find(status => status.slug === o)).filter(item => !!item)

    return adverts ? (
      <div className={cx(styles.root, className, nowrap ? styles.root_nowrap : styles.root_wrap)}>
        <div className={styles.root__inner}>
          <div className={styles.statuses}>
            <div
              className={cx(styles.status, styles.all, {[styles.selected]: current === 'all'})}
              onClick={this.getAll}
            >{t('statuses.all')}</div>
            {statusesList.map((status, i) => (
              <div
                key={i}
                className={cx(styles.status, styles[status.slug], {[styles.selected]: current === status.slug})}
                onClick={() => this.onSort(status.slug)}
              >{status.name}</div>
            ))}
          </div>
        </div>
      </div>
    ) : (null)
  }
}

Statuses.displayName = 'Modules/Statuses';

export default Statuses;
