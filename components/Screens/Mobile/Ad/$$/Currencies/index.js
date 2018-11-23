import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import Checkbox from 'components/Base/Checkbox';
import IconNew from 'components/Base/IconNew';

const Currencies = inject('locales')(observer(({className, archived, prices, locales: {t}}) => (
  <div className={cx(styles.root, className, {[styles.root_archived]: archived})}>
    <span className={styles.title}>{t('ad.toPay')}</span>
    {prices.map(price => (
      <IconNew 
        key={price.coin} 
        className={styles.coin} 
        title={price.coin.toLocaleUpperCase()}
        i={price.coin} 
        size={price.coin === 'dash' ? 5 : 8} 
      />
    ))}
  </div>
)))

Currencies.displayName = 'Modules/Ad/Mobile/Currencies';

export default Currencies;
