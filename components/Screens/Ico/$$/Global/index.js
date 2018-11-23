import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import {Container, Row, Col} from 'components/Base/Grid';

const Global = inject('locales')(observer(({className, locales: {t}}) => 
  <Container className={cx(styles.root, className)}>
    <div className={styles.toggler}>
      <span className={styles.toggler__inner1} />
      <span className={styles.toggler__inner2} dangerouslySetInnerHTML={{__html: t(`ico.global.toggler`)}} />
      <div className={styles.more}>
        <div className={styles.more__inner1}>
          <div className={styles.more__inner2}>
            <div className={styles.content}>
              <div className={styles.title} dangerouslySetInnerHTML={{__html: t(`ico.global.toggler`)}} />
              <div className={styles.description} dangerouslySetInnerHTML={{__html: t(`ico.global.description`)}} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Container>
))

export default Global;
