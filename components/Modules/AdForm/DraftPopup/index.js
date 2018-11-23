import React, { Component } from 'react';
import cx from 'classnames';
import styles from './index.sass';
import Popup from 'components/Modules/Popup';
import Icon from 'components/Base/Icon';
import Button from 'components/Base/Button';
import {Router, Link} from 'routes';

class DraftPopup extends Component {
  render() {
    const {isOpen, onClose, size} = this.props;

    return (
      <Popup
        className={styles.root}
        isOpen={isOpen}
        onClose={onClose}
        size={size}
        color={'gradient'}
        kind={'tight'}
      >
        <div className={styles.triangle}>
          <Icon className={styles.triangleIcon} mentalVColor={styles.mentalVColor} width={36} icon={`mental-v`} />
        </div>
        <div className={styles.title}>Упс!</div>
        <div className={styles.description}>
          {this.props.error}
        </div>
        <div className={styles.controls}>
          <Button className={styles.toDrafts} kind={'link'} onClick={this.props.onClose}>Продолжить редактирование</Button>
        </div>
      </Popup>
    )
  }
};

export default DraftPopup;
