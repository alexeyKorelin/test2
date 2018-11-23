import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import {socials} from 'components/Screens/Ico/$$/Footer/mock.js';
import Settings from 'config';
import {Link} from 'routes';
import {scrollTo} from 'utils/utils';
import Container from '../Container';

const Footer = inject('locales')(observer(({locales: {t}, className}) =>
  <footer className={cx(styles.root, className)}>
    <Container>
      <Link route='/'>
        <a className={styles.logo}>
          <img 
            className={styles.logo__img} 
            src={`${Settings.assetHost}/assets/white-logo.svg`} 
            alt={t('ico.common.company')} 
            title={t('ico.common.company')} 
          />
        </a>
      </Link>
      <br />
      <Link route='/'>
        <a className={styles.site}>mentalmarket.io</a>
      </Link>
      <div className={styles.socials}>
        <For each='item' index='i' of={socials}>
          <a key={i} className={styles.socials__link} target='_blank'>
            <img 
              src={`${Settings.assetHost}/ico/footer/${item.slug}.svg`} 
              alt={item.slug} 
              title={item.slug}
            />  
          </a>
        </For>
      </div>
    </Container>
  </footer>
));

export default Footer;
