import cx from 'classnames';
import { Row, Col } from 'components/Base/Grid';
import Button from 'components/Base/Button';
import styles from './index.sass';
import Settings from 'config';
import {inject, observer} from 'mobx-react';

const AdsIsEmpty = inject('locales')(observer(({className, size, locales: {t}, auth, user}) => {
  const rootSize = size ? size : 'default';
  const myUser = user.username === (auth.user && auth.user.username)

  return (
    <div className={cx(styles.root, className, {[styles[`root_${rootSize}`]]: rootSize})}>
      <div className={styles.description}>
        <If condition={myUser}>
          {t('myAds.empty')}
        </If>
        <If condition={!myUser}>
          {user.shops ? t('ads.emptyAdsListButHasShop') : t('ads.emptyAdsList')}
        </If>
      </div>
      <If condition={myUser}>
        <Button 
          href={'/new_ad'}
          className={styles.newAd}
          kind={'circled'}
          color={'gradient'}  
          prefetch
        >{t('myAds.createAd')}</Button><br />
      </If>
      <img 
        className={styles.ads} 
        src={`${Settings.assetHost}/assets/ads${size ? `-${size}` : ``}.jpg`} 
        title={t('myAds.empty')} 
      />
    </div>
  )
}));

AdsIsEmpty.displayName = 'Modules/AdsIsEmpty';

export default AdsIsEmpty;
