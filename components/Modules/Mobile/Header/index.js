import React, {Component} from 'react';
import styles from './index.sass';
import Icon from 'components/Base/Icon';
import {Link} from 'routes';
import Sidebar from 'components/Modules/Mobile/Sidebar';
import cx from 'classnames';
import * as S from './$$';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  displayName = 'Modules/Mobile/Header';

  render() {
    return(
      <header className={styles.root}>
        <S.Menu/>
        <Link route="/main">
          <a className={styles.logo}>
            <Icon icon="logo" height={30} />
          </a>
        </Link>
        <S.Auth/>
      </header>
    );
  }
}

export default Header;
