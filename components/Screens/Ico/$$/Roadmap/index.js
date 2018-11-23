import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import {sortBy, throttle, findIndex} from 'lodash';
import Settings from 'config';
import Section from '../Base/Section';
import {Container} from 'components/Base/Grid';
import Line from './$$/Line';
import H2 from '../Base/H2';
import Currency from '../Base/Currency';
import Toggle from 'components/Base/Toggle';
import {tToArray} from 'utils/utils';

@inject('locales')
@observer
class Roadmap extends Component {
  _roadmap = React.createRef();
  _roadmapInner = React.createRef();

  date = new Date();
  yearNum = this.date.getFullYear();
  monthNum = this.date.getMonth();
  slideWidth = 350;
  bushWidth = 195;

  state = {
    fullsize: false,
    current: false,
    width: 0,
    innerWidth: 0,
    left: 0,
    right: 0
  }

  componentDidMount() {
    this.updateRoadmap();

    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  render () {
    const {fullsize, current, width, innerWidth} = this.state;
    const {className, locales: {t}} = this.props;
    const items = this.getItems();
    let evenMonths = [];
    let oddMonths = [];
    let shift = 0;
    let i = 0;

    items.forEach(item => {
      if (i % 2 === 0) {
        evenMonths.push(item);
      } else {
        oddMonths.push(item);
      }

      i++;
    });

    shift = (evenMonths.length + oddMonths.length - current - 1) * this.slideWidth / 2;

    return (
      <div id='roadmap' className={cx(styles.root, className)}>
        <Container className={styles.header}>
          <Currency currency='eth' className={cx(styles.currency, styles.currency_1)} />
          <H2 className={styles.title}>{t(`ico.roadmap.title`)}</H2>
          <div className={styles.description} dangerouslySetInnerHTML={{__html: t(`ico.roadmap.description`)}} />
        </Container>
        <div className={styles.roadmapContainer}>
          <Section>
            <div ref={this._roadmap} className={cx(styles.roadmap, {[styles.roadmap_fullsize]: fullsize})}>
              <div 
                ref={this._roadmapInner} 
                className={styles.roadmap__inner} 
                style={fullsize ? null : {transform: `translate(${-1 * (width / 2 - this.slideWidth / 2) + shift}px,0)`}}
              >
                <Months 
                  months={evenMonths} 
                  monthNum={this.monthNum} 
                  isVisible={this.isVisible} 
                  current={current}
                  t={t}
                  yearNum={this.yearNum}
                />
                <div 
                  className={cx(styles.roadmap__line, styles.line)} 
                  style={{background: `linear-gradient(90deg, #8D00FF ${this.monthNum / items.length * 100}%, #DCDCDC ${(this.monthNum + 0.25) / items.length * 100}%)`}} 
                />
                <Months 
                  months={oddMonths} 
                  monthNum={this.monthNum} 
                  isVisible={this.isVisible} 
                  odd
                  current={current}
                  t={t}
                  yearNum={this.yearNum}
                />
              </div>  
            </div>     
          </Section>
        </div>
        <Container className={styles.arrows}>
          <Currency currency='dash' className={cx(styles.currency, styles.currency_2)} />
          <Toggle>
            <If condition={!fullsize}>
              <button 
                className={cx(styles.arrow, styles.arrow_left)} 
                onClick={this.prev}
                disabled={!this.checkShift(current - 1)} 
              />
              <button 
                className={cx(styles.arrow, styles.arrow_right)} 
                onClick={this.next} 
                disabled={!this.checkShift(current + 1)}
              />
            </If>
          </Toggle>
        </Container> 
      </div>
    )
  }

  getItems = () => {
    const {locales: {t}} = this.props;
    const items = tToArray(t(`ico.roadmap.items`, {returnObjects: true}))
      .map(item => {
        return {...item, items: tToArray(item.items).map(item => {
          return {...item, items: tToArray(item.items)};
        })};
      });
    let combinedItems = [];
    items.forEach(year => {
      year.items.forEach(item => {
        combinedItems.push({year: year.value, ...item});
      });
    });

    return combinedItems;
  }

  prev = () => this.checkShift(this.state.current - 1) && this.setState({current: this.state.current - 1});

  next = () => this.checkShift(this.state.current + 1) && this.setState({current: this.state.current + 1});

  onResize = throttle(() => {
    this.updateRoadmap();
  }, 500);

  checkShift = (index) => (index >= this.state.left && index <= this.state.right) ? true : false;

  isVisible = (month, year) => {
    const {width, innerWidth, current} = this.state;
    const items = this.getItems();
    const visibleCount = Math.floor((width - 2 * this.bushWidth) / this.slideWidth);
    const visibleShift = visibleCount - 1;
    const fullIndex = findIndex(items, item => parseFloat(month) === parseFloat(item.key) && parseFloat(year) === parseFloat(item.year));

    return fullIndex <= (current + visibleShift) && fullIndex >= (current - visibleShift);
  }

  updateRoadmap = () => {
    const roadmap = this._roadmap.current;
    const roadmapInner = this._roadmapInner.current;
    const width = roadmap.offsetWidth;
    const innerWidth = roadmapInner.offsetWidth;
    const items = this.getItems();
    const fullsize = ((innerWidth + 2 * this.bushWidth) <= width) ? true : false;
    let current = findIndex(items, (item) => (parseFloat(item.year) === parseFloat(this.yearNum) && parseFloat(item.key) === parseFloat(this.monthNum)));
    const leftShift = innerWidth - width / 2 - this.slideWidth / 2 + this.bushWidth;    
    const rightShift = width / 2 - this.bushWidth - this.slideWidth / 2;
    const left = items.length - 2 - 2 * leftShift / this.slideWidth;
    const right = items.length - 2 * rightShift / this.slideWidth;
    
    if (current > right) {
      current = Math.floor(right);
    } else if (current < left) {
      current = Math.ceil(left);
    }

    this.setState({
      fullsize: fullsize, 
      width: width, 
      innerWidth: innerWidth, 
      current: current,
      left: left,
      right: right
    });
  }
}

const Months = ({months, monthNum, odd, className, isVisible, current, items, t, yearNum}) => (
  <div className={cx(styles.roadmap__months, className, styles[`roadmap__months_${odd ? 'odd' : 'even'}`])}>
    <For each='item' index='i' of={months}>
      <div 
        key={`${item.year}_${item.key}`} 
        className={cx(
          styles.roadmap__month, 
          styles.month, 
          {
            [styles.month_already]: parseFloat(item.year) < parseFloat(yearNum) || parseFloat(item.year) === parseFloat(yearNum) && parseFloat(item.key) < parseFloat(monthNum),
            [styles.month_active]: (parseFloat(monthNum) === parseFloat(item.key)) && (parseInt(item.year) === parseInt(yearNum)),
            [styles.month_invisible]: !isVisible(item.key, item.year)
          }
        )}
      >
        <If condition={odd}>
          <div className={styles.month__line}>
            <Line className={styles.month__vline} gray={!(parseFloat(item.year) < parseFloat(yearNum) || parseFloat(item.year) === parseFloat(yearNum) && parseFloat(item.key) <= parseFloat(monthNum))} />
          </div>
        </If>
        <div className={styles.month__info}>
          <div className={styles.month__title}>{t(`ico.months.item${item.key}`)}</div>
          <ul className={styles.month__description}>
            <For each='item' index='i' of={item.items}>
              <li key={i} className={styles.month__paragraph} dangerouslySetInnerHTML={{__html: item.value}} />
            </For>
          </ul>
        </div>
        <If condition={!odd}>
          <div className={styles.month__line}>
            <Line className={styles.month__vline} gray={!(parseFloat(item.year) < parseFloat(yearNum) || parseFloat(item.year) === parseFloat(yearNum) && parseFloat(item.key) <= parseFloat(monthNum))} />
          </div>
        </If>
        <div className={styles.month__marker}>
          <div className={styles.month__markerInner} />
        </div>
      </div>
    </For>
  </div>
);

export default Roadmap;
