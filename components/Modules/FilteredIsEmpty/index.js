import cx from 'classnames';
import { Row, Col } from 'components/Base/Grid';
import Button from 'components/Base/Button';
import styles from './index.sass';
import Settings from 'config';
import {inject, observer} from 'mobx-react';

const FilteredIsEmpty = inject('locales')(observer(({className, fields, size, locales: {t}}) => {
  const rootSize = size ? size : 'default';

  return (
    <div className={cx(styles.root, className, {[styles[`root_${rootSize}`]]: rootSize})}>
      <div className={styles.description}>{t('filters.empty')}</div>
      <Button 
        onClick={fields.resetFilter} 
        className={styles.clear}
        kind={'circled'}
        color={'reverseGradient'}  
      >{t('filters.clearExt')}</Button><br />
      <img 
        className={styles.catbox} 
        src={`${Settings.assetHost}/assets/catbox.png`} 
        title={t('filters.empty')} 
      />
    </div>
  )
}));

FilteredIsEmpty.displayName = 'Modules/FilteredIsEmpty';

export default FilteredIsEmpty;
