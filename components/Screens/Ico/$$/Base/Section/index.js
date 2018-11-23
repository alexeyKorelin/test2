import cx from 'classnames';
import styles from './index.sass';

const Section = ({className, children, ...props}) =>
  <div className={cx(styles.root, className)} {...props}>{children}</div>

export default Section;
