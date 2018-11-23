import React, {Component} from 'react';
import cx from 'classnames';
import * as S from './$$';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import {ParallaxProvider, Parallax} from 'react-scroll-parallax';
import {goUrlHash} from 'utils/utils';
import Settings from 'config';

@observer
class Ico extends Component {
  componentDidMount() {
    goUrlHash(-110);
  }

  render() {
    return (
      <ParallaxProvider>
        <div className={styles.root}>
          <S.Main className={styles.main} />
          <div className={styles.blue}>
            <div className={styles.undercover}>
              <Parallax
                className={cx(styles.hill, styles.hill_1)}
                offsetYMax={'300px'}
                offsetYMin={'-400px'}
                styleInner={{position: 'relative', width: '100%', height: '100%'}} 
              >
                <img src={`${Settings.assetHost}/ico/footer/hill-5.svg`} className={styles.hill__img} />
              </Parallax>
              <Parallax
                className={cx(styles.hill, styles.hill_2)}
                offsetYMax={'200px'}
                offsetYMin={'-300px'}
                styleInner={{position: 'relative', width: '100%', height: '100%'}} 
              >
                <img src={`${Settings.assetHost}/ico/footer/hill-7.svg`} className={styles.hill__img} />
              </Parallax>
              <Parallax
                className={cx(styles.hill, styles.hill_3)}
                offsetYMax={'100px'}
                offsetYMin={'-200px'}
                styleInner={{position: 'relative', width: '100%', height: '100%'}} 
              >
                <img src={`${Settings.assetHost}/ico/footer/hill-6.svg`} className={styles.hill__img} />
              </Parallax>
            </div>
            <S.Investors className={styles.investors} />
            <S.About className={styles.about} />
            <S.Functionality className={styles.functionality} />
            <S.Global className={styles.global} />
            <S.Roadmap className={styles.roadmap} />
            <S.Market className={styles.market} />
            <S.Ico className={styles.ico} />
            <S.Emission className={styles.emission} />
            <S.Distribution className={styles.distribution} />
            <S.Converter className={styles.converter} />
            <S.Juris className={styles.juris} />
            <S.Team className={styles.team} />
            <S.Faq className={styles.faq} />
            <S.Footer className={styles.footer} />
          </div>
        </div>
      </ParallaxProvider>
    );
  }
}

export default Ico;
