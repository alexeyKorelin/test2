import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import Settings from 'config';
import H2 from '../Base/H2';
import Currency from '../Base/Currency';
import {Container, Row, Col} from 'components/Base/Grid';
import {tToArray} from 'utils/utils';

const Ico = inject('locales')(observer(({className, locales: {t}}) => 
  <Container id='ico' className={cx(styles.root, className)}>
    <Currency currency='dash' className={styles.currency} />
    <H2 className={styles.title}>{t(`ico.ico.title`)}</H2>
    <div className={styles.description} dangerouslySetInnerHTML={{__html: t(`ico.ico.description`)}} />
    <Row className={styles.items}>
      <For each='item' index='i' of={tToArray(t('ico.ico.items', {returnObjects: true}))}>
        <Col className={styles.item} key={i} xs={3}>
          <div className={styles.image}>
            <div className={styles.image__inner}>
              <img 
                src={`${Settings.assetHost}/${item.image}`} 
                alt={item.title} 
                title={item.title}
                className={styles.image__img} 
              />
            </div>
          </div>
          <div className={styles.item__title} dangerouslySetInnerHTML={{__html: item.title}} />
          <div className={styles.item__description} dangerouslySetInnerHTML={{__html: item.description}} />
        </Col>
      </For>
    </Row>
  </Container>
))

export default Ico;
