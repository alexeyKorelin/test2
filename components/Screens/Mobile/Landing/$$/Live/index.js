import { Component } from 'react'
import * as S from '../';
import cx from 'classnames';
import styles from './index.sass';
import Button from 'components/Base/Button';
import { inject, observer } from 'mobx-react'

@inject('locales')
@observer
class Live extends Component {
  render() {
    const { locales: { t }} = this.props
    return (
      <S.Container className={cx(styles.root, this.props.className)}>
        <div className={styles.inlineBlock}>
          <h2 className={styles.h2}>{ t('landing.live.title') }</h2>
          <div className={cx(styles.image, styles.image_1)} />
        </div>
        <div className={styles.description} dangerouslySetInnerHTML={{ __html: t('landing.live.description') }} />
        <div className={styles.inlineBlock}>
          <Button
            className={styles.link}
            href={'/main'}
            color={'landingWhite'}
            kind={'landingPrimary'}
            prefetch
          >{ t('landing.connect') }</Button>
          <div className={cx(styles.image, styles.image_2)} />
          <div className={cx(styles.image, styles.image_3)} />
        </div>
      </S.Container>
    )
  }
}

export default Live;
