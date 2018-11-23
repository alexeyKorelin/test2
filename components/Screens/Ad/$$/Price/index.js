import React, {Component} from 'react';
import cx from 'classnames';
import {inject, observer} from 'mobx-react';
import styles from './index.sass';
import IconNew from 'components/Base/IconNew';

@inject('locales')
@observer
class Price extends Component {
  state = {
    coin: this.props.coin
  }

  render() {
    const {coin, collapsed} = this.state;
    const {className, prices, archived, usd_price, locales: {t}} = this.props;
    
    return (
      <div className={cx(styles.root, className, {[styles.root_archived]: archived})}>
        <div className={styles.price}>  
          <span className={styles.price__value}>
            {prices.find(price => price.coin === coin).value}
          </span>
          <span className={styles.price__coin}>{coin}</span>
          <span className={styles.price__usd}>(≈ {usd_price} $)</span>
        </div>
        <div className={styles.currencies}>
          <span className={styles.currencies__title}>{t('ad.toPay')}</span>
          {prices.map(price => (
            <button 
              key={price.coin}
              className={cx(
                styles.currencies__coin, 
                {[styles.currencies__coin_active]: price.coin == coin}
              )}
              onClick={() => this.switchCoin(price.coin)}
            >
              <IconNew 
                key={price.coin} 
                title={price.coin.toLocaleUpperCase()}
                i={price.coin} 
                size={price.coin === 'dash' ? 7 : 12} 
              />
            </button>
          ))}
        </div>
      </div>
    )
  }

  switchCoin = (coin) => {
    this.setState({coin: coin});
  }
};

Price.displayName = 'Modules/Price';

export default Price;
