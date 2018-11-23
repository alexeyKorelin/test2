import React from 'react';
import {Link} from 'routes';
import Icon from 'components/Base/Icon';
import styles from './index.sass';

const Logo = props => (
  <Link route="/main">
    <a className={styles.root}>
      <Icon icon="logo" height={50}/>
    </a>
  </Link>
);

Logo.displayName = 'Modules/Header/Logo';

export default Logo;
