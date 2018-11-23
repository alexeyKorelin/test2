import React, {Component} from 'react';
import cx from 'classnames';
import { inject, observer } from 'mobx-react';
import Statuses from 'components/Modules/Statuses';
import AdsList from 'components/Modules/Mobile/AdsList';
import FixedTop from 'components/Modules/Mobile/FixedTop';
import styles from './index.sass';

@inject('locales')
@inject('auth') @observer
class Ads extends Component {
  state = {
    adverts: this.props.auth.user.adverts,
  }

  onChange = (adverts) => {
    this.setState({
      adverts: adverts
    })
  }

  render() {
    const {auth, locales: {t}} = this.props;
    const {user} = auth;
    const count = user.adverts.length;
    const {adverts} = this.state

    return (
      <div>
        <h1 className={styles.h1}>{t('header.myAds')}<span className={cx(styles.count, {[styles.count_zero]: !count})}>{count}</span></h1>
        <If condition={adverts && adverts.length > 0}>
          <FixedTop>
            <Statuses className={styles.statuses} adverts={adverts} onChange={this.onChange} nowrap />
          </FixedTop>
        </If>
        <AdsList
          list={adverts}
          auth={auth}
          columnsCount={2}
          useLimiter
          isAds
          isMyAds
        />
      </div>
    )
  }
}

export default Ads;
