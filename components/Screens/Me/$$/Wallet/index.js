import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import Dropdown from 'components/Base/Dropdown';
import { Row, Col } from 'components/Base/Grid';
import IconNew from 'components/Base/IconNew';
import {inject, observer} from 'mobx-react';

@inject('locales')
@observer
class Wallet extends Component {
  state = {
    editing: false,
    collapsed: this.props.user.wallet ? true : false,
    wallet: this.props.user.wallet ? this.props.user.wallet : '',
    count: this.props.user.wallet ? this.props.user.wallet.length : 0,
    error: '',
    balance: 0
  }

  updateWallet = e => {
    const { user, locales: { t } } = this.props;
    user.updateWallet({
      wallet: this.state.wallet
    }).then(res => {
      this.setState({editing: false});
      this.getBalance();
    }).catch(res => {
      this.setState({error: t('profile.walletInvalid')});
    })
  }

  deleteWallet = e => {
    this.setState({collapsed: !this.state.collapsed});
    this.props.user.deleteWallet();
  }

  onChange = e => {
    const { locales: { t } } = this.props;
    this.setState({
      count: e.target.value.length,
      error: e.target.value.length > 44 ? t('profile.walletMax') : '',
      wallet: e.target.value
    });
  }

  getBalance = () => {
    fetch(`https://api.etherscan.io/api?module=account&action=balance&address=${this.props.user.wallet}&tag=latest`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(res => {
      this.setState({ balance: parseFloat(res.result) / 1000000000000000000 })
    })
  }

  componentDidMount() {
    if (this.props.user.wallet) {
      this.getBalance();
    }
  }

  render() {
    const {user, locales: { t }} = this.props;
    const {collapsed, editing, wallet, error, balance} = this.state;

    return (
      <div className={cx(styles.root, {[styles.root_collapsed]: user.wallet})}>
        <If condition={(!user.wallet && !collapsed)}>
          <h2 className={styles.currency_add}>{ t('profile.ethWallet') }</h2>
          <IconNew i={'circle-plus'} size={20} onClick={(e) => this.setState({ collapsed: true })} />
        </If>
        <If condition={(!user.wallet && collapsed)}>
          <h2 className={styles.currency}>Ethereum</h2>
          <div className={styles.actions}>
            <button className={styles.link} onClick={(e) => this.setState({ collapsed: false, wallet: '', error: '' })}>{ t('profile.cancel') }</button>
            <button className={styles.link} onClick={this.updateWallet}>{ t('profile.save') }</button>
          </div>
          <div className={styles.title}>{ t('profile.walletNum') }</div>
          <input className={cx(styles.input, {[styles.input_error]: error})} value={wallet} onChange={this.onChange}/>
          <span className={styles.count}>{wallet.length}/44</span>
          {error ? <div className={styles.error}>{error}</div> : null}
        </If>
        <If condition={user.wallet}>
          <div className={styles.top}>
            <h2 className={styles.currency}>Ethereum</h2>
            <If condition={!editing}>
              <div className={styles.dropdown}>
                <Dropdown icon={'dots'} color={'light'}>
                  <a onClick={(e) => this.setState({ editing: !editing })}>{ t('profile.editWallet') }</a>
                  <a onClick={this.deleteWallet}>{ t('profile.removeWallet') }</a>
                </Dropdown>
              </div>
            </If>
            <If condition={editing}>
              <div className={styles.actions}>
                <button className={styles.link} onClick={(e) => this.setState({ editing: false })}>{ t('profile.cancel') }</button>
                <button className={styles.link} onClick={this.updateWallet}>{ t('profile.save') }</button>
              </div>
            </If>
          </div>
          <div className={cx(styles.title, {[styles.title_editing]: editing})}>{ t('profile.walletNum') }</div>
          <If condition={!editing}>
            <div className={styles.code}>1KoX6AA5VTdbBTkw27YEqKfAtTeQo97RRt</div>
          </If>
          <If condition={editing}>
            <input className={cx(styles.input, {[styles.input_error]: error})} value={wallet} onChange={this.onChange}/>
            <span className={styles.count}>{wallet.length}/44</span>
            {error ? <div className={styles.error}>{error}</div> : null}
          </If>
          <Row>
            <Col size={4}>
              <div className={styles.title}>{ t('profile.ballance') } ETH</div>
              <div className={styles.total}>{balance == 0 ? balance : balance.toFixed(6)}</div>
            </Col>
            <Col size={8}>
              <div className={styles.title}>{ t('profile.ballance') } MNTL</div>
              <div className={styles.total}>0</div>
            </Col>
          </Row>
        </If>
      </div>
    );
  }
}

export default Wallet;
