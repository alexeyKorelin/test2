import { Component } from 'react'
import * as S1 from '../';
import * as S2 from './$$';
import cx from 'classnames';
import styles from './index.sass';
import Button from 'components/Base/Button';
import { works as data } from 'utils/mock';
import { inject, observer } from 'mobx-react'

@inject('locales')
@observer
class Works extends Component {
  render() {
    const { locales: { t }, className, id } = this.props
    const works = data.mobile.steps.map((work, i) => (
      <S2.Work key={i} i={i} className={styles.work} {...work} title={ t(`landing.works.mobile.steps_title_${i}`) } description={ t(`landing.works.mobile.steps_description_${i}`) }/>
    ));

    return (
      <S1.Container className={cx(styles.root, className)} id={id}>
        <h2 className={styles.h2}>{ t('landing.howWorks') }</h2>
        {works}
        <Button
          className={styles.registrate}
          onClick={this.props.goToRegistration}
          color={'landingTransparent'}
          kind={'landingPrimary'}
        >{ t('landing.register') }</Button>
      </S1.Container>
    )
  }
}

export default Works;
