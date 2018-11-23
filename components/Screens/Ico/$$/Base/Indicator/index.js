import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import Settings from 'config';

const Indicator = inject('locales')(observer(({className, kind, percent}) =>
  <div className={cx(styles.root, className, styles[`root_${kind || 'default'}`])}>
    <div className={styles.root__inner} style={{width: `${percent}%`}} />
  </div>
))

export default Indicator;
