import React, {Component} from 'react';
import { inject, observer } from 'mobx-react';
import AdsList from 'components/Modules/Mobile/AdsList';
import * as S from 'components/Screens/Me/$$';
import commonStyles from 'components/Screens/Me/index.sass';
import FormCollapse from 'components/Base/FormCollapse';
import styles from './index.sass';

@inject('locales')
@inject('auth')
@observer
class Me extends Component {
  render() {
    const {auth: {user}, auth, locales: { t }} = this.props;
    const likedAdverts = user.liked_store.adverts || [];
    const shops = user.shops || [];
    const userAdverts = user.adverts;

    return (
      <div>
        <h2>{ t('profile.title') }</h2>
        <S.User className={commonStyles.user} user={user} active={user.active} />
        <If condition={user.active}>
          <S.Wallet user={user} />
        </If>
        <FormCollapse
          key={'myAds'}
          className={styles.collapse}
          title={this.collapseTitle(t('profile.myAds'), userAdverts.length)}>
          <div className={styles.adList}>
            <AdsList
              list={userAdverts}
              emptyDescription={ t('profile.noYourAds') }
              emptyLink={'/new_ad'}
              emptyLinkText={ t('profile.goToCreation') }
              auth={auth}
              columnsCount={2}
              useLimiter
            />
          </div>
        </FormCollapse>
        <FormCollapse
          key={'likes'}
          className={styles.collapse}
          title={this.collapseTitle(t('profile.favs'), likedAdverts.length)}>
          <div className={styles.adList}>
            <AdsList
              list={likedAdverts}
              emptyDescription={ t('profile.empty') }
              auth={auth}
              columnsCount={2}
            />
          </div>
        </FormCollapse>
        <FormCollapse
          key={'shops'}
          className={styles.collapse}
          title={this.collapseTitle(t('profile.shops'), shops.length)}>
          <div className={styles.adList}>
            <AdsList
              list={shops}
              emptyDescription={ t('profile.empty') }
              auth={auth}
              columnsCount={2}
            />
          </div>
        </FormCollapse>
        {/* <FormCollapse
          key={'deals'}
          className={styles.collapse}
          title={this.collapseTitle(t('profile.myOps'), 0, true)}
          disabled>
        </FormCollapse> */}
      </div>
    )
  }

  collapseTitle (title, count = 0, comingSoon = false) {
    return (
      <span>
        {title}
        <If condition={comingSoon}>
          <span className={styles.collapse__count}>
            Coming soon
          </span>
        </If>
        <If condition={!comingSoon}>
          <span className={styles.collapse__count}>
            {count}
          </span>
        </If>
      </span>
    )
  }
}

export default Me;
