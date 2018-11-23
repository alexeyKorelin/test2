import React, {Component} from 'react';
import cx from 'classnames';
import { inject, observer } from 'mobx-react';
import Statuses from 'components/Modules/Statuses';
import AdsList from 'components/Modules/AdsList';
import FixedTop from 'components/Modules/FixedTop';
import {Container} from 'components/Base/Grid';
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
      <Container className={styles.root}>
        <h1 className={styles.h1}>{t('header.myAds')}<span className={cx(styles.count, {[styles.count_zero]: !count})}>{count}</span></h1>
        <If condition={adverts && adverts.length > 0}>
          <FixedTop className={styles.statuses}>
            <Statuses onChange={this.onChange} />
          </FixedTop>
        </If>
        <AdsList
          list={adverts}
          columnSize={'1-5'}
          auth={auth}
          isAds
          isMyAds
        />
      </Container>
    )
  }
}

Ads.displayName = 'Screens/Ads';

export default Ads;
