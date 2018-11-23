import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {Wrapper} from 'utils/utils';
import Icon from 'components/Base/Icon';
import IconNew from 'components/Base/IconNew';
import Button from 'components/Base/Button';
import Settings from 'config';
import Avatar from 'components/Modules/Avatar';
import { inject, observer } from 'mobx-react';
import Popup from 'components/Modules/Popup';
import Toggle from 'components/Base/Toggle';
import Raven from 'raven-js';

@inject('auth')
@inject('actions')
@inject('locales')
@observer
class MainAuth extends Component {
  state = {
    code: '',
    errors: {},
    writed: false
  }

  incrementStep = () => this.setState({writed: true})

  decrementStep = () => this.setState({writed: false})

  onValueChange = (e) => {
    const {value} = e.target;
    this.setState({
      code: value,
      errors: {}
    });
  }

  inputKeyPress = (e) => {
    if (e.key === 'Enter' && !this.state.errors.length) {
      this.saveHandler();
    }
  }

  saveHandler = () => {
    const {code} = this.state;
    const {auth, locales: { t }} = this.props;
    if (!code) return;
    auth.signIn(code)
      .catch(error => {
        console.error(error);
        if (error.errors && error.errors.code) {
          this.setState({errors: {code: error.errors.code}});
        } else {
          const laterCode = t('mainAuth.laterCode')
          this.setState({errors: {code: laterCode}});
          Raven.captureException(error)
        }
      })
  }

  onClose = () => {
    this.setState({
      code: '',
      writed: false,
      errors: {}
    });
    this.props.onClose()
  }

  render () {
    const {code, errors, writed} = this.state;
    const { locales: { t }, auth: { user }, isOpen, onClose, size } = this.props

    return (
      <Popup
        isOpen={isOpen}
        onClose={this.onClose}
        kind={'tight'}
        size={size}
        color={user && 'gradient-pattern'}
      >
        <div className={cx(styles.login, {[styles.login_sm]: size == 'sm-fullsize'})}>
          <Toggle noLeave>
            <Choose>
              <When condition={user}>
                <div key={'success'}>
                  <div className={styles.imageContainer}>
                    <Avatar owner={user} size={50} centered />
                  </div>
                  <div className={styles.hello}>{ t('mainAuth.hello') } { user.name }</div>
                  <div className={styles.oneOfUs}>{ t('mainAuth.oneOfUs') }</div>
                  <div className={cx(styles.controls, styles.successControls)}>
                    <Button onClick={this.onClose} className={styles.button} color={'white'}>{ t('mainAuth.hooray') }</Button>
                  </div>
                  <div className={styles.adsLink}>
                    <a href={'/new_ad'}>{ t('header.createAd') }</a>
                  </div>
                </div>
              </When>
              <Otherwise>
                <div className={styles.steps}>
                  <div onClick={this.decrementStep} className={cx(styles.step, {[styles.step_active]: !writed})}>
                    <div className={cx(styles.icon, writed ? styles.icon_right : styles.icon_left)}>
                      <Icon icon="mental-v" mentalVGradient width={36} />
                    </div>
                    <div className={styles.text}>{ t('mainAuth.stepOne') }</div>
                  </div>
                  <div onClick={this.incrementStep} className={cx(styles.step, {[styles.step_active]: writed})}>
                    <div className={styles.text}>{ t('mainAuth.stepTwo') }</div>
                  </div>
                </div>
                <Toggle noLeave>
                  <Choose>
                    <When condition={writed}>
                      <div key={'writed'}>
                        <div className={styles.description} dangerouslySetInnerHTML={{ __html: t('mainAuth.enterCode') }} />
                        <div className={styles.controls}>
                          <div className={styles.inputControl}>
                            <input
                              className={styles.input}
                              type="text"
                              onChange={this.onValueChange}
                              onKeyPress={this.inputKeyPress}
                              value={code}
                              placeholder={ t('mainAuth.botCode') }
                            />
                            <Button
                              onClick={this.saveHandler}
                              disabled={(errors && errors.code || !code)}
                              className={styles.arrowButton}
                              color={'gradient'}
                            >
                              <IconNew className={styles.buttonArrowRight} i='next' />
                            </Button>
                            <Toggle>
                              <If condition={errors && errors.code}>
                                <div className={cx(styles.error)}>{errors.code}</div>
                              </If>
                            </Toggle>
                          </div>
                        </div>
                      </div>
                    </When>
                    <Otherwise>
                      <div key={'nowrited'}>
                        <div className={styles.description}>
                          { t('mainAuth.write') }
                          { ' ' }
                          <span className={styles.blue}>/start</span><br/>
                          { ' ' }
                          { t('mainAuth.ourBot') }
                          { ' ' }
                          <a href={`tg://resolve?domain=${Settings.bot.name}`} className={styles.blue}>
                            @{Settings.bot.name}
                          </a><br/>
                          { ' ' }
                          { t('mainAuth.askCode') }
                        </div>
                        <div className={styles.controls}>
                          <Button onClick={this.incrementStep} className={styles.button} color={'gradient'}>{ t('mainAuth.wrote') }</Button>
                        </div>
                      </div>
                    </Otherwise>
                  </Choose>
                </Toggle>
              </Otherwise>
            </Choose>
          </Toggle>
        </div>
      </Popup>
    )
  }
}

export default MainAuth;
