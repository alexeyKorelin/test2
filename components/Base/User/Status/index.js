import { Component } from 'react'
import cx from 'classnames';
import styles from './index.sass';
import { inject, observer } from 'mobx-react'

@inject('locales')
@observer
class Status extends Component {
  render() {
    const { locales: { t }, className, active } = this.props
    return (
      <span className={cx(styles.status, className, active ? styles.status_active : styles.status_inactive)}>
        {active ? t('profile.active') : t('profile.inactive') }
      </span>
    )
  }
}

export default Status;
