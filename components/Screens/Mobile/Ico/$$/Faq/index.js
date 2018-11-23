import {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import Settings from 'config';
import Container from '../Container';
import H2 from 'components/Screens/Ico/$$/Base/H2';
import Toggle from 'components/Base/Toggle';
import Button from 'components/Base/Button';
import IconNew from 'components/Base/IconNew';
import ScrollArea from 'components/Base/ScrollArea';
import {tToArray} from 'utils/utils';

@inject('locales')
@observer
class Faq extends Component {
  state = {
    isOpen: []
  }

  render () {
    const {isOpen} = this.state;
    const {className, locales: {t}} = this.props;
    const items = tToArray(t(`ico.faq.items`, {returnObjects: true}));
    
    return (
      <Container id='faq' className={cx(styles.root, className)}>
        <H2 size='sm'>{t('ico.faq.title')}</H2>
        <Toggle>
          <If condition={items.length}>
            <div className={styles.items}>
              <For each='item' index='i' of={items}>
                <div 
                  key={i} 
                  className={cx(
                    styles.items__item, 
                    styles.item, 
                    {[styles.item_active]: isOpen.includes(i)}
                  )}
                >
                  <button className={styles.item__toggler} onClick={() => this.toggle(i)}>
                    <span className={styles.item__question}>{item.question}</span>
                    <IconNew className={styles.item__caret} i='caret-down' />
                  </button>
                  <div className={cx(styles.item__answer, styles.answer)}>        
                    <ScrollArea
                      className={styles.answer__scrollarea}
                      smoothScrolling
                      horizontal={false}
                      scrollBarContainerClassName={styles.scrollbarContainer}
                      scrollBarClassName={styles.scrollbar}
                    >
                      <div className={styles.answer__inner} dangerouslySetInnerHTML={{__html: item.answer}} />
                    </ScrollArea>
                  </div>
                </div>
              </For>
            </div>
          </If>
        </Toggle>
        <div className={styles.controls}>
            <Button 
              href={t('ico.resources.items.whitepaper.href')}
              external
              target='_blank'
              className={styles.controls__btn} 
              color='icoWhite' 
              kind='icoCircled'
            >{t('ico.resources.items.whitepaper.title')}</Button>
            <Button
              href={t('ico.resources.items.onepager.href')}
              external
              target='_blank' 
              className={styles.controls__btn} 
              color='icoGradient' 
              kind='icoCircled'
            >{t('ico.resources.items.onepager.title')}</Button>
        </div>
      </Container>
    )
  }  

  toggle = (i) => {
    let {isOpen} = this.state;
    
    if (isOpen.includes(i)) { 
      isOpen.splice(isOpen.indexOf(i), 1);
    } else {
      isOpen = [i];
    }

    this.setState({isOpen: isOpen});
  }
}

export default Faq;
