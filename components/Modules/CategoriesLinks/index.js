import {Link} from 'routes';
import Icon from 'components/Base/Icon';
import IconNew from 'components/Base/IconNew';
import cx from 'classnames';
import styles from './index.sass';
import _sortBy from 'lodash/sortBy';
import {observer} from 'mobx-react';

const CategoriesLinks = observer(({list, className, categorySlug,...props}) => {
  if (list && list.length > 0) {
    return (
      <div className={cx(styles.root, className)}>
        {_sortBy(list, 'name').map((item) => (
          <div key={item.slug} className={styles.col} style={{flex: '0 0 ' + 100 / list.length + '%', maxWidth: 100 / list.length + '%'}}>
            <Link route={`/${item.slug}`}>
              <a className={cx(styles.a, {[styles.a_active]: item.slug === categorySlug})}>
                <div className={styles.item}>
                  <div className={styles.iconContainer}>
                    {/*<Icon icon={'category-' + item.slug} />*/}
                    <IconNew i={item.slug} size={44}/>
                  </div>
                  <div className={styles.title}>{item.name}</div>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    );
  } else {
    return null
  }
});

CategoriesLinks.displayName = 'Modules/CategoriesLinks';

export default CategoriesLinks;
