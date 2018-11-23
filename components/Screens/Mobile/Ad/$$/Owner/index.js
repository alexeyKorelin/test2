import React, { Component } from 'react';
import cx from 'classnames';
import { inject, observer } from 'mobx-react';
import styles from './index.sass';
import { Link } from 'routes';
import Button from 'components/Base/Button';
import Avatar from 'components/Modules/Avatar';

@inject('locales')
@inject('actions')
@observer
class Owner extends Component {
  render() {
    const {className, auth: { user }, me, owner, locales: { t }, isShop} = this.props;
    const userShop = isShop && user && user.isShops(owner.domain)
    const hidden = !isShop && !user && owner.hidden;

    return isShop ? (
      <div className={cx(styles.root, className, {[styles.root_me]: me})}>
        <Link route={owner.url} prefetch>
          <a className={styles.avatarLink}>
            <Avatar className={styles.avatar} owner={owner} size={40} />
          </a>
        </Link>
        <div className={styles.info}>
          <Link route={owner.url} prefetch>
            <a className={styles.title}>{userShop ? `${t('profile.itsYourShop')} ${owner.name}` : `${t('profile.shop')} ${owner.name}`}</a>
          </Link>
          <span className={styles.date}>{`${t('profile.registeredFrom')} ${owner.date}`}</span>
        </div>
        {!userShop && (
          <Button
            className={styles.link}
            href={owner.user.tg}
            kind={'primary'}
            color={'gradient'}
            external
            target={'_blank'}
          >{ t('profile.getInTouch') }</Button>
        )}
      </div>
    ) : (
      <div className={cx(styles.root, className, {[styles.root_me]: me})}>
        {hidden ?
          <a onClick={this.openAuth} className={styles.avatarLink}>
            <Avatar className={styles.avatar} owner={owner} size={40} />
          </a>
        :
          <Link route={me ? '/me' : owner.url} prefetch>
            <a className={styles.avatarLink}>
              <Avatar className={styles.avatar} owner={owner} size={40} />
            </a>
          </Link>
        }
        <div className={styles.info}>
          {hidden ?
            <a onClick={this.openAuth} className={styles.title}>{t('profile.seller')}</a>
          :
            <Link route={me ? '/me' : owner.url} prefetch>
              <a className={styles.title}>{me ? `${t('profile.itsYou')} ${owner.username}` : `${t('profile.seller')} ${owner.username}`}</a>
            </Link>
          }
          {owner.date &&
            <span className={styles.date}>{`${t('profile.registeredFrom')} ${owner.date}`}</span>
          }
        </div>
        {!me && (
          hidden ?
            <Button
              onClick={this.openAuth}
              className={styles.link}
              kind={'primary'}
              color={'gradient'}
            >{ t('profile.getInTouch') }</Button>
          :
            <Button
              className={styles.link}
              href={owner.tg}
              kind={'primary'}
              color={'gradient'}
              external
              target={'_blank'}
            >{ t('profile.getInTouch') }</Button>
        )}
      </div>
    )
  }

  openAuth = () => {
    const {actions} = this.props;
    actions.setAction('unauthorized');
  }
}

Owner.displayName = 'Modules/Mobile/Ad/Owner';

export default Owner;