import React, {Component} from 'react';
import Button from 'components/Base/Button';
import styles from './index.sass';
import {Container} from 'components/Base/Grid';

class NotFound extends Component {
  render () {
    return (
      <div className={styles.root}>
        <div className={styles.box}>
          <div className={styles.four}>404</div>
          <div className={styles.description}>This page could not be found.</div>
          <Button href={'/main'} className={styles.link} color={'purple'} block prefetch>Вернуться на главную</Button>
        </div>
      </div>
    )
  }
}
export default NotFound
