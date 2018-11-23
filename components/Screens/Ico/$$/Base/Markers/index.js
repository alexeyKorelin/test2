import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import {tToArray} from 'utils/utils';

const Markers = inject('locales')(observer(({className, locales: {t}, size}) => 
  <div className={cx(styles.root, className, styles[`root_${size || 'default'}`])}>
    <For each='item' index='i' of={tToArray(t(`ico.sale.stages`, {returnObjects: true}))}>
      <div key={i} className={cx(styles.marker, {[styles.marker_active]: i == t('ico.sale.active')})}>
        <div className={styles.marker__marker} />
        <div className={styles.marker__title}>{size === 'sm' ? item.shortname : item.fullname}</div>
      </div>
    </For>
  </div>
));

export default Markers;
