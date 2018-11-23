import cx from 'classnames';
import styles from './index.sass';

const Main = ({ className, children }) => (
  <div className={cx(styles.root, className)}>{children}</div>
)

Main.displayName = 'Modules/Ad/Main';

export default Main;
