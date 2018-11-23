import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import { inject, observer } from 'mobx-react';
import { Container, Row, Col } from 'components/Base/Grid';
import FixedTop from 'components/Modules/FixedTop';
import Statuses from 'components/Modules/Statuses';
import Categories from 'components/Modules/Categories';
import AdsList from 'components/Modules/AdsList';
import ShopCard from 'components/Modules/ShopCard';

@inject('locales')
@inject('shops')
@inject('auth') @observer
class Shop extends Component {
  state = {
    adverts: this.props.shops.current && this.props.shops.current.adverts,
  }

  onChange = (adverts) => {
    this.setState({
      adverts: adverts
    })
  }

  render() {
    const { auth, locales: { t }, shops } = this.props;
    const shop = shops.current;
    const userShop = shop && auth.user && auth.user.isShops(shop.domain)
    const {adverts} = this.state

    if (!shop) return null;

    const advertsCount = shop.adverts.length || 0;
    return (
      <Row>
        <Col indents={10}>
          <h1 className={styles.h1}>{t('profile.seller')} {shop.user.username}</h1>
          <ShopCard shop={shop} />
          <h2 className={styles.h2}>{t('header.myAds')}<span className={cx(styles.count, {[styles.count_zero]: !advertsCount})}>{advertsCount}</span></h2>
          <If condition={advertsCount > 0 && userShop}>
            <FixedTop className={styles.statuses}>
              <Statuses shop={shop} onChange={this.onChange} />
            </FixedTop>
          </If>
          <If condition={shop.adverts.length > 0 && !userShop && shop.categories}>
            <FixedTop className={styles.statuses}>
              <Categories shop={shop} onChange={this.onChange} />
            </FixedTop>
          </If>
          <AdsList
            list={adverts || []}
            auth={auth}
            columnsCount={2}
            adKind={'low'}
            showCategory
            isShop
            userShop={userShop}
          />
        </Col>
      </Row>
    )
  }
}

Shop.displayName = 'Screens/Shop';

export default Shop;