import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import { inject, observer } from 'mobx-react';
import { Container, Row, Col } from 'components/Base/Grid';
import AdPath from 'components/Modules/AdPath';
import {Link} from 'routes';
import IconNew from 'components/Base/IconNew';
import FixedTop from 'components/Modules/FixedTop';
import Statuses from 'components/Modules/Statuses';
import Categories from 'components/Modules/Categories';
import AdsList from 'components/Modules/AdsList';
import ShopCard from 'components/Modules/ShopCard';

@inject('locales')
@inject('actions')
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
    const { auth, locales: { t }, actions, shops } = this.props;
    const shop = shops.current;
    const userShop = shop && auth.user && auth.user.isShops(shop.domain)
    const {adverts} = this.state

    if (!shop) return null;

    return (
      <Container className={styles.root}>
        <AdPath className={styles.breadcrumbs}>
          <Link route="/main"><a href={'/main'}><IconNew i={'home'} size={20} /></a></Link>
          <span>{">"}</span>
          <Link route={shop.url}><a>{shop.name}</a></Link>
        </AdPath>
        <If condition={shop.adverts.length > 0 && userShop}>
          <FixedTop className={styles.statuses}>
            <Statuses shop={shop} onChange={this.onChange} />
          </FixedTop>
        </If>
        <If condition={shop.adverts.length > 0 && !userShop && shop.categories}>
          <FixedTop className={styles.statuses}>
            <Categories shop={shop} onChange={this.onChange} />
          </FixedTop>
        </If>
        <Row>
          <Col size={8} indents={10}>
            <AdsList
              list={adverts || []}
              auth={auth}
              columnsCount={4}
              adKind={'low'}
              showCategory
              isShop
              userShop={userShop}
            />
          </Col>
          <Col size={4} indents={10}>
            <ShopCard shop={shop} />
          </Col>
        </Row>
      </Container>
    )
  }
}

Shop.displayName = 'Screens/Shop';

export default Shop;