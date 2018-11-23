import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import Settings from 'config';
import H2 from 'components/Screens/Ico/$$/Base/H2';
import Timer from 'components/Screens/Ico/$$/Base/Timer';
import Container from '../Container';
import Toggle from 'components/Base/Toggle';
import IconNew from 'components/Base/IconNew';
import Button from 'components/Base/Button';

@inject('locales')
@observer
class Converter extends Component {
  state = {
    value: 1,
    converted: 20000,
    bonus: 0
  }

  render () {
    const {value, converted, bonus} = this.state;
    const {className, locales: {t}} = this.props;
    
    return (
      <Container id='converter' className={cx(styles.root, className)}>
        <H2 className={styles.title} size='sm'>{t(`ico.converter.title`)}</H2>
        <div className={styles.converter}>
          <div className={styles.top}>
            <div className={styles.input}>
              <input type='number' value={value} min='0' className={styles.input__input} onChange={this.onChange} />
              <div className={styles.input__line} />
            </div>
            <div className={styles.currency}>
              <span className={styles.currency__label}>ETH</span>
              <IconNew i='eth' className={styles.currency__icon} />
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.price}>
              <span className={styles.price__bonus}>{`+ ${bonus} %`}</span>
              <span className={styles.price__value}>{converted}</span>
              <IconNew i='mntl' className={styles.price__currency} />
            </div>
          </div>
        </div>
        <div className={styles.timer}>
          <div className={styles.timer__title}>{t(`ico.converter.left`)}</div>
          <Timer className={styles.timer__timer} size='sm' />
        </div>
        <div className={styles.controls}>
          <Button 
            href={t('ico.common.buy_tokens.href')} 
            kind='icoCircled' 
            color='icoGradient' 
            external
          >{t('ico.common.buy_tokens.title')}</Button>
        </div>
      </Container>
    )
  }  
  
  onChange = (e) => {
    const converted = this.calculation(e.target.value);

    this.setState({value: e.target.value, converted: converted.value, bonus: converted.bonus});
  }

  calculation = (value) => {
    if (value < 0) return null;

    let bonus = 0;

    if (value >= 90) {
      bonus = 20;
    } else if (value >= 60) {
      bonus = 15;
    } else if (value >= 30) {
      bonus = 10;
    } else if (value >= 15) {
      bonus = 5;
    }

    return {
      value: Math.floor(20000 * value * (1 + bonus / 100)),
      bonus: bonus 
    };
  }
}

export default Converter;
