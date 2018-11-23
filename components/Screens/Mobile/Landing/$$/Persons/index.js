import { Component } from 'react'
import * as S1 from '../';
import cx from 'classnames';
import styles from './index.sass';
import PersonsCarousel from 'components/Modules/Mobile/PersonsCarousel';
import { inject, observer } from 'mobx-react'

@inject('locales')
@observer
class Persons extends Component {
  render() {
    const { className, locales: { t }} = this.props
    return (
      <div className={cx(styles.root, className)} {...this.props}>
        <S1.Container>
          <h2 className={styles.h2}>{ t('landing.forWhom') }</h2>
        </S1.Container>
        <PersonsCarousel />
      </div>
    )
  }
}

export default Persons;
