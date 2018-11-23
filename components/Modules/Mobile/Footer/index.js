import { Component } from 'react';
import styles from './index.sass';
import { Link } from 'routes';
import { inject, observer } from 'mobx-react';
import IconNew from 'components/Base/IconNew';
import Settings from 'config';
import GoTop from 'components/Modules/GoTop';

@inject('locales')
@observer
class Footer extends Component {
  render() {
    const { locales: { t } } = this.props
    return (
      <footer className={styles.root}>
        <nav>
          {/*<li>
            <Link route="/">
              <a>Пользовательское соглашение</a>
            </Link>
          </li>*/}
          <li><a className={styles.connectWithUs} href={`tg://resolve?domain=${Settings.mental_market_support}`}>{ t('footer.connectWithUs') }<IconNew i={'telegram'} size={16} /></a></li>
          <li className={styles.copy}>© 2018 Mental Market</li>
        </nav>
        <GoTop size='sm' />
      </footer>
    )
  }
}

Footer.displayName = 'Modules/Mobile/Footer';
export default Footer;
