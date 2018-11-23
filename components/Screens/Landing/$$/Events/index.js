import * as S1 from '../';
import cx from 'classnames';
import styles from './index.sass';
import { Parallax } from 'react-scroll-parallax';
import Button from 'components/Base/Button';
import { events as data } from 'utils/mock';
import Settings from 'config';
import { inject, observer } from 'mobx-react';

const Events = inject("locales")(
  observer( props => {
    const {className, locales: {t}} = props;
    return (
      <div className={cx(styles.root, className)}>
        <S1.Container className={styles.container}>
          <div className={styles.info}>
            <div className={styles.title}>{t('landing.events.pc.title')}</div>
            <div className={styles.description} dangerouslySetInnerHTML={{ __html: t('landing.events.pc.description') }}></div>
            <Button
              href={'tg://resolve?domain=mentalmarket'}
              className={styles.link}
              color={'landingWhite'}
              kind={'landingPrimary'}
              target={'_blank'}
              external
            >{ t('landing.subscribe') }</Button>
            <div className={styles.postText}>{ t('landing.events.pc.postText') }</div>
          </div>
          <Parallax
            className={styles.girl}
            offsetYMax={'15px'}
            offsetYMin={'-15px'}
            offsetXMax={'-70px'}
            offsetXMin={'20px'}
            slowerScrollRate
          >
            <img src={`${Settings.assetHost}/landing/girl.png`} />
          </Parallax>
          <Parallax
            className={styles.bush10}
            offsetYMax={'15px'}
            offsetYMin={'-15px'}
            offsetXMax={'-20px'}
            offsetXMin={'20px'}
            slowerScrollRate
          >
            <img src={`${Settings.assetHost}/landing/bush-10.png`} />
          </Parallax>
          <Parallax
            className={styles.bush3}
            offsetYMax={'15px'}
            offsetYMin={'-15px'}
            offsetXMax={'-20px'}
            offsetXMin={'20px'}
            slowerScrollRate
          >
            <img src={`${Settings.assetHost}/landing/bush-3.png`} />
          </Parallax>
        </S1.Container>
              <Parallax
          className={styles.bush4}
          offsetYMax={'15px'}
          offsetYMin={'-15px'}
          offsetXMax={'-20px'}
          offsetXMin={'20px'}
          slowerScrollRate
        >
          <img src={`${Settings.assetHost}/landing/bush-4.png`} />
        </Parallax>
      </div>
    )
  })
)

export default Events;
