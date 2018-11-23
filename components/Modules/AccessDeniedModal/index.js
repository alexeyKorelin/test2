import React, {Component} from 'react';
import { inject, observer } from 'mobx-react';
import cx from 'classnames';
import Popup from 'components/Modules/Popup';
import Button from 'components/Base/Button';
import styles from './index.sass';
import Icon from 'components/Base/Icon';

@inject('actions') @observer
class AccessDeniedModal extends Component {
  render() {
    const {actions} = this.props;
    const isOpen = actions.action === 'access_denied'

    return (
      <Popup className={styles.root} isOpen={isOpen} onClose={actions.closeModal}>
        <div className={styles.icon}>
          <Icon icon="mental-v" width={36} />
        </div>
        <div className={styles.title}>Упс!</div>
        <div className={styles.description}>Недостаточно прав</div>
      </Popup>
    )
  }
}

AccessDeniedModal.displayName = 'Modules/AccessDeniedModal';

export default AccessDeniedModal;