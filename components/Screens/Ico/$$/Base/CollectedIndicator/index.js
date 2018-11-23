import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import Indicator from '../Indicator';
import {formatPrice} from 'utils/utils';

const CollectedIndicator = inject('locales')(observer(({className, locales: {t}}) => {
  const course = parseFloat(t('ico.mntl.course'));
  const price = formatPrice(course ? 1 / course : false);
  const collectedPercent = parseFloat(t('ico.sale.collected.value')) / parseFloat(t('ico.sale.want.value')) * 100;

  return (
    <div className={cx(styles.root, className)}>
      <div className={styles.title}>
        <span className={styles.label}>{t('ico.sale.cost')}</span>
        <span className={styles.value}>{formatPrice(price)} ETH</span>
      </div>
      <Indicator className={styles.indicator} percent={collectedPercent} kind='big' />
      <div className={styles.bottom}>
        <div className={styles.collected}>
          <span className={styles.label}>{t('ico.sale.collected.title')}</span>
          <span className={styles.value}>{formatPrice(t('ico.sale.collected.value'))} USD</span>
        </div>
        <div className={styles.want}>
          <span className={styles.label}>{t('ico.sale.want.title')}</span>
          <span className={styles.value}>{formatPrice(t('ico.sale.want.value'))} USD</span>
        </div>
      </div>
    </div>
  );
}));

export default CollectedIndicator;
