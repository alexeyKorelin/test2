import React from 'react';
import cx from 'classnames';
import {Link} from 'routes';
import styles from './index.sass';

const AdPath = ({className, children}) => (
  <small className={cx(styles.root, className)}>
    {children}
  </small>
);

export default AdPath;
