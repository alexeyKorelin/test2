import { Component } from 'react'
import * as S1 from '../';
import cx from 'classnames';
import styles from './index.sass';
import { about as data } from 'utils/mock';
import { inject, observer } from 'mobx-react'

@inject('locales')
@observer
class StartText extends Component {
  render() {
    const { locales: { t }} = this.props
    return (
      <div className={cx(styles.root, this.props.className)}>{ t('about.startText.pc.description') }</div>
    )
  }
}

export default StartText;
