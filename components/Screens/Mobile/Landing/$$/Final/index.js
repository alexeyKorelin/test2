import { Component } from 'react'
import cx from 'classnames';
import styles from './index.sass';
import Button from 'components/Base/Button';
import { inject, observer } from 'mobx-react'

@inject('locales')
@observer
class Final extends Component {
  render() {
    const { locales: { t }, className } = this.props
    return (
      <div className={cx(styles.root, className)}>
        <h2 className={styles.h2}>{ t('landing.final.title') }</h2>
        <div className={styles.description}>{ t('landing.final.description') }</div>
        <Button
          onClick={this.props.goToRegistration}
          className={styles.registrate}
          color={'landingWhite'}
          kind={'landingPrimary'}
        >{ t('landing.register') }</Button>
      </div>
    )
  }
}

export default Final;
