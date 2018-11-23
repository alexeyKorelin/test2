import {Link} from 'routes';
import cx from 'classnames';
import styles from './index.sass';
import _sortBy from 'lodash/sortBy';
import Bage from 'components/Base/Bage';

const ChildrenCategoriesLinks = ({className, categories, slug, nowrap}) => {
  let sortedCategories = _sortBy(categories, 'name');
  if (nowrap && sortedCategories.length > 1 && !categories.children) {
    sortedCategories.unshift(
      ...sortedCategories.splice(
        sortedCategories.findIndex(category => category.slug == slug),
        1
      )
    );
  }

  return (
    <div className={cx(styles.root, className, nowrap ? styles.root_nowrap : styles.root_wrap)}>
      <style jsx global>{`
        .${styles.bage} {
          color: ${categories[0].color};
          border-color: ${categories[0].color};
        }
        .${styles.a}:hover .${styles.bage},
        .${styles.a_active} .${styles.bage} {
          background: ${categories[0].color};
        }
      `}</style>
      <div className={styles.root__inner}>
        <div className={styles.categories}>
          {sortedCategories.map(category => (
            <Link key={category.slug} route={category.url}>
              <a className={cx(styles.a, `a`, {[styles.a_active]: slug == category.slug})}>
                <Bage 
                  className={cx(styles.bage)}
                >{category.name}</Bage>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

ChildrenCategoriesLinks.displayName = 'Modules/ChildrenCategoriesLinks';

export default ChildrenCategoriesLinks;
