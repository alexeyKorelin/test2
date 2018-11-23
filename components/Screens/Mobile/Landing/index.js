import * as S from './$$';
import React, {Component} from 'react';
import styles from './index.sass';
import {Wrapper, goUrlHash} from 'utils/utils';
import { inject, observer } from 'mobx-react';
import {Router} from 'routes';

@inject('actions')
@observer
class MobileLanding extends Component {
  goToRegistration = (e) => {
    e.preventDefault()
    const { actions } = this.props;
    Router.pushRoute('/main');
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
    actions.setAction('authorize');
  }

  componentDidMount() {
    goUrlHash();
  }

  render() {
    return (
      <div className={styles.root}>
        <S.Container className={styles.mainScreen}>
          <S.Header />
          <S.Main className={styles.main} goToRegistration={this.goToRegistration} />
        </S.Container>
        <S.About id={'about'} />
        <S.Persons id={'whom'} className={styles.persons} />
        <S.Works id={'how'} className={styles.works} goToRegistration={this.goToRegistration} />
        <div className={styles.spot2}>
          <S.Live className={styles.live} />
        </div>
        <S.Advantages id={'advantages'} className={styles.advs} />
        <div className={styles.flies}>
          <div className={styles.spot3}>
            <S.Events className={styles.events} />
          </div>
        </div>
        <S.Months id={'plans'} className={styles.months} />
        <S.Container className={styles.spot4}>
          <S.Final className={styles.final} goToRegistration={this.goToRegistration} />
        </S.Container>
        <S.Footer />
      </div>
    );
  }
}

MobileLanding.displayName = 'Screens/Mobile/Landing';

export default MobileLanding;
