import * as S1 from '../';
import cx from 'classnames';
import styles from './index.sass';
import { Parallax } from 'react-scroll-parallax';
import Button from 'components/Base/Button';
import { live as data } from 'utils/mock';
import Settings from 'config';
import { inject, observer } from 'mobx-react';

const Live = inject("locales")(
  observer( props => {
    const { t } = props.locales;
    return (
      <S1.Container className={cx(styles.root, props.className)}>
        <div className={styles.title}>{t('landing.live.title')}</div>
        <div className={styles.description} dangerouslySetInnerHTML={{ __html: t('landing.live.description') }} />
        <Button
          href={'/main'}
          className={styles.link}
          color={'landingWhite'}
          kind={'landingPrimary'}
          prefetch
        >{ t('landing.connect') }</Button>
        <Parallax
          className={styles.card1}
          offsetXMax={'-40px'}
          offsetXMin={'10px'}
          offsetYMax={'-15px'}
          offsetYMin={'15px'}
          slowerScrollRate
        >
          <img src={`${Settings.assetHost}/landing/card-1.png`} />
        </Parallax>
        <Parallax
          className={styles.card2}
          offsetXMax={'-40px'}
          offsetXMin={'10px'}
          offsetYMax={'-15px'}
          offsetYMin={'15px'}
          slowerScrollRate
        >
          <img src={`${Settings.assetHost}/landing/card-2.png`} />
        </Parallax>
        <Parallax
          className={styles.card3}
          offsetXMax={'40px'}
          offsetXMin={'-20px'}
          offsetYMax={'-15px'}
          offsetYMin={'15px'}
          slowerScrollRate
        >
          <img src={`${Settings.assetHost}/landing/card-3.png`} />
        </Parallax>
      </S1.Container>
    )
  })
)

export default Live;
