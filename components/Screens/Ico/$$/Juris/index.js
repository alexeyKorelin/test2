import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import Settings from 'config';
import H2 from '../Base/H2';
import Currency from '../Base/Currency';
import Documents from '../Base/Documents';
import {Container, Row, Col} from 'components/Base/Grid';

@inject('locales')
@observer
class Juris extends Component {
  render () {
    const {className, locales: {t}} = this.props;
    
    return (
      <Container id='juris' className={cx(styles.root, className)}>
        <Row>
          <Col xs={6}>
            <img className={styles.mainImage} src={`${Settings.assetHost}/ico/juris/main.png`} />
          </Col>
          <Col xs={6}>
            <div className={styles.title}>
              <H2 className={styles.title__label} align='left'>{t(`ico.juris.title`)}</H2>
              <div className={styles.documents}>
                <Documents />
              </div>
            </div>
            <div className={styles.description} dangerouslySetInnerHTML={{__html: t(`ico.juris.description`)}} />
            <div className={styles.line} />
            <div className={styles.kyc}>
              <h5 className={styles.kyc__title}>{t(`ico.juris.kyc.title`)}</h5>
              <div className={styles.kyc__description} dangerouslySetInnerHTML={{__html: t(`ico.juris.kyc.description`)}} />
              <a href={Settings.kyc} target='_blank' className={styles.github}>
                <img src={`${Settings.assetHost}/ico/juris/github.svg`} className={styles.github__img} />
                <span className={styles.github__label}>{t(`ico.juris.github`)}</span>
              </a>
            </div>
          </Col>
        </Row>
        <Currency currency='btc' className={styles.currency} />
      </Container>
    )
  }  
}

export default Juris;
