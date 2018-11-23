import cx from 'classnames';
import styles from './index.sass';
import Icon from 'components/Base/Icon';

const ArrowButton = ({className, arrowClassName, type, onClick}) => (
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
      icon={`blue-arrow-${type}`} 
      width={['top', 'bottom'].includes(type) ? 8 : 6} 
    />
  </button>
);

ArrowButton.displayName = 'Base/ArrowButton';

export default ArrowButton;
