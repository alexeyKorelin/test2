import React, { Component } from 'react';
import cx from 'classnames';
import styles from './index.sass';
import { inject, observer } from 'mobx-react';
import {Router, Link} from 'routes';
import ArrowButton from 'components/Base/ArrowButton';
import Bage from 'components/Base/Bage';
import LikeButton from 'components/Modules/LikeButton';
import API from 'utils/api';
import Icon from 'components/Base/Icon';
import Dropdown from 'components/Base/Dropdown';
import RemovalPopup from 'components/Screens/Ad/$$/RemovalPopup';

@inject('actions')
@inject('auth')
@inject('locales')
@observer
class Top extends Component {
  state = {
    removalPopupisOpen: false
  }

  render() {
    const {ad, archived, userAdverts, isLiked, className, status, locales} = this.props;
    const {t, languages} = locales;
    const {removalPopupisOpen} = this.state;
    
    return (
      <div className={cx(styles.root, className)}>
        {/* <ArrowButton onClick={this.goBack} className={styles.arrowButton} type={'left'} /> */}
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
                <a onClick={ ad.goEdit }>{t('ad.edit')}</a>
                <If condition={status.slug == 'active'} >
                  <a onClick={() => { ad.goEdit('price') }}>{t('ad.editPrice')}</a>
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
              <RemovalPopup 
                ad={ad} 
                isOpen={removalPopupisOpen} 
                onClose={this.toggle}
                size={'sm-fullsize'} 
              />
            </If>
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

  goBack = () => {
    Router.back()
  }
}

Top.displayName = 'Modules/Mobile/Ad/Top';

export default Top;
