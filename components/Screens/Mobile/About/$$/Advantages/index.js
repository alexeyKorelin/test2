import { Component } from 'react'
import cx from 'classnames';
import styles from './index.sass';
import Advs from 'components/Modules/Mobile/Advs';
import Button from 'components/Base/Button';
import { inject, observer } from 'mobx-react'

@inject('locales')
@observer
class Advantages extends Component {
  render() {
    const { locales: { t }, className } = this.props
    return (
      <div className={cx(styles.root, className)}>
        <h2 className={styles.h2}>{ t('landing.advantages.title') }</h2>
        <Advs className={styles.advs} />
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: t('landing.advantages.description_mobile') }}
        />
        <Button className={styles.readMore} color={'transparent'} href={'/about'} block external>{ t('about.details') }</Button>
      </div>
    )
  }
}

export default Advantages;
