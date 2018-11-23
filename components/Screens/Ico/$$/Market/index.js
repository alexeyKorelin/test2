import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import Settings from 'config';
import {items} from './mock.js';
import H2 from '../Base/H2';
import Currency from '../Base/Currency';
import {Container, Row, Col} from 'components/Base/Grid';

@inject('locales')
@observer
class Market extends Component {
  state = {
    active: items.length - 1
  };

  render () {
    const {active} = this.state;
    const {className, locales: {t}} = this.props;
    
    return (
      <div id='market' className={cx(styles.root, className)}>
        <Container>
          <Currency currency='xrp' className={cx(styles.currency, styles.currency_1)} />
          <H2 className={styles.title}>{t(`ico.market.title`)}</H2>
          <div className={styles.description} dangerouslySetInnerHTML={{__html: t(`ico.market.description`)}} />
        </Container>
        <Container className={styles.circles}>
          <Currency currency='btc' className={cx(styles.currency, styles.currency_2)} />  
          <div className={styles.circles__inner}>         
            <For each='item' index='i' of={items}>
              <div key={i} className={cx(styles.circle, {[styles.circle_active]: i === active})} style={{width: 2 * item.r.circle, height: 2 * item.r.circle}}>
                <div className={styles.circle__inner} style={{animationDuration: `${160 - i * 30}s`}}>
                  <div
                    className={cx(styles.market)} 
                    style={{
                      top: this.getCoordinates(
                        item.position,
                        item.r.circle
                      ).y,               
                      left: this.getCoordinates(
                        item.position,
                        item.r.circle
                      ).x
                    }}
                    onMouseEnter={() => this.onMouseEnter(i)}
                    onMouseLeave={() => this.onMouseLeave(i)}
                  >
                    <div className={styles.market__inner} style={{animationDuration: `${160 - i * 30}s`}}>
                      <div className={styles.market__btn} style={{transform: `translate(${item.shift.x}px,${item.shift.y}px)`}}>
                        <div className={styles.market__label}>{t(`ico.market.items.item${i}.title`)}</div>
                        <div 
                          className={styles.market__circle} 
                          style={{
                            width: 2 * item.r.marker, 
                            height: 2 * item.r.marker
                          }}
                        >
                          <div 
                            className={styles.market__back} 
                            style={{
                              width: 2 * item.r.marker, 
                              height: 2 * item.r.marker,
                              //transform: `translate(${item.shift.x}px,${item.shift.y}px)`
                            }}
                          > 
                            <div className={cx(styles.market__container)}>
                              <div className={cx(styles.market__content)}>
                                <div className={styles.market__description}>
                                  <div className={styles.market__value}>{t(`ico.market.items.item${i}.value1`)}</div>
                                  <div className={styles.market__line} />
                                  <div className={styles.market__value}>{t(`ico.market.items.item${i}.value2`)}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </For>
          </div>
        </Container>
      </div>
    )
  }

  getCoordinates = (position, r) => {
    return {
      x: Math.round(r + r * Math.cos(2 * Math.PI * position - Math.PI / 2)),
      y: Math.round(r + r * Math.sin(2 * Math.PI * position - Math.PI / 2))
    }
  }

  onMouseEnter = (i) => this.setState({active: i}); 

  onMouseLeave = () => this.setState({active: items.length - 1});
}

export default Market;
