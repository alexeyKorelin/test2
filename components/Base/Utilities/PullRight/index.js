import cx from 'classnames';
import styles from './index.sass';

const PullRight = ({className, children}) => <div className={cx(styles.root, className)}>{children}</div>;

PullRight.displayName = 'Base/Utilities/PullRight';

export default PullRight;