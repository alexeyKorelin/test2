import { Component } from 'react';
import cx from 'classnames';
import { Link } from 'routes';
import Status from 'components/Base/User/Status';
import Button from 'components/Base/Button';
import Avatar from 'components/Modules/Avatar';
import IconNew from 'components/Base/IconNew'
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import styles from './index.sass';
import ym from 'react-yandex-metrika';
import Settings from 'config';
import Shop from 'components/Modules/Shop';

@inject('auth')
@inject('actions')
@inject('locales')
@observer
class UserCard extends Component {

  render() {
    const {className, ad, user, auth, locales: { t }} = this.props;
    const userAdvert = user.username === (auth.user && auth.user.username)

    return (
      <If condition={user}>
        <div className={cx(styles.root, className, {[styles.root_inactive]: !user.active})}>
          <If condition={!userAdvert && auth.user && user.active}>
            <Status className={styles.status} active={user.active} />
          </If>
          <If condition={ad}>
            <div className={styles.info}>
              <If condition={!auth.user && user.hidden}>
                <a className={styles.avatar} onClick={this.openAuth}>
                  <Avatar owner={user} size={70} />
                </a>
              </If>
              <If condition={auth.user || (!auth.user && !user.hidden)}>
                <Link route={userAdvert ? '/me' : user.url}>
                  <a className={styles.avatar}>
                    <Avatar owner={user} size={70} />
                  </a>
                </Link>
              </If>
              <div className={styles.name}>
                <If condition={!auth.user && user.hidden}>
                  <a className={styles.name} onClick={this.openAuth}>{user.first_name}</a>
                </If>
                <If condition={auth.user || (!auth.user && !user.hidden)}>
                  <Link route={userAdvert ? '/me' : user.url}>
                    <a className={styles.name}>{user.first_name}</a>
                  </Link>
                </If>
              </div>
              <If condition={auth.user}>
                <div className={styles.seller}>
                  {userAdvert ? null : t('profile.seller')}
                  <If condition={user.username}>
                    <Link route={userAdvert ? '/me' : user.url}>
                      <a className={styles.username}>@{user.username}</a>
                    </Link>
                  </If>
                </div>
              </If>
              <If condition={!auth.user}>
                <div className={styles.seller}>
                  {t('profile.seller')}
                  <If condition={!user.hidden}>
                    <Link route={user.url}>
                      <a className={styles.username}>@{user.username}</a>
                    </Link>
                  </If>
                </div>
              </If>
            </div>
          </If>
          <If condition={!ad}>
            <div className={styles.info}>
              <div className={styles.avatar}>
                <Avatar owner={user} size={70} />
              </div>
              <div className={styles.seller}>
                <If condition={user.username}>
                  <Link route={userAdvert ? '/me' : user.url}>
                    <a className={styles.username}>@{user.username}</a>
                  </Link>
                </If>
              </div>
              <div className={styles.name}>
                <Link route={userAdvert ? '/me' : user.url}>
                  <a className={styles.name}>{user.first_name ? user.first_name : null}</a>
                </Link>
              </div>
              {user.description && <div className={styles.description}>{user.description}</div>}
            </div>
          </If>
          <If condition={user.since}>
            <div className={styles.date}>
              { t('profile.registered') } { moment(user.since).format('DD.MM.YYYY') }
            </div>
          </If>
          <If condition={(auth.user && !userAdvert) || !user.hidden}>
            <div className={ad ? styles.controls : styles.controls_long}>
              <Button
                onClick={this.contactHandler}
                className={styles.button}
                color={'gradient'}
                block={true}
                external={true}
              >
                {ad ? t('profile.getInTouch') : t('profile.getInTouchWithSeller')}
                <IconNew i={'telegram'} className={styles.telegramIcon} />
              </Button>
            </div>
          </If>
          <If condition={!auth.user && user.hidden}>
            <div className={styles.controls}>
              <Button
                onClick={this.contactHandler}
                className={styles.button}
                color={'gradient'}
                block={true}
              >
                { t('profile.getInTouch') }
                <IconNew i={'telegram'} className={styles.telegramIcon} />
              </Button>
            </div>
          </If>
          {/*{ad && <Button className={styles.link} kind={'link'}>{ t('profile.complain') }</Button>}*/}
        </div>
        <If condition={!ad && user.shops && user.shops.length > 0}>
          <div className={styles.label}>
            {t('profile.userShops')}:
          </div>
          <For each='shop' of={user.shops}>
            <Shop shop={shop} slice={2} user={true} />
          </For>
        </If>
      </If>
    )
  }

  openAuth = () => {
    const {actions} = this.props;
    actions.setAction('unauthorized');
  }

  contactHandler = () => {
    const {user, auth, ad} = this.props;
    if (Settings.stage == 'production') {
      const ev = ad ? 'ContactUserFromAd' : 'ContactUser';
      ym('reachGoal', ev);
    }
    if (!auth.user && user.hidden) {
      this.openAuth();
    } else {
      window.open(user.tg, '_blank')
    }
  }

}

UserCard.displayName = 'Modules/Ad/UserCard';

export default UserCard;
