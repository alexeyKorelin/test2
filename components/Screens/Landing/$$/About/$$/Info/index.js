import cx from 'classnames';
import styles from './index.sass';
import Button from 'components/Base/Button';
import { about as data } from 'utils/mock';
import { inject, observer } from 'mobx-react';

const Info = inject("locales")(
  observer( props => {
    const {t} = props.locales;

    return (
      <div className={cx(styles.root, props.className)}>
        <div className={styles.title}>{ t('landing.about.pc.title') }</div>
        <div className={styles.description} dangerouslySetInnerHTML={{ __html: t('landing.about.pc.description') }} />
        <Button
          href={'/main'}
          className={styles.createAd}
          color={'landingTransparent'}
          kind={'landingPrimary'}
          prefetch
        >{ t('landing.placeAd') }</Button>
      </div>
    )
  })
);

export default Info;
