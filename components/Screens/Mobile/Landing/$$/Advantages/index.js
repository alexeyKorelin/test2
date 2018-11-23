import { Component } from 'react'
import * as S from '../';
import cx from 'classnames';
import styles from './index.sass';
import Advs from 'components/Modules/Mobile/Advs';
import { advantages as data } from 'utils/mock';
import { inject, observer } from 'mobx-react'

@inject('locales')
@observer
class Advantages extends Component {
  render() {
    const { className, locales: { t }} = this.props
    return (
      <div className={cx(styles.root, className)} {...this.props}>
        <S.Container>
          <h2 className={styles.h2}>{ t('landing.advantages.title') }</h2>
        </S.Container>
        <Advs />
        <div className={styles.description} dangerouslySetInnerHTML={{ __html: t('landing.advantages.description')}} />
      </div>
    )
  }
}

export default Advantages;
