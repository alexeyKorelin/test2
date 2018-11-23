import cx from 'classnames';
import styles from './index.sass';
import Icon from 'components/Base/Icon';

const ArrowButtonLg = ({className, arrowClassName, type, onClick}) => (
  <button
    className={cx(
      styles.root,
      arrowClassName,
      className
    )}
    onClick={onClick}
  >
    <Icon 
      className={cx(
        styles.icon, 
        type ? styles['icon_' + type] : styles['icon_left']
      )} 
      sliderArrowColor={styles.sliderArrowColor} 
      icon={`${type}-arrow-lg`} 
    />
  </button>
);

ArrowButtonLg.displayName = 'Base/ArrowButtonLg';

export default ArrowButtonLg;
