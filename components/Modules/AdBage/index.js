import React, {Component} from 'react';
import cx from 'classnames';
import {inject, observer} from 'mobx-react';
import Icon from 'components/Base/Icon';
import Bage from 'components/Base/Bage';
import LikeButton from 'components/Modules/LikeButton';
import {Router, Link} from 'routes';
import styles from './index.sass';
import LazyLoad from 'react-lazyload';
import Loader from 'components/Base/Loader';

@inject('auth')
@inject('actions')
@observer
class AdBage extends Component {
  render() {
    const {ad, auth: {user}, kind, showCategory, showSubcategory, isIndex, isMyAds, userShop, className} = this.props;
    const status = (isMyAds || userShop) ? ad.fullStatus : false;
    const isLiked = user && user.isLiked(ad.uid);

    return (
      <div
        className={cx(
          styles.root,
          styles[`root_${kind ? kind : 'default'}`],
          {[styles.root_inactive]: ((isMyAds || userShop) && !ad.isActive)},
          className
        )}
      >
        <Link route={ad.url} prefetch>
          <a className={styles.a}>
            <div className={styles.top}>
              <If condition={ad.avatar}>
                <LazyLoad placeholder={<Loader/>}>
                  <img className={styles.image} src={ad.avatar.thumb} alt={ad.name} title={ad.name} />
                </LazyLoad>
              </If>
              <If condition={(!isIndex && status && status.slug !== 'moderation') || isMyAds || userShop}>
                <button className={styles.editLink} onClick={this.edit}>
                  <Icon icon="edit-pen" width={10} />
                </button>
              </If>
            </div>
            <div className={styles.bottom}>
              <If condition={(!isIndex && status) || isMyAds || userShop}>
                <Bage
                  className={cx(styles.bage, styles.status)}
                  backgroundColor={status.backgroundColor}
                  borderColor={status.slug == 'draft' ? status.color : null}
                  color={status.color}
                  title={status.name}
                  kind={'rectangle'}
                >{status.name}</Bage>
              </If>
              <div className={styles.title} title={ad.name}>{ad.name}</div>
              <div className={styles.price}>
                <span className={styles.price__value}>{ad.currentPrice}</span>{' '}
                <span className={styles.price__currency}>{ad.currentCoin}</span>
                <span className={styles.price__equal}>≈</span>
                <span className={styles.price__usd}>{ad.usd_price} $</span>
              </div>
              <If condition={(!userShop && !isMyAds) || isIndex}>
                <LikeButton
                  className={styles.likeButton}
                  onClick={this.like}
                  active={isLiked}
                />
              </If>
            </div>
          </a>
        </Link>
        <div className={cx(styles.bar, {[styles.bar_user]: isMyAds || userShop})}>
          <If condition={(showCategory && !isIndex) || isMyAds || (!userShop && showCategory)}>
            <Link route={ad.category.url}>
              <a className={styles.categoryLink}>
                <Bage
                  className={cx(styles.bage, styles.category)}
                  backgroundColor={ad.category.color}
                  title={ad.category.name}
                >{ad.category.name}</Bage>
              </a>
            </Link>
          </If>
          <If condition={showSubcategory || (!isIndex && isMyAds && userShop)}>
            <Link route={ad.subcategory.url}>
              <a className={styles.categoryLink}>
                <Bage
                  className={cx(styles.bage, styles.category)}
                  color={ad.subcategory.color}
                  title={ad.subcategory.name}
                >{ad.subcategory.name}</Bage>
              </a>
            </Link>
          </If>
        </div>
      </div>
    );
  }

  like = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    const {auth, ad, actions} = this.props;
    const {user} = auth;

    if (user) {
      const uid = ad.uid;
      user.updateLikedStore(uid);
    } else {
      actions.setAction('unauthorized');
    }
  }

  edit = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    const {ad} = this.props;
    ad.goEdit();
  }
}


AdBage.displayName = 'Modules/AdBage';

export default AdBage;
