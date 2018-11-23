import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import IconNew from 'components/Base/IconNew';

const Points = inject('locales')(observer(({className, ad, archived, locales: {t}}) => (
  <div className={cx(styles.root, className)}>
    {ad.date &&
      <div className={styles.point}> 
        <IconNew i={'calendar'} className={cx(styles.icon, styles.icon_date)} />
        <span className={styles.value}>{ad.date}</span>
      </div>
    }
    <div className={styles.point}> 
      <IconNew i={'geo'} className={cx(styles.icon, styles.icon_place)} />
      <span className={styles.value}>{ad.place ? ad.place : t('ad.emptyPlace')}</span>
    </div>
    {ad.fields.filter(field => field.type === 'checkbox').map((field, i) => (
      <div key={i} className={styles.point}> 
        <IconNew i={'mark'} className={cx(styles.icon, styles.icon_mark)} />
        <span className={styles.value}>{field.name}</span>
      </div>
    ))}
  </div>
)));

Points.displayName = 'Screens/Mobile/Ad/Points';

export default Points;