import * as S1 from '../';
import cx from 'classnames';
import styles from './index.sass';
import Advs from 'components/Modules/Advs';
import { inject, observer } from 'mobx-react';

const Advantages = inject("locales")(
  observer( props => {
    const {locales: {t}, id, className} = props;

    return (
      <S1.Container className={cx(styles.root, className)} id={id}>
        <h2 className={styles.h2}>{t('landing.advantages.title')}</h2>
        <Advs t={t} />
        <div className={styles.description} dangerouslySetInnerHTML={{ __html: t('landing.advantages.description') }} />
      </S1.Container>
    )
  })
);


export default Advantages;
