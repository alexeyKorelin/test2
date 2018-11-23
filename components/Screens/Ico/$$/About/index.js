import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import Settings from 'config';
import H2 from '../Base/H2';
import Section from '../Base/Section';
import Currency from '../Base/Currency';
import {Container, Row, Col} from 'components/Base/Grid';
import {tToArray} from 'utils/utils';

const About = inject('locales')(observer(({className, locales: {t}}) =>
  <Section id='about' className={cx(styles.root, className)}>
    <Container className={styles.container}>
      <Currency className={cx(styles.image, styles.image_1)} currency='bch' />
      <Currency className={cx(styles.image, styles.image_2)} currency='xrp' />
      <Currency className={cx(styles.image, styles.image_3)} currency='zch' />
      <Row className={styles.items}>
        <Col xs={6}>
          <img className={styles.mainImage} src={`${Settings.assetHost}/ico/about/main.png`} />
        </Col>
        <Col xs={6}>
          <H2 className={styles.title} align='left'>{t(`ico.about.title`)}</H2>
          <div className={styles.description} dangerouslySetInnerHTML={{__html: t(`ico.about.description`)}} />
          <ul className={styles.features}>
            <For each='item' index='i' of={tToArray(t('ico.about.features', {returnObjects: true}))}>
              <li key={i} className={styles.feature}>
                <div className={styles.feature__title} dangerouslySetInnerHTML={{__html: item.title}} />
                <div 
                  className={styles.feature__description} 
                  dangerouslySetInnerHTML={{__html: item.description}} 
                />
              </li>
            </For>
          </ul>
        </Col>
      </Row>
    </Container>
  </Section>
))

export default About;
