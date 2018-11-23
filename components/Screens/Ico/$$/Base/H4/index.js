import cx from 'classnames';
import styles from './index.sass';

const H4 = ({className, children, align}) =>
  <h4
    className={cx(
      styles.root, 
      className,
      styles[`root_${align ? align : 'center'}`]
    )}
    dangerouslySetInnerHTML={{__html: children}}
  />

export default H4;
