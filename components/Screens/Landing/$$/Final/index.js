import * as S from '../';
import cx from 'classnames';
import styles from './index.sass';
import { Row, Col } from 'components/Base/Grid';
import { Parallax } from 'react-scroll-parallax';
import Button from 'components/Base/Button';
import { final as data } from 'utils/mock';
import Settings from 'config';
import { inject, observer } from 'mobx-react';

const Final = inject("locales")(
  observer(props => {
    const { t } = props.locales;
    return (
      <S.Container className={cx(styles.root, props.className)}>
        <Row>
          <Col size={5}>
            <div className={styles.title}>{ t('landing.final.title') }</div>
            <div className={styles.description}>{ t('landing.final.description') }</div>
            <Button
              onClick={props.goToRegistration}
              className={styles.registrate}
              color={'landingWhite'}
              kind={'landingPrimary'}
              prefetch
            >{ t('landing.register') }</Button>
          </Col>
        </Row>
        <Parallax
            className={styles.bush8}
            offsetYMax={'15px'}
            offsetYMin={'-15px'}
            offsetXMax={'-20px'}
            offsetXMin={'40px'}
            slowerScrollRate
          >
          <img src={`${Settings.assetHost}/landing/bush-8.png`} />
        </Parallax>
        <Parallax
            className={styles.bush9}
            offsetYMax={'10px'}
            offsetYMin={'-10px'}
            offsetXMax={'-10px'}
            offsetXMin={'15px'}
            slowerScrollRate
          >
          <img src={`${Settings.assetHost}/landing/bush-9.png`} />
        </Parallax>
        <Parallax
            className={styles.table}
            offsetYMax={'15px'}
            offsetYMin={'-15px'}
            slowerScrollRate
          >
          <img src={`${Settings.assetHost}/landing/table.png`} />
        </Parallax>
        <Parallax
            className={styles.man}
            offsetYMax={'20px'}
            offsetYMin={'-20px'}
            offsetXMax={'-15px'}
            offsetXMin={'15px'}
            slowerScrollRate
          >
          <img src={`${Settings.assetHost}/landing/man-pc.png`} />
        </Parallax>
        <Parallax
            className={styles.B}
            offsetYMax={'-40px'}
            offsetYMin={'40px'}
            offsetXMax={'-40px'}
            offsetXMin={'40px'}
            slowerScrollRate
          >
          <img src={`${Settings.assetHost}/landing/B.png`} />
        </Parallax>
        <Parallax
            className={styles.D}
            offsetYMax={'15px'}
            offsetYMin={'-15px'}
            offsetXMax={'-40px'}
            offsetXMin={'40px'}
            slowerScrollRate
          >
          <img src={`${Settings.assetHost}/landing/D.png`} />
        </Parallax>
        <Parallax
            className={styles.L}
            offsetYMax={'-30px'}
            offsetYMin={'15px'}
            offsetXMax={'60px'}
            offsetXMin={'0px'}
            slowerScrollRate
          >
          <img src={`${Settings.assetHost}/landing/L.png`} />
        </Parallax>
        <Parallax
            className={styles.Z}
            offsetYMax={'-15px'}
            offsetYMin={'15px'}
            offsetXMax={'30px'}
            offsetXMin={'-10px'}
            slowerScrollRate
          >
          <img src={`${Settings.assetHost}/landing/Z.png`} />
        </Parallax>
      </S.Container>
    )
  })
)

export default Final;
