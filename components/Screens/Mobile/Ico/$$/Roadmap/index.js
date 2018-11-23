import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import {sortBy, throttle, findIndex} from 'lodash';
import Settings from 'config';
import Container from '../Container';
import Line from 'components/Screens/Ico/$$/Roadmap/$$/Line';
import H2 from 'components/Screens/Ico/$$/Base/H2';
import Toggle from 'components/Base/Toggle';
import ScrollArea from 'components/Base/ScrollArea';
import {tToArray} from 'utils/utils';

@inject('locales')
@observer
class Roadmap extends Component {
  _roadmap = React.createRef();
  _scrollArea = React.createRef();

  slideWidth = 290;  
  date = new Date();
  yearNum = this.date.getFullYear();
  monthNum = this.date.getMonth();

  componentDidMount() {
    const scrollArea = this._scrollArea.current;
    const items = this.getItems();
    const shift = (this._roadmap.current.offsetWidth - this.slideWidth) / 2;
    // костыль прокрутки - баг в библиотеке (https://github.com/souhe/reactScrollbar/issues/46)
    setTimeout(() => scrollArea.scrollArea.scrollXTo(-1 * shift + 15 + this.slideWidth / 2 * items.findIndex(item => parseInt(item.key) === parseInt(this.monthNum))), 1);
  }

  render () {
    const {className, locales: {t}} = this.props;
    const items = this.getItems();
    let evenMonths = [];
    let oddMonths = [];
    let i = 0;

    items.forEach(item => {
      if (i % 2 === 0) {
        evenMonths.push(item);
      } else {
        oddMonths.push(item);
      }

      i++;
    });
    
    return (
      <div id='roadmap' className={cx(styles.root, className)}>
        <Container className={styles.header}>
          <H2 className={styles.title} size='sm'>{t(`ico.roadmap.title`)}</H2>
          <div className={styles.description} dangerouslySetInnerHTML={{__html: t(`ico.roadmap.description`)}} />
          <div className={styles.links}>
            <a target='_blank' href={t('ico.resources.items.whitepaper.href')} className={styles.links__link}>
              {t('ico.resources.items.whitepaper.title')}
            </a>
            <a target='_blank' href={t('ico.resources.items.onepager.href')} className={styles.links__link}>
              {t('ico.resources.items.onepager.title')}
            </a>
          </div>
        </Container>
        <div ref={this._roadmap} className={styles.roadmap}>
          <img 
            className={cx(styles.roadmap__bush, styles.roadmap__bush_left)} 
            src={`${Settings.assetHost}/ico/roadmap/bush-left.svg`} 
          />
          <img 
            className={cx(styles.roadmap__bush, styles.roadmap__bush_right)} 
            src={`${Settings.assetHost}/ico/roadmap/bush-right.svg`} 
          />
          <ScrollArea
            ref={this._scrollArea}
            smoothScrolling
            vertical={false}
            horizontal={true}
            scrollBarContainerClassName={styles.scrollbarContainer}
            scrollBarClassName={styles.scrollbar}
            contentClassName={styles.roadmap__content}
          >
            <div className={styles.roadmap__inner}>
              <Months 
                months={evenMonths} 
                monthNum={this.monthNum} 
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
                odd
                t={t}
                yearNum={this.yearNum}
              />
            </div>  
          </ScrollArea>
        </div> 
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
}

const Months = ({months, monthNum, odd, className, isVisible, items, yearNum, t}) => (
  <div className={cx(styles.roadmap__months, className, styles[`roadmap__months_${odd ? 'odd' : 'even'}`])}>
    <For each='item' index='i' of={months}>
      <div 
        key={`${item.year}_${item.key}`} 
        className={cx(
          styles.roadmap__month, 
          styles.month, 
          {
            [styles.month_already]: parseFloat(item.year) < parseFloat(yearNum) || parseFloat(item.year) === parseFloat(yearNum) && parseFloat(item.key) < parseFloat(monthNum),
            [styles.month_active]: (parseFloat(monthNum) === parseFloat(item.key)) && (parseInt(item.year) === parseInt(yearNum))
          }
        )}
      >
        <If condition={odd}>
          <div className={styles.month__line}>
            <Line className={styles.month__vline} gray={!(parseFloat(item.year) < parseFloat(yearNum) || parseFloat(item.year) === parseFloat(yearNum) && parseFloat(item.key) < parseFloat(monthNum))} />
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
            <Line className={styles.month__vline} gray={!(parseFloat(item.year) < parseFloat(yearNum) || parseFloat(item.year) === parseFloat(yearNum) && parseFloat(item.key) < parseFloat(monthNum))} />
          </div>
        </If>
        <div className={cx(styles.month__marker)} />
      </div>
    </For>
  </div>
);

export default Roadmap;
