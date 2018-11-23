import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import Settings from 'config';
import {chunk} from 'lodash';
import H2 from '../Base/H2';
import Currency from '../Base/Currency';
import {Container, Row, Col} from 'components/Base/Grid';
import Toggle from 'components/Base/Toggle';
import ScrollArea from 'components/Base/ScrollArea';
import Button from 'components/Base/Button';
import {tToArray} from 'utils/utils';

@inject('locales')
@observer
class Faq extends Component {
  state = {
    active: {page: 0, item: 0},
    page: 0
  }

  render () {
    const {active, page} = this.state;
    const {className, locales: {t}} = this.props;
    const items = chunk(tToArray(t('ico.faq.items', {returnObjects: true})), 7);
    const pagesCount = items.length;
    const pages = [];
    
    for (let i = 0; i < pagesCount; i++) 
      pages.push(
        <button 
          key={i} 
          className={cx(styles.page, {[styles.page_active]: i === page})}
          onClick={() => this.togglePage(i)}
          disabled={i === page}
        >{i+1}</button>); 
    
    return (
      <Container id='faq' className={cx(styles.root, className)}>
        <H2 className={styles.title}>{t(`ico.faq.title`)}</H2>
        <div className={styles.questions}>
          <div className={styles.col}>
            <div className={styles.tabs}>
              <For each='tabItems' index='i' of={items}>
                <div key={i} className={cx(styles.tab, {[styles.tab_active]: i === page})}>
                  <For each='item' index='j' of={tabItems}>
                    <button 
                      key={j} 
                      onClick={() => this.toggleQuestion(i, j)} 
                      className={cx(
                        styles.question, 
                        {[styles.question_active]: i === active.page && j === active.item}
                      )}
                    >
                      <span className={styles.question__ghost}>{item.question}</span>
                      <span className={styles.question__text}>{item.question}</span>
                    </button>
                  </For>
                </div>
              </For>
            </div>
            <If condition={pagesCount > 1}>
              <div className={styles.pagination}>
                <If condition={page > 0}>
                  <button 
                    onClick={() => this.togglePage(page - 1)} 
                    className={styles.arrow} 
                    style={{backgroundImage: `url(${Settings.assetHost}/ico/faq/left.svg)`}} 
                  />
                </If>
                <div className={styles.pages}>{pages}</div>
                <If condition={page < (pagesCount - 1)}>
                  <button 
                    onClick={() => this.togglePage(page + 1)} 
                    className={styles.arrow} 
                    style={{backgroundImage: `url(${Settings.assetHost}/ico/faq/right.svg)`}} 
                  />
                </If>
              </div>
            </If>
          </div>
          <div className={styles.col}>
            <div className={styles.answer}>
              <ScrollArea
                className={styles.answer__scrollarea}
                smoothScrolling
                horizontal={false}
                scrollBarContainerClassName={styles.scrollbarContainer}
                scrollBarClassName={styles.scrollbar}
              >
                <div 
                  className={styles.answer__content} 
                  dangerouslySetInnerHTML={{__html: items[active.page][active.item].answer}} 
                />
              </ScrollArea>
            </div>
          </div>
        </div>
        <Container className={styles.resources}>
          <Currency currency='btc' className={styles.currency} />
          <Button 
            className={styles.resources__resource} 
            href={t('ico.resources.items.whitepaper.href')}
            kind='icoCircled'
            color='icoWhite'
          >{t('ico.resources.items.whitepaper.title')}</Button>
          <Button 
            className={styles.resources__resource} 
            href={t('ico.resources.items.onepager.href')}
            kind='icoCircled'
            color='icoGradient'
          >{t('ico.resources.items.onepager.title')}</Button>
        </Container>
      </Container>
    )
  }  

  toggleQuestion = (i, j) => this.setState({active: {page: i, item: j}});

  togglePage = (i) => this.setState({page: i});
}

export default Faq;
