import { Component } from 'react'
import * as S1 from '../';
import * as S2 from './$$';
import cx from 'classnames';
import styles from './index.sass';
import Button from 'components/Base/Button';
import { CardsCarousel } from 'components/Modules/Mobile/CardsCarousel';
import { about as data } from 'utils/mock';
import { inject, observer } from 'mobx-react'

@inject('locales')
@observer
class About extends Component {
  render() {
    const { className, locales: { t }} = this.props
    const advs = data.mobile.advs.map((adv, i) => (
      <S2.Adv key={i} image={adv.src} title={ t(`landing.about.mobile.advs_title_${i}`) } description={ t(`landing.about.mobile.advs_description_${i}`) } />
    ));

    return (
      <div className={cx(styles.root, className)} {...this.props}>
        <S1.Container>
          <h1 className={styles.title}>{ t('landing.about.title') }</h1>
          <div className={styles.description} dangerouslySetInnerHTML={{ __html: t('landing.about.description') }} />
        </S1.Container>
        <CardsCarousel className={styles.carousel} list={advs} />
        <S1.Container>
          <div className={styles.postText} dangerouslySetInnerHTML={{ __html: t('landing.about.postText') }} />
          <Button
            href={'/main'}
            className={styles.createAd}
            color={'landingTransparent'}
            kind={'landingPrimary'}
            prefetch
          >{ t('landing.placeAd') }</Button>
        </S1.Container>
      </div>
    )
  }
}

export default About;
