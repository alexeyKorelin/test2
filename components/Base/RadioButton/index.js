import React from 'react';
import cx from 'classnames';
import styles from './index.sass';

const RadioButton = ({label, className, kind,...props}) => (
  <label className={cx(styles.root, className)}>
    {label}
    <input {...props} type="radio" className={styles.input} />
    <span className={styles.label} />
  </label>
);

export default RadioButton;
