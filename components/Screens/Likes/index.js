import React, {Component} from 'react';
import cx from 'classnames';
import { inject, observer } from 'mobx-react';
import AdsList from 'components/Modules/AdsList';
import {Container} from 'components/Base/Grid';
import styles from './index.sass';

@inject('auth')
@inject('locales')
@observer
class Likes extends Component {
  render() {
    const {auth, locales: { t }} = this.props;
    const {user} = auth;
    const count = user.liked_store.adverts.length;
    const likedAdverts = user.liked_store.adverts.slice();

    return (
      <Container className={styles.root}>
        <div className={styles.top}>
          <h1 className={styles.h1}>{ t('favs.fav') }<span className={cx(styles.count, {[styles.count_zero]: !count})}>{count}</span></h1>
          {/* <button type="button" className={styles.seeAll}>{ t('favs.showAll') }</button> */}
        </div>
        <AdsList
          list={likedAdverts}
          columnSize={'1-5'}
          emptyDescription={ t('favs.emptyAdsList') }
          auth={auth}
          showCategory={true}
        />
      </Container>
    )
  }
}

Likes.displayName = 'Screens/Likes';

export default Likes;
