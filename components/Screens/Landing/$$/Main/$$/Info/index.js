import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import { Link } from 'routes';
import Button from 'components/Base/Button';
import { main as data } from 'utils/mock';
import { inject, observer } from 'mobx-react';

@inject('locales')
@observer
class Info extends Component {
  render () {
    const { locales: {t} } = this.props;

    return (
      <div className={cx(styles.root, this.props.className)}>
        <div className={styles.title}>{t('landing.main.title')}</div>
        <div className={styles.description} dangerouslySetInnerHTML={{ __html: t('landing.main.description') }} />
        <div className={styles.controls}>
          <Button onClick={this.props.goToRegistration} color={'landingWhite'} kind={'landingPrimary'}>{ t('landing.register') }</Button>
          <Link route={'/main'} prefetch>
            <a className={styles.registrate}>{t('landing.goToSite')}</a>
          </Link>
        </div>
      </div>
    )
  }
}

export default Info;
