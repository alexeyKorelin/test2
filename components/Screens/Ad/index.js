import React, {Component} from 'react';
import {Container, Row, Col} from 'components/Base/Grid';
import {Link} from 'routes';
import AdPath from 'components/Modules/AdPath';
import UserCard from 'components/Modules/UserCard';
import ShopCard from 'components/Modules/ShopCard';
import IconNew from 'components/Base/IconNew'
import * as S from './$$';
import cx from 'classnames'
import { inject, observer } from 'mobx-react'
import styles from './index.sass';

@inject('advert')
@inject('auth')
@observer
class Ad extends Component {
  render () {
    const ad = this.props.advert.current;
    if (!ad) return null;

    const { auth } = this.props;
    const sameAdverts = this.props.advert.same_adverts_store;
    const { user } = auth;
    const isShop = ad.owner && ad.owner.$treenode.type.name == "Shop" ? true : false;
    const userAdverts = user && ad ? (isShop ? user.isShops(ad.owner.domain) : user.isAdverts(ad.owner.username)) : false;
    const status = userAdverts ? ad.fullStatus : false;
    const isLiked = ad ? (user && user.isLiked(ad.uid)) : false;
    const archived = status && (status.slug === 'archived');
   
    return (
      <Container className={styles.root}>
        <AdPath>
          <Link route="/main"><a href={'/main'}><IconNew i={'home'} size={20} /></a></Link>
          <span>{">"}</span>
          <Link route={ad.category.url}><a>{ad.category.name}</a></Link>
          <span>{">"}</span>
          <Link route={ad.subcategory.url}><a>{ad.subcategory.name}</a></Link>
          <span>{">"}</span>
          <Link route={ad.url}><a>{ad.name}</a></Link>
        </AdPath>
        <Row indents={5}>
          <Col size={9} indents={10}>
            <Row indents={5} className={styles.left}>
              <div className={styles.mainRow}>
                <div className={styles.gallery}>
                  <S.Gallery list={ad.images} archived={archived} />
                </div>
                <div className={styles.information}>
                  <S.Top
                    archived={archived}
                    ad={ad}
                    auth={auth}
                    userAdverts={userAdverts}
                    isLiked={isLiked}
                    status={status}
                  />
                  <h1 className={styles.title}>{ad.name}</h1>
                  <S.Options className={styles.options} ad={ad} archived={archived} />
                  <If condition={ad.coin && ad.prices.length > 0}>
                    <S.Price
                      className={styles.price}
                      prices={ad.prices}
                      coin={ad.coin}
                      archived={archived}
                      usd_price={ad.usd_price}
                    />
                  </If>
                </div>
              </div>
              <div className={styles.infoRow}>
                {(ad.description) &&
                  <S.Description className={styles.description} description={ad.description} archived={archived} />
                }
              </div>
            </Row>
          </Col>
          <Col className={styles.sidebar} size={3} indents={10}>
            <If condition={ad.owner_type === 'User'}>
              <UserCard className={styles.user} ad={ad} user={ad.owner} />
            </If>
            <If condition={ad.owner_type === 'Shop'}>
              <ShopCard className={styles.user} shop={ad.owner} ad={ad} />
            </If>
            <S.Language ad={ad} userAdverts={userAdverts} status={status} className={styles.language} />
          </Col>
        </Row>
        {(sameAdverts && sameAdverts.fetched) &&
          <S.SameAdverts className={styles.sameAdverts} list={sameAdverts.adverts} auth={auth} />
        }
      </Container>
    )
  }
}

export default Ad;
