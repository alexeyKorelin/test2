import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import {Row, Col} from 'components/Base/Grid';
import ScrollArea from 'components/Base/ScrollArea';
import AdBage from 'components/Modules/Mobile/AdBage';
import Avatar from 'components/Modules/Avatar';

const Same = inject('locales')(observer(({className, auth, adverts, locales: {t}}) => (
  <div className={cx(styles.root, className)}>
    <h2 className={styles.title}>{t('ad.same')}</h2>
    <ScrollArea
      className={styles.scrollArea}
      contentClassName={styles.adsList}
      scrollBarContainerClassName={styles.scrollbarContainer}
      scrollBarClassName={styles.scrollbar}
      smoothScrolling
      vertical={false}
      horizontal={true}
    >
      <Row className={styles.row}>
        {adverts.map((listItem, index) => (
          <div key={index} className={styles.col}>
            <AdBage
              className={styles.adBage}
              key={index}
              ad={listItem}
              showCategory={false}
              auth={auth}
              kind={'same'}
            />
          </div>
        ))}
      </Row>            
    </ScrollArea>
  </div>
)));

Same.displayName = 'Modules/Mobile/Ad/Same';

export default Same;