import React, {Component} from 'react';
import cx from 'classnames';
import {inject, observer} from 'mobx-react';
import styles from './index.sass';
import Popup from 'components/Modules/Popup';
import Button from 'components/Base/Button';
import RadioButton from 'components/Base/RadioButton';
import Icon from 'components/Base/Icon';
import {reasonsKeys} from './mock.js';
import Toggle from 'components/Base/Toggle';

@inject('locales')
@observer
class RemovalPopup extends Component {
  state = {
    success: false,
    reason: false,
    sending: false
  }

  render () {
    const { locales: { t }, ad, isOpen, onClose, size } = this.props;
    const { reason, success, sending } = this.state;
    
    return (
      <Popup
        className={styles.popup}
        isOpen={isOpen}
        onClose={onClose}
        size={size}
        kind={'tight'}
        color={success && 'gradient'}
      >
        <Toggle noLeave>
          <Choose>
            <When condition={success}>
              <div key='success' className={cx(styles.inner, styles.inner_success)}>
                <div className={styles.icon}>
                  <Icon icon="mental-v-up" width={36} className={styles.mentalVUp} />
                </div>
                <h2 className={styles.h2}>{t('ad.removalReason.done')}</h2>
                <div className={styles.removedText} dangerouslySetInnerHTML={{__html: t('ad.removalReason.removed')}} />
                <div className={styles.actions}>
                  <Button color={'white'} href="/me">{t('ad.removalReason.profile')}</Button>
                </div>
              </div>
            </When>
            <Otherwise>
              <div key='reasons' className={cx(styles.inner, {[styles[`inner_${size}`]]: size})}>
                <h2 className={styles.h2}>{t('ad.removalReason.reason')}</h2>
                <div className={styles.reasons}>
                  <For each='reasonsKey' of={reasonsKeys}>
                    <RadioButton
                      key={reasonsKey}
                      label={t(`enum.advert.reason.${reasonsKey}`)}
                      className={styles.reason}
                      value={reasonsKey}
                      checked={reason === reasonsKey}
                      onChange={this.onChange}
                    />
                  </For>
                </div>
                <div className={styles.actions}>
                  <Button
                    color={'gradient'}
                    onClick={this.remove}
                    disabled={!reason || sending}
                  >{t('ad.removalReason.send')}</Button>
                </div>      
              </div>     
            </Otherwise>
          </Choose>
        </Toggle>
      </Popup>  
    )
  }

  onChange = (e) => {
    const reason = e.target.value;

    this.setState({reason: reason});
  }

  remove = () => {
    const {ad} = this.props;
    const {reason} = this.state;

    this.setState({sending: true});

    ad.archive(reason)
      .then(res => {
          this.setState({success: true, sending: false});
      }).catch(error => {
        this.setState({sending: false});
      })
  }
}

export default RemovalPopup;
