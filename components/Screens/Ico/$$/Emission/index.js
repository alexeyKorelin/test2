import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import Settings from 'config';
import Section from '../Base/Section';
import {Container, Row, Col} from 'components/Base/Grid';
import H4 from '../Base/H4';
import Cap from '../Base/Cap';
import Card from '../Base/Card';
import RoundIndicator from '../Base/RoundIndicator';
import IconNew from 'components/Base/IconNew';
import {tToArray, formatPrice} from 'utils/utils';

const Emission = inject('locales')(observer(({className, locales: {t}}) =>
  <Section id='emission' className={cx(styles.root, className)}>
    <Container className={styles.container}>
      <H4 className={styles.title}>{t(`ico.emission.title`)}</H4>
      <div className={styles.caps}>
        <Cap className={styles.caps__cap} kind='s'>
          {formatPrice(t('ico.common.softcap.eth'))} <IconNew i='mntl' className={styles.caps__icon} />
        </Cap>
        <Cap className={styles.caps__cap}>
          {formatPrice(t('ico.common.hardcap.eth'))} <IconNew i='mntl' className={styles.caps__icon} />
        </Cap>
      </div>
      <Row className={styles.items}>
        <For each='item' index='i' of={tToArray(t('ico.emission.items', {returnObjects: true}))}>
          <Col key={i} xs={3}>
            <div className={styles.item}>
              <div className={styles.card}>
                <Card 
                  title={item.title} 
                  description={item.description} 
                  percent={parseFloat(item.percent)}
                  active
                  soft={<span>{formatPrice(item.soft)} <IconNew i='mntl' className={styles.card__icon} /></span>}
                  hard={<span>{formatPrice(item.hard)} <IconNew i='mntl' className={styles.card__icon} /></span>}
                />
              </div>
              <RoundIndicator className={styles.round} value={parseFloat(item.percent)} title={item.title} />
            </div>
          </Col>
        </For>
      </Row>
      <div className={styles.texts}>
        <div className={styles.text}>
          <div className={styles.text__image}>
            <img src={`${Settings.assetHost}/ico/emission/element.png`} />
          </div>
          <div className={styles.text__description}>{t(`ico.emission.texts.element`)}</div>
        </div>
        <div className={styles.text}>
          <div className={styles.text__image}>
            <img src={`${Settings.assetHost}/ico/emission/potential.png`} style={{transform: 'translate(0,-35px)'}} />
          </div>
          <div className={styles.text__description}>{t(`ico.emission.texts.potential`)}</div>
        </div>
      </div>
    </Container>
  </Section>
))

export default Emission;
