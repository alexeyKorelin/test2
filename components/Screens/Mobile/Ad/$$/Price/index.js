import React, { Component } from 'react';
import cx from 'classnames';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import Checkbox from 'components/Base/Checkbox';
import IconNew from 'components/Base/IconNew';

@inject('locales')
@observer
class Price extends Component {
  _dropdown = React.createRef ? React.createRef() : null;  
  _current = React.createRef ? React.createRef() : null; 

  state = {
    coin: this.props.coin,
    isOpen: false
  }

  componentDidMount () {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  render() {
    const {coin, isOpen} = this.state;
    const {className, prices, usd_price, archived, locales: {t}} = this.props;

    return (
      <div className={cx(styles.root, className, {[styles.root_open]: isOpen}, {[styles.root_archived]: archived})}>
        <button 
          ref={this._current} 
          className={cx(
            styles.current, 
            {[styles.current_more]: prices.length > 1}
          )} 
          onClick={prices.length > 1 ? this.toggle : null}
        >   
          <span className={styles.current__value}>{prices.find(price => price.coin === coin).value}</span>
          <span className={styles.current__curr}>{coin}</span>
          <IconNew className={styles.current__icon} i={coin} size={coin === 'dash' ? 9 : 12} />
          <span className={styles.current__usd}>(≈ {usd_price} $)</span>
        </button>
        <CSSTransitionGroup
          className={styles.listWrapper}
          component={'div'}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          transitionName={{
            enter: styles.enter,
            enterActive: styles.enterActive,
            leave: styles.leave,
            leaveActive: styles.leaveActive
          }}
        >  
          {isOpen &&      
            <div className={styles.dropdown} ref={this._dropdown}>
              <div className={styles.controls}>
                <div className={styles.controls__inner}>
                  <button className={styles.close} onClick={this.close}>
                    <IconNew i={'close'} size={20} />
                  </button>
                  <span className={styles.title}>{t('ad.priceSelector')}</span>
                </div>
              </div>
              <div className={styles.list}>
                <ul className={styles.list__inner}>
                  {prices.map((price, i) => (
                    <li 
                      key={price.coin} 
                      onClick={() => this.changeCoin(price.coin)}
                      className={cx(
                        styles.list__coin, 
                        {[styles.list__coin_active]: price.coin == coin}
                      )}
                    >
                      <span className={styles.list__value}>{price.value}</span>
                      <span className={styles.list__curr}>{price.coin}</span>
                      <IconNew className={styles.list__icon} i={price.coin} size={price.coin === 'dash' ? 9 : 12} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          }
        </CSSTransitionGroup>
      </div>
    )
  }

  changeCoin = (coin) => {
    this.setState({coin: coin, isOpen: false});
  }

  toggle = () => {
    this.setState({isOpen: !this.state.isOpen});
  }

  close = () => {
    this.setState({isOpen: false});
  }

  handleClickOutside = (e) => {
    const dropdownNode = (this._dropdown && this._dropdown.current) || null;
    const currentNode = (this._current && this._current.current) || null;
    if (!dropdownNode || !currentNode) return;
    if (!dropdownNode.contains(e.target) && !currentNode.contains(e.target)) {
      this.close();
    }
  }   
}

Price.displayName = 'Modules/Mobile/Ad/Price';

export default Price;