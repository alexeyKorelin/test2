import cx from 'classnames';
import styles from './index.sass';

const H2 = ({className, children, align, size}) =>
  <h2 
    className={cx(
      styles.root, 
      className,
      styles[`root_${size || 'default'}`],
      styles[`root_${align ? align : 'center'}`]
    )}
    dangerouslySetInnerHTML={{__html: children}}
  />

export default H2;
