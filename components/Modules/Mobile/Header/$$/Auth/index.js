import React, {Component} from 'react';
import Icon from 'components/Base/Icon';
import IconNew from 'components/Base/IconNew';
import styles from './index.sass';
import {Link} from 'routes';
import cx from 'classnames';
import Sidebar from 'components/Modules/Mobile/Sidebar';
import Avatar from 'components/Modules/Avatar';
import { inject, observer } from 'mobx-react';
import MainAuth from 'components/Modules/MainAuth';
import CreateAd from 'components/Modules/Header/$$/CreateAd';
import { Row, Col } from 'components/Base/Grid';
import Settings from 'config';
import {Wrapper} from 'utils/utils';

@inject('auth')
@inject('actions')
@inject('locales')
@observer
class Auth extends Component {

  state = {
    sidebarIsOpened: false
  }

  render() {
    const {auth, actions, locales: { t }} = this.props;
    const {user} = auth;
    const {sidebarIsOpened} = this.state;
    const isOpen = actions.action === 'authorize';
    
    return (
      <div className={styles.root}>
        <Choose>
          <When condition={user}>
            <div className={styles.auth}>
              <div className={styles.user} onClick={this.toggleSidebar}>
                <div className={styles.userImage}>
                  <Avatar owner={user} size={25} />
                </div>
              </div>

              <Sidebar
                from="right"
                onClose={this.toggleSidebar}
                isOpened={sidebarIsOpened}
                className={styles.sidebar}
              >
                <div className={styles.bg}>
                  <button onClick={this.signOut} className={styles.exit}>
                    <IconNew i={'exit'} size={20} />
                    { t('profile.exit') }
                  </button>
                  <div className={styles.userMenuUsername}>@{user.username}</div>
                  <div className={styles.userMenuName}>{user.first_name}</div>
                  <div className={styles.userMenuImage}>
                    <Link route={'/me'}>
                      <a className={styles.userMenuAvatarLink}>
                        <Avatar owner={user} size={50} />
                      </a>
                    </Link>
                  </div>
                  <div className={styles.status}>{user.status === 'active' ? t('profile.active') : null}</div>
                </div>
                <div className={styles.bg_white}>
                  <div className={styles.bar}>
                    <Col size={4}>
                      <Link route="/likes">
                        <a>
                          <span className={cx({[styles.empty]: !user.liked_ids.length})}>{user.liked_ids.length}</span>
                          { t('profile.inFavs') }
                        </a>
                      </Link>
                    </Col>
                    {/* <Col size={4}>
                      <a className={styles.disabled}>
                        <span>0</span>
                        { t('profile.deals') }
                      </a>
                    </Col> */}
                    <Col size={4}>
                      <Link route="/shops">
                        <a>
                          <span className={cx({[styles.empty]: !user.shops.length})}>{user.shops.length}</span>
                          { t('profile.shops') }
                        </a>
                      </Link>
                    </Col>
                    <Col size={4}>
                      <Link route="/ads">
                        <a>
                          <span className={cx({[styles.empty]: !user.adverts.length})}>{user.adverts.length}</span>
                          { t('profile.ads') }
                        </a>
                      </Link>
                    </Col>
                  </div>
                  <Link route={'/me'}><a className={styles.profile_link}>{ t('profile.goToProfile') }</a></Link>
                  <div className={styles.create_area}>
                    <CreateAd className={styles.create} auth={auth} kind={'circled'} color={'gradient'} />
                  </div>
                </div>
              </Sidebar>
            </div>
          </When>
          <Otherwise>
            <button onClick={() => actions.setAction('authorize')} className={styles.signIn}>
              <Icon icon="user-exit" height={21} />
            </button>
          </Otherwise>
        </Choose>
        <MainAuth isOpen={isOpen} onClose={this.closeModalHandler} size={'sm-fullsize'} />
      </div>
    )
  }

  toggleSidebar = () => this.setState({sidebarIsOpened: !this.state.sidebarIsOpened})

  closeModalHandler = () => {
    const {actions} = this.props;
    actions.closeModal();
  }

  signOut = () => {
    const {auth} = this.props;
    this.toggleSidebar();
    this.closeModalHandler();
    auth.signOut();
  }
}

export default Auth;
