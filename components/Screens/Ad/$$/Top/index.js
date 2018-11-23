import React, { Component } from 'react';
import cx from 'classnames';
import styles from './index.sass';
import { inject, observer } from 'mobx-react';
import { Link, Router } from 'routes';
import * as S from '../';
import Bage from 'components/Base/Bage';
import LikeButton from 'components/Modules/LikeButton';
import IconNew from 'components/Base/IconNew';
import Dropdown from 'components/Base/Dropdown';
import API from 'utils/api';
import Icon from 'components/Base/Icon';

@inject('actions')
@inject('auth')
@inject('locales')
@inject('advertForm')

@observer
class Top extends Component {
  state = {
    removalPopupisOpen: false
  }

  render() {
    const {
      ad,
      archived,
      userAdverts,
      isLiked,
      className,
      status,
      locales,
      auth: {user} 
    } = this.props;
    const {t, languages} = locales;
    const {removalPopupisOpen} = this.state;
    
    return (
      <div className={cx(styles.root, className, {[styles.root_archived]: archived})}>
        <div className={styles.top}>
          <div className={styles.left}>
            <Link route={ad.category.url}>
              <a className={styles.category}>
                <Bage
                  className={styles.categoryBage}
                  backgroundColor={!archived && ad.category.color}
                >
                  {ad.category.name}
                </Bage>
              </a>
            </Link>
            <Link route={ad.subcategory.url}>
              <a className={styles.category}>
                <Bage
                  className={styles.subcategoryBage}
                  borderColor={!archived && ad.category.color}
                >
                  {ad.subcategory.name}
                </Bage>
              </a>
            </Link>
          </div>
          <div className={styles.right}>
            {status &&
              <Bage
                className={cx(styles.bage, styles.status)}
                backgroundColor={status.backgroundColor}
                borderColor={status.slug == 'draft' ? status.color : null}
                color={status.color}
                title={status.name}
                kind={'rectangle'}
              >
                {status.name}
              </Bage>
            }
            {!userAdverts &&
              <LikeButton
                onClick={this.like}
                active={isLiked}
                className={styles.likeButton}
              />
            }
            <If condition={userAdverts}>
              <Dropdown className={styles.dropdown} icon={'gear'} color={'dark'}>
                <a onClick={ad.goEdit}> {t('ad.edit')}</a>
                <If condition={status.slug == 'active'}>
                  <a onClick={() => { ad.goEdit('price') }}> {t('ad.editPrice')}</a>
                </If>
                <If condition={status.slug === 'active'}>
                  <For 
                    each='language' 
                    of={languages.filter(language => 
                      ad.versions.find(version => version.locale == language) === undefined)}
                  >
                    <button key={language} onClick={() => ad.translate(language)}>
                      <Icon icon={`flag-${language}`} width={16} height={16} style={{marginBottom: '-5px', marginRight: '5px'}} />
                      {` ${t('ad.publicateEn')}`}
                    </button>
                  </For>
                </If>
                <If condition={status.slug === 'active'}>
                  <a onClick={this.toggle}>{t('ad.remove')}</a>
                </If>
                <button onClick={ad.delete}>{t('ad.delete')}</button>
              </Dropdown>
            </If>
            <If condition={userAdverts}>
              <S.RemovalPopup 
                ad={ad} 
                isOpen={removalPopupisOpen} 
                onClose={this.toggle} 
              />
            </If>
          </div>
        </div>
        <div className={styles.bottom}>
          {ad.date &&
            <div className={styles.point}>
              <IconNew i={'calendar'} className={cx(styles.point__icon, styles.point__icon_date)} />
              <span className={styles.point__value}>{ad.date}</span>
            </div>
          }
          <div className={styles.point}>
            <IconNew i={'geo'} className={cx(styles.point__icon, styles.point__icon_place)} />
            <span className={styles.point__value}>{ad.place ? ad.place : t('ad.emptyPlace')}</span>
          </div>
          {ad.fields.filter(field => field.type === 'checkbox').map((field, i) => (
            <div key={i} className={styles.point}>
              <IconNew i={'mark'} className={cx(styles.point__icon, styles.point__icon_mark)} />
              <span className={styles.point__value}>{field.name}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  toggle = () => {
    this.setState({removalPopupisOpen: !this.state.removalPopupisOpen})
  }

  like = () => {
    const { ad, auth, actions } = this.props;
    const { user } = auth;

    if (user) {
      const uid = ad.uid;
      user.updateLikedStore(uid);
    } else {
      actions.setAction('unauthorized');
    }
  }
}

Top.displayName = 'Modules/Ad/Top';

export default Top;
