import * as S1 from '../';
import cx from 'classnames';
import styles from './index.sass';
import Button from 'components/Base/Button';
import { Parallax } from 'react-scroll-parallax';
import { months as data } from 'utils/mock';
import Roadmap from 'components/Modules/Roadmap';
import Settings from 'config';
import { inject, observer } from 'mobx-react';

const Months = inject("locales")(
  observer(({className, locales: {t}, ...props}) => {
    return (
      <div className={cx(styles.root, className)} id={props.id}>
        <Parallax
          className={styles.bush5}
          offsetYMax={'15px'}
          offsetYMin={'-15px'}
          offsetXMax={'-20px'}
          offsetXMin={'20px'}
          slowerScrollRate
        >
          <img src={`${Settings.assetHost}/landing/bush-5.png`} />
        </Parallax>
        <S1.Container>
          <Parallax
            className={styles.bush6}
            offsetYMax={'15px'}
            offsetYMin={'-15px'}
            offsetXMax={'-20px'}
            offsetXMin={'20px'}
            slowerScrollRate
          >
            <img src={`${Settings.assetHost}/landing/bush-6.png`} />
          </Parallax>
          <h2 className={styles.h2}>{ t('landing.months.title') }</h2>
          <p className={styles.subheader}>{ t('landing.months.description') }</p>
        </S1.Container>
        <S1.Section className={styles.wave}>
          <Roadmap t={t} />
        </S1.Section>
        <S1.Container className={styles.p}>
          <Button
            href={ t('landing.months.whitepaperLink') }
            color={'landingTransparent'}
            kind={'landingPrimary'}
            target={'_blank'}
            external
          >{ t('landing.months.whitepaper') }</Button>
        </S1.Container>
      </div>
    )
  })
)

export default Months;
