import { Component } from 'react'
import cx from 'classnames';
import styles from './index.sass';
import PersonsCarousel from 'components/Modules/Mobile/PersonsCarousel';
import { inject, observer } from 'mobx-react'

@inject('locales')
@observer
class Persons extends Component {
  render() {
    const { locales: { t }, className } = this.props
    return (
      <div className={cx(styles.root, className)}>
        <h2 className={styles.h2}>{ t('about.persons.title') }</h2>
        <PersonsCarousel className={styles.persons} />
      </div>
    )
  }
}

export default Persons;
