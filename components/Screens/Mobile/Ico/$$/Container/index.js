import cx from 'classnames';
import styles from './index.sass';

const Container = ({className, children, ...props}) => {
  return (
    <div className={cx(styles.root, className)} {...props}>
      {children}
    </div>
  )
}

export default Container;
