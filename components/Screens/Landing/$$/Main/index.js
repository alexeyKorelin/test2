import React, {Component} from 'react';
import * as S1 from '../';
import * as S2 from './$$';
import cx from 'classnames';
import styles from './index.sass';
import { Parallax } from 'react-scroll-parallax';
import { Row, Col } from 'components/Base/Grid';
import Settings from 'config';
import { inject, observer } from 'mobx-react';

@inject('locales')
@observer
class Main extends Component {
  render () {
    const {locales: {t}} = this.props;
    return (
      <S1.Section className={styles.root}>
        <S1.Container>
          <S1.Header goToRegistration={this.props.goToRegistration} />
        </S1.Container>
        <S1.Container className={styles.content}>
          <Row>
            <Col size={5}>
              <S2.Info className={styles.info} goToRegistration={this.props.goToRegistration} />
            </Col>
          </Row>
          <Parallax
              className={styles.screens}
              offsetXMax={'-20px'}
              offsetXMin={'20px'}
              offsetYMax={'-15px'}
              offsetYMin={'15px'}
              slowerScrollRate
          >
            <img src={`${Settings.assetHost}/landing/screens-1.png`} />
          </Parallax>
          <Parallax
              className={styles.man}
              offsetYMax={'-30px'}
              offsetYMin={'30px'}
              offsetXMax={'20px'}
              offsetXMin={'-20px'}
              slowerScrollRate
          >
            <img src={`${Settings.assetHost}/landing/man-back.png`} />
          </Parallax>
        </S1.Container>
        <Parallax
          className={styles.bush1}
          offsetYMax={'15px'}
          offsetYMin={'-15px'}
          offsetXMax={'-20px'}
          offsetXMin={'20px'}
          slowerScrollRate
        >
          <img src={`${Settings.assetHost}/landing/bush-1.png`} />
        </Parallax>
        <Parallax
          className={styles.bush2}
          offsetYMax={'15px'}
          offsetYMin={'-15px'}
          offsetXMax={'-20px'}
          offsetXMin={'20px'}
          slowerScrollRate
        >
          <img src={`${Settings.assetHost}/landing/bush-2.png`} />
        </Parallax>
      </S1.Section>
    )
  }
}


export default Main;
