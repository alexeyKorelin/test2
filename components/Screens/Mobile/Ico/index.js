import {Component} from 'react';
import * as S from './$$';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';

@inject('locales')
@observer
class MobileIco extends Component {
  render() {
    const { locales: { t }} = this.props;

    return (
      <div className={styles.root}>
        <S.Header className={styles.header} />
        <S.Main className={styles.main} />
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
        <div className={styles.bottom}>
          <S.Team className={styles.team} />
          <S.Faq className={styles.faq} /> 
          <S.Footer className={styles.footer} />
        </div>
      </div>
    );
  }
}

MobileIco.displayName = 'Screens/Mobile/Ico';

export default MobileIco;
