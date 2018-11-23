import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import Settings from 'config';

const Cap = inject('locales')(observer(({className, kind, children, size, locales: {t}, ...props}) =>
  <div 
    className={cx(
      styles.root, 
      className, 
      styles[`root_${kind === 's' ? 'soft' : 'hard'}`],
      styles[`root_${size || 'default'}`]
    )} 
    title={kind === 's' ? t(`ico.cap.softcap.fullname`) : t(`ico.cap.hardcap.fullname`)}
  >
    <div className={styles.circle}>
      <div className={styles.circle__inner}>
        {kind === 's' ? t(`ico.cap.softcap.shortname`) : t(`ico.cap.hardcap.shortname`)}
      </div>
    </div>
    <div className={styles.content}>{children}</div>
  </div>
))

export default Cap;
