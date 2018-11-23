import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import ScrollArea from 'components/Base/ScrollArea';
import AdBage from 'components/Modules/AdBage';
import {Row} from 'components/Base/Grid';

const SameAdverts = inject('locales')(observer(({className, list, auth, locales: {t}}) => (
  <div className={cx(styles.root, className)}>
    <h2 className={styles.title}>{t('ad.same')}</h2>
    <ScrollArea
      className={styles.scrollArea}
      contentClassName={styles.adsCarousel}
      scrollBarContainerClassName={styles.scrollbarContainer}
      scrollBarClassName={styles.scrollbar}
      swapWheelAxes
      smoothScrolling
      vertical={false}
      horizontal={true}
      scrollBarSize={1150}
      >
      <Row className={styles.row}>
        { list.map((listItem, index) => (
          <div key={index} className={styles.col}>
            <AdBage
              className={styles.adBage}
              key={index}
              ad={listItem}
              size={164}
              showCategory={false}
              auth={auth}
              kind='low'
            />
          </div>
        ))}
      </Row>
    </ScrollArea>
  </div>
)))

SameAdverts.displayName = 'Modules/Ad/SameAdverts';

export default SameAdverts;
