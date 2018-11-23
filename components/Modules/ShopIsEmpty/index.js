import cx from 'classnames';
import Button from 'components/Base/Button';
import styles from './index.sass';
import Settings from 'config';
import {inject, observer} from 'mobx-react';

const ShopIsEmpty = inject('locales')(observer(({className, size, userShop, locales: {t}}) => {
  const rootSize = size ? size : 'default';

  return (
    <div className={cx(styles.root, className, {[styles[`root_${rootSize}`]]: rootSize})}>
      <div className={styles.description}>{userShop ? t('myShops.emptyAds') : t('shops.emptyAdsList')}</div>
      <If condition={userShop}>
        <Button 
          href={'/new_ad'}
          className={styles.newAd}
          kind={'circled'}
          color={'gradient'}  
          prefetch
        >{t('createAd.buttons.createAd')}</Button><br />
      </If>
      <img 
        className={styles.ads} 
        src={`${Settings.assetHost}/assets/shops${size ? `-${size}` : ``}.png`} 
        title={t('myAds.empty')} 
      />
    </div>
  )
}));

ShopIsEmpty.displayName = 'Modules/ShopIsEmpty';

export default ShopIsEmpty;