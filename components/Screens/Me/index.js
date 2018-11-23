import React, {Component} from 'react';
import { inject, observer } from 'mobx-react';
import {Container, Row, Col} from 'components/Base/Grid';
import AdsShortList from 'components/Modules/AdsShortList';
import * as S from './$$';
import styles from './index.sass';
import ShopModal from 'components/Modules/ShopModal';

@inject('locales')
@inject('shops')
@inject('auth') @observer
class Me extends Component {

  render() {
    const { auth, locales: { t }, shops } = this.props;
    const { user } = auth;
    const likedAdverts = user.liked_store.adverts.slice();

    return (
      <Container>
        <h1 className={styles.headerTitle}>{ t('profile.title') }</h1>
        <Row>
          <Col size={4}>
            <S.User className={styles.user} user={user} active={user.active} />
            <If condition={user.active}>
              <S.Wallet user={user} />
            </If>
          </Col>
          <Col size={8}>
            <div>
              <AdsShortList
                className={styles.adsList}
                title={ t('profile.favs') }
                seeAllUrl={'/likes'}
                list={likedAdverts}
                auth={auth}
              />
              <AdsShortList
                className={styles.adsList}
                title={ t('profile.myAds') }
                seeAllUrl={'/ads'}
                actionText={ t('profile.createAd') }
                actionUrl={'/new_ad'}
                list={user.adverts}
                auth={auth}
              />
              <AdsShortList
                isShops
                className={styles.adsList}
                title={ t('profile.myShops') }
                seeAllUrl={'/shops'}
                actionText={ t('profile.createShop') }
                onClick={shops.buildShop}
                list={user.shops}
                auth={auth}
              />
              {/* <AdsShortList
                className={styles.adsList}
                title={ t('profile.myOps') }
                list={[]}
                auth={auth}
                comingSoon
              /> */}
              <ShopModal shop={shops.editingShop} />
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Me;
