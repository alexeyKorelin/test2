import cx from 'classnames';
import styles from './index.sass';
import Fixed from 'components/Base/Fixed';

const FixedTop = ({className, children}) => (
  <Fixed
    className={cx(styles.root, className)}
    stickiedClassName={styles.stickied}
    fixedStickiedClassName={styles.fixedStickied}
  >{children}</Fixed>
);

FixedTop.displayName = 'Modules/Mobile/FixedTop';

export default FixedTop;
