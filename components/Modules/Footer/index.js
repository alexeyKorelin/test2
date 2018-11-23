import { Component } from 'react';
import {Container} from 'components/Base/Grid';
import { Link } from 'routes';
import { inject, observer } from 'mobx-react';
import styles from './index.sass';
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
        <Container className={styles.container}>
          <div className={styles.copy}>
            © 2018 Mental Market
          </div>
          <div className={styles.links}>
            <a
              href="https://mentalmarket.zendesk.com/hc/ru"
              target="_blank"
              className={styles.link}
            >
              { t('footer.help') }
            </a>
            <Link route="/about"><a className={styles.link}>{ t('footer.about') }</a></Link>
            {/* <Link route='/ico'><a className={styles.link}>{ t('ico.ico.title') }</a></Link> */}
            {/*<Link route="/rules"><a className={styles.link}>Пользовательское соглашение</a></Link>*/}
          </div>
          <div className={styles.connectWithUs}>
            <a href={`tg://resolve?domain=${Settings.mental_market_support}`}>{ t('footer.connectWithUs') }<IconNew i={'telegram'} size={16} /></a>
          </div>
        </Container>
        <GoTop />
      </footer>
    );
  }
}

Footer.displayName = 'Modules/Footer';
export default Footer
