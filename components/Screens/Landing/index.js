import React, { Component } from 'react';
import * as S from './$$';
import styles from './index.sass';
import { inject, observer } from 'mobx-react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { Row, Col } from 'components/Base/Grid';
import { goUrlHash } from 'utils/utils';
import {Router} from 'routes';

@inject('categories')
@inject('actions')
@observer
class Landing extends Component {
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
    const { categories } = this.props.categories;

    return (
      <ParallaxProvider>
        <div className={styles.root}>
          <S.Main goToRegistration={this.goToRegistration} />
          <S.About id={'about'} className={styles.about}  />
          <S.Persons id={'whom'} className={styles.persons}  />
          <S.Catalog className={styles.catalog} categories={categories}  />
          <S.Works id={'how'} goToRegistration={this.goToRegistration}  />
          <S.Section className={styles.spot2}>
            <S.Live className={styles.live}  />
            <S.Advantages id={'advantages'} className={styles.advs}  />
          </S.Section>
          <S.Section id={'telegram'} className={styles.spot3}>
            <S.Events className={styles.events}  />
            <S.Section className={styles.wave}>
              <S.Months id={'great'} className={styles.months}  />
            </S.Section>
          </S.Section>
          <S.Section className={styles.spot4}>
            <S.Final className={styles.final} goToRegistration={this.goToRegistration}  />
          </S.Section>
          <S.Footer  />
        </div>
      </ParallaxProvider>
    );
  }
}

export default Landing;
