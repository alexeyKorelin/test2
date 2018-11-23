import {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import Settings from 'config';
import Container from '../Container';
import H4 from 'components/Screens/Ico/$$/Base/H4';
import Cap from 'components/Screens/Ico/$$/Base/Cap';
import Card from 'components/Screens/Ico/$$/Base/Card';
import RoundIndicator from '../RoundIndicator';
import IconNew from 'components/Base/IconNew';
import {tToArray, formatPrice} from 'utils/utils';

@inject('locales')
@observer
class Emission extends Component {
  state = {
    isOpen: []
  }
  
  render () {
    const {isOpen} = this.state;
    const {className, locales: {t}} = this.props;

    return (
      <Container id='emission' className={cx(styles.root, className)}>
        <H4 className={styles.title}>{t(`ico.emission.title`)}</H4>
        <div className={styles.caps}>
          <div className={styles.caps}>
            <div className={styles.caps__inner}>
              <Cap className={styles.caps__cap} kind='s' size='sm'>
                {formatPrice(t('ico.common.softcap.eth'))} <IconNew i='mntl' className={styles.caps__icon} />
              </Cap>
              <Cap className={styles.caps__cap} size='sm'>
                {formatPrice(t('ico.common.hardcap.eth'))} <IconNew i='mntl' className={styles.caps__icon} />
              </Cap>
            </div>
          </div>
        </div>
        <div className={styles.items}>
          <For each='item' index='i' of={tToArray(t('ico.emission.items', {returnObjects: true}))}>
            <div key={i} className={cx(styles.items__item, styles.item, {[styles.item_active]: isOpen.includes(i)})}>
              <div className={styles.card} onClick={() => this.toggle(i)}>
                <Card 
                  className={styles.card__card}
                  title={item.title} 
                  description={item.description} 
                  percent={parseFloat(item.percent)}
                  active
                  soft={<span>{formatPrice(item.soft)} <IconNew i='mntl' className={styles.card__icon} /></span>}
                  hard={<span>{formatPrice(item.hard)} <IconNew i='mntl' className={styles.card__icon} /></span>}
                />
              </div>
              <div className={styles.round}>
                <RoundIndicator value={item.percent} title={item.title} />
              </div>
            </div>
          </For>
        </div>
        <div className={styles.texts}>
          <div className={cx(styles.texts__text, styles.text)}>
            <div className={styles.text__image}>
              <img src={`${Settings.assetHost}/ico/emission/element-sm.png`} />
            </div>
            <div className={styles.text__description}>{t(`ico.emission.texts.element`)}</div>
          </div>
          <div className={cx(styles.texts__text, styles.text)}>
            <div className={styles.text__image}>
              <img src={`${Settings.assetHost}/ico/emission/potential-sm.png`} />
            </div>
            <div className={styles.text__description}>{t(`ico.emission.texts.potential`)}</div>
          </div>
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

export default Emission;
