import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import Settings from 'config';
import H2 from 'components/Screens/Ico/$$/Base/H2';
import Documents from 'components/Screens/Ico/$$/Base/Documents';
import Container from '../Container';

@inject('locales')
@observer
class Juris extends Component {
  render () {
    const {className, locales: {t}} = this.props;
    
    return (
      <Container 
        id='juris' 
        className={cx(styles.root, className)}
        style={{backgroundImage: `url(${Settings.assetHost}/ico/juris/main-sm.png)`}}
      >
        <H2 className={styles.title} size='sm'>{t(`ico.juris.title`)}</H2>
        <div className={styles.description} dangerouslySetInnerHTML={{__html: t(`ico.juris.description`)}} />
        <div className={styles.line} />
        <div className={styles.kyc}>
          <h5 className={styles.kyc__title}>{t(`ico.juris.kyc.title`)}</h5>
          <div className={styles.kyc__description} dangerouslySetInnerHTML={{__html: t(`ico.juris.kyc.description`)}} />
          <div className={styles.kyc__controls}>  
            <a href={Settings.kyc} target='_blank' className={styles.github}>
              <img src={`${Settings.assetHost}/ico/juris/github.svg`} className={styles.github__img} />
              <span className={styles.github__label}>{t(`ico.juris.github`)}</span>
            </a>
            <div className={styles.documents}>
              <Documents />
            </div>
          </div>
        </div>
      </Container>
    )
  }  
}

export default Juris;
