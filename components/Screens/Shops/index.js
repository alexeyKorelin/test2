import React, {Component} from 'react';
import cx from 'classnames';
import { inject, observer } from 'mobx-react';
import ShopsList from 'components/Modules/ShopsList';
import FixedTop from 'components/Modules/FixedTop';
import {Container} from 'components/Base/Grid';
import styles from './index.sass';
import Button from 'components/Base/Button';
import ShopModal from 'components/Modules/ShopModal';

@inject('locales')
@inject('shops')
@inject('auth') @observer
class Shops extends Component {

  render() {
    const {auth, locales: {t}, shops} = this.props;
    const {user} = auth;
    const count = (user.shops && user.shops.length) || 0;

    return (
      <Container className={styles.root}>
        <h1 className={styles.h1}>
          {t('header.myShops')}
          <span className={cx(styles.count, {[styles.count_zero]: !count})}>{count}</span>
          <Button kind={'circled'} color={'gradient'} className={styles.createAd} onClick={shops.buildShop}>
            {t('profile.createShop')}
          </Button>
        </h1>
        <ShopsList list={user.shops} />
        <ShopModal shop={shops.editingShop} />
      </Container>
    )
  }
}

Shops.displayName = 'Screens/Shops';

export default Shops;