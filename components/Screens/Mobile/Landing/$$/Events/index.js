import { Component } from 'react'
import * as S from '../';
import cx from 'classnames';
import styles from './index.sass';
import Button from 'components/Base/Button';
import { events as data } from 'utils/mock';
import { inject, observer } from 'mobx-react'

@inject('locales')
@observer
class Events extends Component {
  render() {
    const { locales: { t }, className } = this.props
    return (
      <S.Container className={cx(styles.root, className)}>
        <h2 className={styles.h2}>{ t('landing.events.mobile.title') }</h2>
        <div className={styles.description} dangerouslySetInnerHTML={{ __html: t('landing.events.mobile.description') }} />
        <Button
          href={'tg://resolve?domain=mentalmarket'}
          className={styles.sub}
          color={'landingWhite'}
          kind={'landingPrimary'}
          target={'_blank'}
          external
        >{ t('landing.subscribe') }</Button>
        <div className={styles.postText}>{ t('landing.events.mobile.postText') }</div>
      </S.Container>
    )
  }
}

export default Events;
