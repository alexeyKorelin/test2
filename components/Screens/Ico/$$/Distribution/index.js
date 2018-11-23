import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import Settings from 'config';
import Section from '../Base/Section';
import {throttle} from 'lodash';
import {Container, Row, Col} from 'components/Base/Grid';
import H4 from '../Base/H4';
import Cap from '../Base/Cap';
import Card from '../Base/Card';
import IconNew from 'components/Base/IconNew';
import Toggle from 'components/Base/Toggle';
import {formatPrice, tToArray} from 'utils/utils';

@inject('locales')
@observer
class Distribution extends Component {
  eth = 200;

  _distribution = React.createRef();
  _distributionInner = React.createRef();

  slideWidth = 292;

  state = {
    fullsize: false,
    current: 0,
    width: 0,
    innerWidth: 0
  }

  componentDidMount() {
    this.updateDistribution();

    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  render () {
    const {fullsize, current, width, innerWidth} = this.state;
    const {className, locales: {t}} = this.props;
    let shift = 0;

    shift = current * this.slideWidth;
    
    return (
      <Section id='distribution' className={cx(styles.root, className)}>
        <Container className={styles.container}>
          <H4 className={styles.title}>{t(`ico.distribution.title`)}</H4>
          <div className={styles.course}>1 ETH = {this.eth} USD</div>      
          <div className={styles.caps}>
            <Cap className={styles.caps__cap} kind='s'>
              3 300 <IconNew i='eth' className={styles.caps__icon} />&nbsp;= {3300 * this.eth} <IconNew i='usd' className={styles.caps__icon} />
            </Cap>
            <Cap className={styles.caps__cap}>
              3 300 <IconNew i='eth' className={styles.caps__icon} />&nbsp;= {3300 * this.eth} <IconNew i='usd' className={styles.caps__icon} />
            </Cap>
          </div>   
        </Container>
        <div ref={this._distribution} className={styles.itemsContainer}>
          <div ref={this._distributionInner} className={styles.items} style={{transform: `translate(${-1 * shift}px,0)`}}>
            <div className={styles.items__inner}>
              <For each='item' index='i' of={tToArray(t('ico.distribution.items', {returnObjects: true}))}>
                <div className={cx(styles.col, {[styles.col_invisible]: !this.isVisible(i)})} key={i}>
                  <Card 
                    className={styles.card}
                    subtitle={item.title} 
                    percent={parseFloat(item.percent)}
                    soft={<span>{formatPrice(item.eth.soft)} <IconNew i='eth' className={styles.card__icon} /> = {formatPrice(parseFloat(item.eth.soft) * this.eth)} <IconNew i='usd' className={styles.card__icon} /></span>}
                    hard={<span>{formatPrice(item.eth.hard)} <IconNew i='eth' className={styles.card__icon} /> = {formatPrice(parseFloat(item.eth.hard) * this.eth)} <IconNew i='usd' className={styles.card__icon} /></span>}
                  />
                </div>
              </For>
            </div>
          </div>  
        </div> 
        <Toggle>
          <If condition={!fullsize}>
            <Container className={styles.arrows}>
              <button 
                className={cx(styles.arrow, styles.arrow_left)} 
                onClick={this.prev}
                disabled={!this.checkCurrent(current - 1)}
              />
              <button 
                className={cx(styles.arrow, styles.arrow_right)} 
                onClick={this.next} 
                disabled={!this.checkCurrent(current + 1)}
              />
            </Container> 
          </If> 
        </Toggle> 
      </Section>
    )
  }

  onResize = throttle(() => {
    this.updateDistribution();
  }, 500);

  updateDistribution = () => {
    const distribution = this._distribution.current;
    const distributionInner = this._distributionInner.current;
    let fullsize = (distributionInner.offsetWidth <= distribution.offsetWidth) ? true : false;
    
    this.setState({fullsize: fullsize, width: distribution.offsetWidth, innerWidth: distributionInner.offsetWidth});
  }

  prev = () => this.checkCurrent(this.state.current - 1) && this.setState({current: this.state.current - 1});

  next = () => this.checkCurrent(this.state.current + 1) && this.setState({current: this.state.current + 1});

  checkCurrent = (index) => {
    const {width, innerWidth, current} = this.state;
    let left = -1 * (innerWidth - width) / 2 / this.slideWidth - 1;
    let right = (innerWidth - width) / 2 / this.slideWidth + 1;
    
    if (index >= left && index <= right) {
      return true;
    } else {
      return false;
    }
  }  

  isVisible = (index) => {
    const {width, innerWidth, current} = this.state;
    const visibleCount = Math.floor(width / this.slideWidth);

    return true;
  }
}

export default Distribution;
