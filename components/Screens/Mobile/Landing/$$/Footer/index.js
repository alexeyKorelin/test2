import { Component } from 'react'
import * as S from '../';
import cx from 'classnames';
import styles from './index.sass';
import IconNew from 'components/Base/IconNew';
import { inject, observer } from 'mobx-react'

@inject('locales')
@observer
class Footer extends Component {
  render() {
    const { locales: { t }} = this.props
    return (
      <S.Container className={styles.root}>
        <div className={styles.description}>{ t('landing.footer.description') }</div>
        <div className={styles.links}>
          <a className={styles.link} href={'/main'} target={'_blank'}>
            <IconNew className={styles.icon} i={'instagram'} size={14} style={{lineHeight: '14px'}} />
          </a>
          <a className={styles.link} href={'/main'} target={'_blank'}>
            <IconNew className={styles.icon} i={'facebook'} size={14} style={{lineHeight: '14px'}} />
          </a>
          <a className={styles.link} href={'/main'} target={'_blank'}>
            <IconNew className={styles.icon} i={'twitter'} size={12} style={{lineHeight: '12px'}} />
          </a>
        </div>
      </S.Container>
    )
  }
}

export default Footer;
