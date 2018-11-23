import cx from 'classnames';
import styles from './index.sass';

const Bage = ({ className, children, backgroundColor, color, borderColor, kind, ...props }) => (
  <span 
    {...props} 
    className={cx(
      styles.root, 
      className,
      styles[`root_${kind ? kind : 'default'}`]
    )}
    style={{
      backgroundColor: backgroundColor,
      color: color ? color : borderColor,
      borderColor: borderColor ? borderColor : backgroundColor
    }}
  >{children}</span>
);

Bage.displayName = 'components/Base/Bage';

export default Bage;
