import {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import {items} from './mock.js';
import Settings from 'config';
import H2 from 'components/Screens/Ico/$$/Base/H2';
import Container from '../Container';
import Carousel from '../Carousel';

@inject('locales')
@observer
class Market extends Component {
  x0 = 146;

  state = {
    active: false
  }
  
  render () {
    const {active, stopClick} = this.state;
    const {className, locales: {t}} = this.props;
    
    return (
      <Container id='market' className={cx(styles.root, className)}>
        <H2 size='sm'>{t(`ico.market.title`)}</H2>
        <div className={styles.description} dangerouslySetInnerHTML={{__html: t(`ico.market.description`)}} />
        <div className={styles.markets} style={{backgroundImage: `url(${Settings.assetHost}/ico/market/undercover-sm.svg)`}}>
          <For each='item' index='i' of={items}>
            <button 
              onClick={!stopClick ? () => this.setActive(i) : null}
              key={i} 
              className={cx(styles.market, {[styles.market_active]: active === i})} 
              style={{
                width: active === i ? 2 * items[active].r.circle : 2 * item.r.marker, 
                height: active === i ? 2 * items[active].r.circle : 2 * item.r.marker,
                top: active !== i && this.getCoordinates(
                  items[i].steps[(active !== false && i > active) ? 'end' : 'start'],
                  item.r.circle
                ).y,               
                left: active !== i && this.getCoordinates(
                  items[i].steps[(active !== false && i > active) ? 'end' : 'start'],
                  item.r.circle
                ).x
              }}>
              <div className={styles.market__label}>{t(`ico.market.items.item${i}.title`)}</div>
              <div className={cx(styles.market__content, {[styles.market__content_sm]: i === 4})}>
                <div className={styles.market__title}>{t(`ico.market.items.item${i}.title`)}</div>
                <div className={styles.market__value}>{t(`ico.market.items.item${i}.value1`)}</div>
                <div className={styles.market__line} />
                <div className={styles.market__value}>{t(`ico.market.items.item${i}.value2`)}</div>
              </div>
            </button>
          </For>
        </div>
      </Container>
    )
  }

  getCoordinates = (steps, r) => {
    return {
      x: Math.round(this.x0 + r * Math.cos(2 * Math.PI * steps / 100 - Math.PI / 2)),
      y: Math.round(r + r * Math.sin(2 * Math.PI * steps / 100 - Math.PI / 2))
    }
  }

  setActive = (i) => {
    const {active} = this.state;

    this.setState({active: active === i ? false : i});
  }

  unsetActive = () => {
    this.setState({active: false});
  }
}

export default Market;
