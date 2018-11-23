import React, {Component} from 'react';
import cx from 'classnames';
import {Router, Link} from 'routes';
import { inject, observer } from 'mobx-react';
import mobileStyles from './index.sass';
import desktopStyles from 'components/Screens/Ad/index.sass'
import * as Desktop from 'components/Screens/Ad/$$'
import * as Mobile from 'components/Screens/Mobile/Ad/$$';
import Language from 'components/Screens/Ad/$$/Language';

// Desktop imports
import {Container, Row, Col} from 'components/Base/Grid';

@inject('advert')
@inject('auth')
@inject('device')
@observer
class MobileAd extends Component {

  render() {
    const ad = this.props.advert.current;
    if (!ad) return null;

    const {auth, device: { size, isMobile }} = this.props;
    const {user} = auth;
    const isShop = ad.owner && ad.owner.$treenode.type.name == "Shop" ? true : false;
    const userAdverts = user && ad ? (isShop ? user.isShops(ad.owner.domain) : user.isAdverts(ad.owner.username)) : false;
    const status = userAdverts ? ad.fullStatus : false;
    const sameAdverts = this.props.advert.same_adverts_store;
    const archived = status && (status.slug === 'archived');
    const isLiked = ad ? (user && user.isLiked(ad.uid)) : false;

    const mobileVersion = (
      <div className={cx(mobileStyles.root, {[mobileStyles.root_archived]: archived})}>
        <div className={mobileStyles.main}>
          <Mobile.Top archived={archived} ad={ad} auth={auth} userAdverts={userAdverts} status={status} isLiked={isLiked} />
          <Mobile.Gallery className={mobileStyles.gallery} list={ad.images} />
          {(ad.coin && ad.prices.length > 0) &&
            <Mobile.Price className={mobileStyles.price} coin={ad.coin} prices={ad.prices} archived={archived} usd_price={ad.usd_price} />
          }
          <Mobile.Currencies className={mobileStyles.currencies} prices={ad.prices} archived={archived} />
          <Mobile.Categories className={mobileStyles.categories} archived={archived} ad={ad} />
          <Mobile.Points className={mobileStyles.points} archived={archived} ad={ad} />
          <h1 className={mobileStyles.h1}>{ad.name}</h1>
          <Mobile.Options className={mobileStyles.options} ad={ad} archived={archived} />
          <Mobile.Description className={mobileStyles.description} description={ad.description} archived={archived} />
        </div>
        <Mobile.Owner className={mobileStyles.user} me={userAdverts} auth={auth} owner={ad.owner} isShop={isShop} />
        <Language ad={ad} userAdverts={userAdverts} status={status} className={mobileStyles.language} />
        {/*{ad && <Button className={styles.complain} kind={'link'}>Пожаловаться на объявление</Button>}*/}
        {(sameAdverts && sameAdverts.fetched) &&
          <Mobile.Same className={mobileStyles.same} auth={auth} adverts={sameAdverts.adverts} />
        }
      </div>
    )

    const tabletVersion = (
      <div className={cx(mobileStyles.root, {[mobileStyles.root_archived]: archived})}>
        <div className={mobileStyles.card}>
          <Row indents={5}>
            <Col size={4} indents={0}>
              <div className={mobileStyles.gallery}>
                <Desktop.Gallery list={ad.images} archived={archived} />
              </div>
            </Col>
            <Col size={8} indents={0}>
              <div className={desktopStyles.information}>
                <Desktop.Top
                  archived={archived}
                  ad={ad}
                  auth={auth}
                  userAdverts={userAdverts}
                  isLiked={isLiked}
                  status={status}
                />
                <h1 className={desktopStyles.title}>{ad.name}</h1>
                <Desktop.Options className={desktopStyles.options} ad={ad} archived={archived} />
                <If condition={ad.coin && ad.prices.length > 0}>
                  <Desktop.Price
                    className={desktopStyles.price}
                    prices={ad.prices}
                    coin={ad.coin}
                    archived={archived}
                  />
                </If>
              </div>
            </Col>
          </Row>
          <Row indents={5}>
            <Col size={12}>
              <div className={desktopStyles.infoRow}>
                {(ad.description) &&
                  <Desktop.Description
                    className={desktopStyles.description}
                    description={ad.description}
                    archived={archived}
                    togglerClass={mobileStyles.toggler}
                  />
                }
              </div>
            </Col>
          </Row>
        </div>
        <Mobile.Owner className={mobileStyles.user} me={userAdverts} auth={auth} owner={ad.owner} />
        {(sameAdverts && sameAdverts.fetched) &&
          <Mobile.Same className={mobileStyles.same} auth={auth} adverts={sameAdverts.adverts} />
        }
      </div>
    )
    
    return isMobile ? mobileVersion : tabletVersion;
  }
}

MobileAd.displayName = 'Screens/Mobile/Ad';

export default MobileAd;
