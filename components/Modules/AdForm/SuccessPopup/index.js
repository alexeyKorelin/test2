import React, { Component } from 'react';
import cx from 'classnames';
import styles from './index.sass';
import { observer } from 'mobx-react';
import Popup from 'components/Modules/Popup';
import Icon from 'components/Base/Icon';
import Button from 'components/Base/Button';
import {Router} from 'routes';

@observer
class SuccessPopup extends Component {
  state = {
    isOpen: true
  }

  render() {
    const { advert, status, t, size } = this.props;
    const content = status == 'active' ?
      <p dangerouslySetInnerHTML={{ __html: t('createAd.success.active') }} /> :
      <p dangerouslySetInnerHTML={{ __html: t('createAd.success.moderation') }} />
    return (
      <Popup
        className={cx(styles.root, this.props.className)}
        isOpen={status && this.state.isOpen}
        onClose={this.closeModal}
        size={size}
        color={'gradient'}
        kind={'tight'}
      >
        <div className={styles.triangle}>
          <Icon className={styles.triangleIcon} mentalVColor={styles.mentalVColor} width={36} icon={`mental-v`} />
        </div>
        <div className={styles.title}>{t('createAd.success.thanks')}</div>
        <div className={styles.description}>{content}</div>
        <div className={styles.controls}>
          <Button className={styles.toAd} color={'white'} href={advert.url}>{t('createAd.buttons.seeAdvert')}</Button><br />
          <Button className={styles.toHome} href={'/main'} color={'white'} kind={'link'}>{t('createAd.buttons.goHome')}</Button>
        </div>
      </Popup>
    )
  }

  closeModal = () => {
    this.setState({isOpen: false});
    Router.pushRoute('/main');
  }
};

export default SuccessPopup;
