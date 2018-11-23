import {Component} from 'react';
import { inject, observer } from 'mobx-react';
import {Router, Link} from 'routes';
import cx from 'classnames';
import Popup from 'components/Modules/Popup';
import Button from 'components/Base/Button';
import styles from './index.sass';
import Icon from 'components/Base/Icon';

@inject('actions')
@inject('locales')
@observer
class NeedAuthModal extends Component {
  render() {
    const {actions, size, locales: { t }} = this.props;
    const isOpen = actions.action === 'unauthorized'

    return (
      <Popup 
        className={cx(styles.root)} 
        isOpen={isOpen} 
        onClose={actions.closeModal}
        color={'gradient'}
        kind={'tight'}
        size={size}
      >
        <div className={styles.icon}>
          <Icon icon="mental-v" width={36} />
        </div>
        <div className={styles.title}>{ t('mainAuth.oops') }</div>
        <div className={styles.description} dangerouslySetInnerHTML={{__html: t('mainAuth.authThroughTelegram')}} />
        <div className={styles.controls}>
          <Button 
            onClick={this.openAuth} 
            className={styles.button} 
            color={'white'} 
            kind={'primary'}
          >{ t('mainAuth.auth') }</Button>
        </div>
        <div className={styles.about}>
          <Link route={'/about'}><a onClick={actions.closeModal}>{ t('mainAuth.detailsAboutAuth') }</a></Link>
        </div>
      </Popup>
    )
  }

  openAuth = () => {
    const {actions} = this.props;

    actions.closeModal();
    setTimeout(function() {
      actions.setAction('authorize')
    }, 200)
  }
}

NeedAuthModal.displayName = 'Modules/NeedAuthModal';

export default NeedAuthModal;
