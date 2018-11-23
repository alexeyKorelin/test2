import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import { inject, observer } from 'mobx-react';
import Shop from 'components/Modules/Shop';
import ShopsIsEmpty from 'components/Modules/ShopsIsEmpty';
import Button from 'components/Base/Button';
import ShopModal from 'components/Modules/ShopModal';

@inject('locales')
@inject('shops')
@inject('auth') @observer
class Shops extends Component {

  render() {
    const {auth, shops, locales: {t}} = this.props;
    const {user} = auth;
    const count = (user.shops && user.shops.length) || 0;

    return (
      <div>
        <h1 className={styles.h1}>{t('header.myShops')}<span className={cx(styles.count, {[styles.count_zero]: !count})}>{count}</span></h1>
        <If condition={user.shops && user.shops.length > 0}>
          <For each='shop' of={user.shops}>
            <Shop shop={shop} slice={1} />
          </For>
        </If>
        <If condition={user.shops && user.shops.length == 0}>
          <ShopsIsEmpty className={styles.shopsIsEmpty} onClick={shops.buildShop} />
        </If>
        <div className={styles.controls}>
          <Button kind={'circled'} color={'gradient'} className={styles.createAd} onClick={shops.buildShop}>
            {t('profile.createShop')}
          </Button>
        </div>
        <ShopModal shop={shops.editingShop} size={'sm-fullsize'} />
      </div>
    )
  }
}

export default Shops;