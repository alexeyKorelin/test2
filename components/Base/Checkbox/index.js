import React from 'react';
import Icon from 'components/Base/Icon';
import cx from 'classnames';
import styles from './index.sass';
import {observer} from 'mobx-react';
import IconNew from 'components/Base/IconNew';

const coinSizes = {
  'dash': 12,
  'btc': 10,
}

const Checkbox = observer(({label, className, labelClassName, coin, skin, field, size, showIcon, option, onChange, value, checked, ...props}) => {
  switch (skin) {
    case 'switch':
      return (
        <label 
          className={cx(
            styles.switch, 
            className,
            {[styles[`switch_` + size]]: !!size}
          )}
        >
          <input value={field.value} onChange={onChange} type="checkbox" checked={field.value == true} className={styles.switch__input} />
          <span className={cx(styles.switch__label, labelClassName)}>{label}</span>
        </label>
      );
      break;
    case 'currency':
      return (
        <label
          className={cx(
            styles.currency,
            className,
            {[styles[`size_` + size]]: !!size},
            {[styles[`currency_` + option]]: !!option}
          )}
        >
          <input type="checkbox" className={styles.currency__input} value={value} checked={checked} onChange={onChange} />
          <span className={cx(styles.currency__label, {[props.checked]: styles.current__label_active})}>
            { showIcon && props.checked &&
              <IconNew className={styles.currency} i={coin} size={coinSizes[coin] || 10} />
            }
            {label}
          </span>
        </label>
      );
      break;
    default:
    return (
      <label 
        className={cx(
          styles.checkbox, 
          className,
          {[styles[`checkbox_` + size]]: !!size}
        )}
      >
        <input type="checkbox" className={styles.checkbox__input} value={value} checked={checked} onChange={onChange} />
        <div className={styles.checkbox__rectangle}>
          <Icon className={styles.checkbox__icon} icon={'checkbox'} width={10} />
        </div>
        {label ? <span className={cx(styles.checkbox__label, labelClassName)}>{label}</span> : null}
      </label>
    );
    break;
  };
});

export default Checkbox;
