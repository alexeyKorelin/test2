import cx from 'classnames';
import styles from './index.sass';

const Row = ({children, className, indents}) => 
  <div 
    className={cx(
      styles.root, 
      className,
      {[styles[`root_indents_` + indents]]: !!indents}
    )}
  >
    {children}
  </div>;

Row.displayName = 'Modules/Grid/Row';

export default Row;