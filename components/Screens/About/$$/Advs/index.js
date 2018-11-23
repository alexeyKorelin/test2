import React, { Component } from 'react';
import cx from 'classnames';
import styles from './index.sass';
import { Row, Col } from 'components/Base/Grid';
import Button from 'components/Base/Button';
import Advantages from 'components/Modules/Advs';
import { advantages as data } from 'utils/mock';
import { inject, observer } from 'mobx-react'

@inject('locales')
@observer
class Advs extends Component {
  render() {
    const { locales: { t }} = this.props
    return (
      <div className={cx(styles.root, this.props.className)}>
        <h2 className={styles.h2}>{ t('landing.advantages.title') }</h2>
        <Advantages className={styles.advs} />
        <div className={styles.postText} dangerouslySetInnerHTML={{ __html: t('landing.advantages.description') }} />
        <div className={styles.controls}>
          <Button href={'/about'} className={styles.more} color={'transparent'}>{ t('about.details') }</Button>
        </div>
      </div>
    )
  }
}

export default Advs;
