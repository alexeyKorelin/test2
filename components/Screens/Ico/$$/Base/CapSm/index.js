import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import Settings from 'config';

const CapSm = inject('locales')(observer(({className, kind, children, locales: {t}, ...props}) =>
  <div 
    className={cx(
      styles.root, 
      className, 
      styles[`root_${kind === 's' ? 'soft' : 'hard'}`]
    )} 
    title={kind === 's' ? t(`ico.cap.softcap.fullname`) : t(`ico.cap.hardcap.fullname`)}
  >
    <div className={styles.circle}>
      {kind === 's' ? t(`ico.cap.softcap.shortname`) : t(`ico.cap.hardcap.shortname`)}
    </div>
    <div className={styles.content}>{children}</div>
  </div>
))

export default CapSm;
