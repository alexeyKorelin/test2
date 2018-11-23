import * as S1 from '../';
import cx from 'classnames';
import styles from './index.sass';
import IconNew from 'components/Base/IconNew';
import { Parallax } from 'react-scroll-parallax';
import Settings from 'config';
import { inject, observer } from 'mobx-react';

const Footer = inject("locales")(
  observer(props => {
    const { t } = props.locales;
    return (
      <S1.Section className={cx(styles.root, props.className)}>
        <S1.Container>
          <div className={styles.description}>{ t('landing.footer.description') }</div>
          <div className={styles.links}>
            <a className={styles.link} href={'/main'} target={'_blank'}>
              <IconNew className={styles.icon} i={'instagram'} size={22} style={{lineHeight: '22px'}} />
            </a>
            <a className={styles.link} href={'/main'} target={'_blank'}>
              <IconNew className={styles.icon} i={'facebook'} size={22} style={{lineHeight: '22px'}} />
            </a>
            <a className={styles.link} href={'/main'} target={'_blank'}>
              <IconNew className={styles.icon} i={'twitter'} size={18} style={{lineHeight: '18px'}} />
            </a>
          </div>
        </S1.Container>
        <Parallax
            className={styles.bush7}
            offsetYMax={'10px'}
            offsetYMin={'-10px'}
            offsetXMax={'20px'}
            offsetXMin={'-20px'}
            slowerScrollRate
          >
          <img src={`${Settings.assetHost}/landing/bush-7.png`} />
        </Parallax>
      </S1.Section>
    )
  })
)

export default Footer;
