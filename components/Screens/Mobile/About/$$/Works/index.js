import { Component } from 'react'
import * as S1 from '../';
import * as S2 from './$$';
import cx from 'classnames';
import styles from './index.sass';
import Button from 'components/Base/Button';
import { CardsCarousel } from 'components/Modules/Mobile/CardsCarousel';
import { works as data } from 'utils/mock';
import { inject, observer } from 'mobx-react'

@inject('locales')
@observer
class Works extends Component {
  render() {
    const { locales: { t }, className } = this.props
    const works = data.mobile.steps.map((work, i) => (
      <S2.Work
        key={i}
        i={i}
        {...work}
        title={ t(`landing.works.mobile.steps_title_${i}`) }
        description={ t(`landing.works.mobile.steps_description_${i}`) }
      />
    ));
    const { props } = this
    return (
      <div className={cx(styles.root, className)} {...props}>
        <h1 className={styles.title}>{ t('landing.howWorks') }</h1>
        <CardsCarousel className={styles.carousel} list={works} />
      </div>
    )
  }
}

export default Works;
