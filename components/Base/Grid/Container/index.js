import cx from 'classnames';
import styles from './index.sass';

const Container = ({className, ...props}) => (
  <div className={cx(styles.root, className)} {...props}>
    {props.children}
  </div>
);

Container.displayName = 'Modules/Grid/Container';

export default Container;
