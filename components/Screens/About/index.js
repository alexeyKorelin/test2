import React, {Component} from 'react';
import ChannelBanner from 'components/Modules/ChannelBanner';
import * as S from './$$';
import styles from './index.sass';
import {Container} from 'components/Base/Grid';
import { inject, observer } from 'mobx-react';

@inject('actions')
@inject('locales')
@observer
class About extends Component {
  render() {
    const { actions, locales: { t } } = this.props;

    return (
      <Container>
        <h1 className={styles.h1}>{ t('about.startText.pc.title') }</h1>
        <S.StartText className={styles.startText} />
        <S.Persons className={styles.persons} />
        <S.Advs className={styles.advs} />
        <S.Steps auth={() => actions.setAction('authorize')} />
        <ChannelBanner />
      </Container>
    );
  }
}

export default About;
