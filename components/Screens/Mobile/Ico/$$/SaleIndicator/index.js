import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import Settings from 'config';
import Timer from 'components/Screens/Ico/$$/Base/Timer';
import Indicator from 'components/Screens/Ico/$$/Base/Indicator';
import Markers from 'components/Screens/Ico/$$/Base/Markers';
import Button from 'components/Base/Button';
import CollectedIndicator from 'components/Screens/Ico/$$/Base/CollectedIndicator';

const SaleIndicator = inject('locales')(observer(({className, percent, locales: {t}}) =>
  <div className={cx(styles.root, className)}>
    <div className={styles.root__inner}>
      <div className={styles.markers}>
        <Markers size='sm' />
      </div>
      <CollectedIndicator className={styles.indicator} />
      <Timer size='sm' className={styles.timer} />
    </div>
    <Button 
      href={t('ico.common.buy_tokens.href')}
      target='_blank'
      className={styles.buy} 
      kind='icoCircled' 
      color='icoGradient'
    >{t('ico.common.buy_tokens.title')}</Button>
  </div>
))

export default SaleIndicator;
