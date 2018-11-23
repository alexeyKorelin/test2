import cx from 'classnames';
import {Link} from 'routes';
import { Row, Col } from 'components/Base/Grid';
import Button from 'components/Base/Button';
import styles from './index.sass';
import Settings from 'config';
import _sortBy from 'lodash/sortBy';
import Bage from 'components/Base/Bage';

const CategoryIsEmpty = ({className, size, isCategory, description, categories, slug}) => {
  const rootSize = size ? size : 'default';
  const filteredCategories = _sortBy(categories.filter(category => category.slug != slug), 'name');

  return (
    <div className={cx(styles.root, className, {[styles[`root_${rootSize}`]]: rootSize})}>
      <If condition={categories}>
        {filteredCategories.map(category =>
          <div key={category.slug}>
            <style jsx global>{`
                .a_${category.slug} .${styles.bage} {
                  background: ${isCategory ? category.color : '#fff'};
                  color: ${isCategory ? '#fff' : category.color};
                  border-color: ${category.color};
                }
                .a_${category.slug}:hover .${styles.bage} {
                  background: ${isCategory ? '#fff' : category.color};
                  color: ${isCategory ? category.color : '#fff'};
                }
            `}</style>
          </div>
        )}
      </If>
      <div className={styles.description}>{description}</div>
      <If condition={categories}>
        <div className={styles.categories}>
          {filteredCategories.map(category => (
            <Link key={category.slug} route={category.url}>
              <a className={cx(styles.a, `a_${category.slug}`)}>
                <Bage className={cx(styles.bage)}>{category.name}</Bage>
              </a>
            </Link>
          ))}
        </div>
      </If>
      <img 
        className={styles.catbox} 
        src={`${Settings.assetHost}/assets/catbox.png`} 
        title={description} 
      />
    </div>
  )
};

CategoryIsEmpty.displayName = 'Modules/CategoryIsEmpty';

export default CategoryIsEmpty;
