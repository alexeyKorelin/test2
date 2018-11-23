import cx from 'classnames';
import Button from 'components/Base/Button';
import styles from './index.sass';
import Settings from 'config';
import {inject, observer, propTypes} from 'mobx-react';

const ShopsIsEmpty = inject('locales')(observer(({className, size, onClick, locales: {t}}) => {
  const rootSize = size ? size : 'default';

  return (
    <div className={cx(styles.root, className, {[styles[`root_${rootSize}`]]: rootSize})}>
      <div className={styles.description}>{t('myShops.empty')}</div>
      <Button 
        onClick={onClick}
        className={styles.newShop}
        kind={'circled'}
        color={'white'}
      >{t('myShops.createShop')}</Button>
      <img 
        className={styles.shops} 
        src={`${Settings.assetHost}/assets/shops${size ? `-${size}` : ``}.png`}
        title={t('myShops.empty')}
      />
    </div>
  )
}));

ShopsIsEmpty.displayName = 'Modules/ShopsIsEmpty';

export default ShopsIsEmpty;