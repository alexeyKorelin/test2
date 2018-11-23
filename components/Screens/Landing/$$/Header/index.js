import cx from 'classnames';
import styles from './index.sass';
import { Link } from 'routes';
import {scrollTo} from 'utils/utils';
import Settings from 'config';
import Language from 'components/Modules/Header/$$/Language'
import { inject, observer } from 'mobx-react';

const Header = inject("locales")(
  observer( props => {
    const { t } = props.locales;
    return (
      <div className={cx(styles.root, props.className)}>
        <Link route={'/landing'} prefetch>
          <a>
            <img
              className={styles.logo}
              src={`${Settings.assetHost}/landing/logo.svg`}
              title={'MentalMarket'}
            />
          </a>
        </Link>
        <div className={styles.links}>
          <a href={'#about'} onClick={() => scrollTo('about')} className={styles.link}>{ t('landing.aboutString') }</a>
          <a href={'#how'} onClick={() => scrollTo('how')} className={styles.link}>{ t('landing.howWorks') }</a>
          <a href={'#whom'} onClick={() => scrollTo('whom')} className={styles.link}>{ t('landing.forWhom') }</a>
          <a href={'#advantages'} onClick={() => scrollTo('advantages')} className={styles.link}>{ t('landing.advantagesString') }</a>
          <a href={'#telegram'} onClick={() => scrollTo('telegram')} className={styles.link}>{ t('landing.telegram') }</a>
          <a href={'#great'} onClick={() => scrollTo('great')} className={styles.link}>{ t('landing.great') }</a>
          <Language className={styles.language} whiteIcon />
        </div>
        <a className={styles.registrate} href='/main' onClick={props.goToRegistration}>{ t('landing.register') }</a>
      </div>
    )
  })
)

export default Header;
