import cx from 'classnames';
import { Row, Col } from 'components/Base/Grid';
import Button from 'components/Base/Button';
import styles from './index.sass';
import Settings from 'config';

const AnimatedClose = ({className, active, reverse, onClick}) => (
  <button  
    onClick={onClick} 
    className={cx( 
      styles.root,
      className,
      {[styles.root_reverse]: reverse},
      {[styles.root_active]: active}
    )}
  >
    <span className={styles.root__inner}>
      <span className={styles.root__span} />
      <span className={styles.root__span} />
      <span className={styles.root__span} />
    </span>
  </button>
);

AnimatedClose.displayName = 'Modules/AnimatedClose';

export default AnimatedClose;
