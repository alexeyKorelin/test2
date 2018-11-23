import React, { Component } from 'react';
import cx from 'classnames';
import { inject, observer } from 'mobx-react';
import {Link} from 'routes';
import * as S from './$$';
import styles from './index.sass'

@inject('auth')
@inject('categories')
class Header extends Component {
  render() {
    const { categories } = this.props.categories;
    const { auth } = this.props;

    return (
      <header className={styles.root}>
        <div className={styles.container}>
          <div className={styles.left}>
            <S.Logo />
          </div>
          <div className={styles.center}>
            <S.Catalog className={styles.catalog} categories={categories} />
            <S.Search className={styles.search} />
            {/*<S.CityPicker className={styles.cityPicker} />*/}
            <S.Language className={styles.language} />
            <S.CreateAd className={styles.createAd} auth={auth} kind={'circled'} color={'reverseGradient'} />
          </div>
          <div className={styles.right}>
            <S.Auth />
          </div>
        </div>
      </header>
    )
  }
}

Header.displayName = 'Modules/Header'

export default Header
