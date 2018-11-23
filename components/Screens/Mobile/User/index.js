import React, {Component} from 'react';
import {Link} from 'routes';
import { inject, observer } from 'mobx-react';
import AdsList from 'components/Modules/Mobile/AdsList';
import UserCard from 'components/Modules/UserCard';
import styles from './index.sass';

@inject('auth')
@inject('user')
@inject('locales')
@observer
class User extends Component {
  render() {
    const {auth, locales: { t }} = this.props;
    const user = this.props.user.current;
    if (!user) return <div></div>

    return (
      <div>
        <h2 className={styles.head}>{user.username}</h2>
        <UserCard user={user} />
        <h2 className={styles.head_adverts}>{ t('profile.ads') } <span className={styles.count}>{user.adverts.length}</span></h2>
        <AdsList
          list={user.adverts}
          columnsCount={2}
          finished={true}
          emptyDescription={ t('profile.noUserAds') }
          emptyImage
          showCategory
          useLimiter
        />
      </div>
    );
  }
}

export default User;
