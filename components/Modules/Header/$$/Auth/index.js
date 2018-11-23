import React, {Component} from 'react';
import cx from 'classnames';
import Icon from 'components/Base/Icon';
import {Link} from 'routes';
import { inject, observer } from 'mobx-react';
import Avatar from 'components/Modules/Avatar';
import {noop} from 'utils/utils';
import styles from './index.sass';
import MainAuth from 'components/Modules/MainAuth';
import Settings from 'config';
import Toggle from 'components/Base/Toggle'

@inject('auth')
@inject('actions')
@inject('locales')
@observer
class Auth extends Component {
  state = {
    dropdownIsOpen: false
  }

  render () {
    const { auth, actions, locales: { t } } = this.props
    const { user } = auth
    const isOpen = actions.action === 'authorize'

    return (
      <div className={styles.root}>
        {user ? (
          <div className={styles.auth}>
            <Link route="/me">
              <a className={styles.username}>
                {user.username}
              </a>
            </Link>
            <div ref={this.setDropdownRef} className={styles.more}>
              <button onClick={this.dropdownOpen} className={styles.moreButton}>
                <div className={styles.imageContainer}>
                  <Avatar owner={user} size={50} />
                </div>
                <Icon className={styles.moreIcon} icon="auth-more" width={4} />
              </button>
              <Toggle>
                <If condition={this.state.dropdownIsOpen}>
                  <div className={cx(styles.dropdown)}>
                    <ul className={styles.ul}>
                      <li className={styles.li}>
                        <Link route={'/me'}>
                          <a className={styles.a}>{ t('header.profile') }</a>
                        </Link>
                      </li>
                      <li className={cx(styles.li, {[styles.li_active]: false})}>
                        <Link route={'/likes'}>
                          <a className={styles.a}>{ t('header.favorite') }<span className={styles.number}>{user.liked_ids.length}</span></a>
                        </Link>
                      </li>
                      <li className={styles.li}>
                        <Link route={'/shops'}>
                          <a className={styles.a}>{ t('header.myShops') }<span className={styles.number}>{user.shops.length}</span></a>
                        </Link>
                      </li>
                      <li className={styles.li}>
                        <Link route={'/ads'}>
                          <a className={styles.a}>{ t('header.myAds') }<span className={styles.number}>{user.adverts.length}</span></a>
                        </Link>
                      </li>
                      {/*<li className={styles.li}>
                        <a className={styles.a}>Мои сделки<span className={styles.number}>0</span></a>
                      </li>
                      <li className={styles.li}>
                        <a className={styles.a}>Мои черновики<span className={styles.number}>0</span></a>
                      </li>*/}
                      <li className={cx(styles.li, styles.li_exit)}>
                        <button onClick={this.logout} className={styles.a}>{ t('header.exit') }</button>
                      </li>
                    </ul>
                  </div>
                </If>
              </Toggle>
            </div>
          </div>
        ) : (
          <button className={styles.authButton} onClick={() => actions.setAction('authorize')}>
            { t('header.login') }
          </button>
        )}
        <MainAuth isOpen={isOpen} onClose={this.closeModalHandler} />
      </div>
    )
  }

  componentDidMount () {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setDropdownRef = (node) => {
    this.dropdownRef = node;
  }

  handleClickOutside = (e) => {
    if (this.dropdownRef && !this.dropdownRef.contains(e.target)) {
      this.setState({dropdownIsOpen: false});
    }
  }

  dropdownOpen = (e) => {
    this.setState({dropdownIsOpen: !this.state.dropdownIsOpen})
  }

  closeModalHandler = () => {
    const {actions} = this.props;
    actions.closeModal();
  }

  logout = () => {
    const {auth} = this.props;
    auth.signOut();
  }
}

export default Auth
