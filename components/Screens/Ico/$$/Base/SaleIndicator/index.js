import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import Settings from 'config';
import sortBy from 'lodash/sortBy';
import Timer from '../Timer';
import Indicator from '../Indicator';
import Markers from '../Markers';
import CollectedIndicator from '../CollectedIndicator';
import Button from 'components/Base/Button';

const SaleIndicator = inject('locales')(observer(({className, percent, locales: {t}}) => 
  <div className={cx(styles.root, className)}>
    <div className={styles.root__inner}>
      <Markers className={styles.markers} />
      <div className={styles.widgets}>
        <CollectedIndicator className={styles.indicator} />
        <Timer className={styles.timer} />
      </div>
    </div>
    <Button 
      href={t('ico.common.buy_tokens.href')}
      target='_blank'
      className={styles.buy} 
      kind='icoCircled' 
      color='icoGradient'
    >{t('ico.common.buy_tokens.title')}</Button>
  </div>
));

export default SaleIndicator;
