import { Component } from 'react'
import * as S from '../';
import cx from 'classnames';
import styles from './index.sass';
import { Link } from 'routes';
import Button from 'components/Base/Button';
import Settings from 'config';
import { inject, observer } from 'mobx-react'

@inject('locales')
@observer
class Main extends Component {
  render() {
    const { className, locales: { t }} = this.props
    return (
      <div className={cx(styles.root, className)}>
        <Link route={'/main'} prefetch>
          <a>
            <img
              className={styles.logo}
              src={`${Settings.assetHost}/landing/logo.svg`}
              title={'MentalMarket'}
            />
          </a>
        </Link>
        <div className={styles.description} dangerouslySetInnerHTML={{ __html: t('landing.main.description') }}/>
        <div className={styles.controls}>
          <Button
            className={styles.registrate}
            onClick={this.props.goToRegistration}
            color={'landingWhite'}
            kind={'landingPrimary'}
          >{ t('landing.register') }</Button><br />
          <Link route={'/main'} prefetch>
            <a className={styles.site}>{ t('landing.goToSite') }</a>
          </Link>
        </div>
      </div>
    )
  }
}

export default Main;
