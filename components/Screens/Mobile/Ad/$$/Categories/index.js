import cx from 'classnames';
import styles from './index.sass';
import { Link } from 'routes';
import Bage from 'components/Base/Bage';

const Categories = ({className, archived, ad}) => (
  <div className={cx(styles.root, className, {[styles.root_archived]: archived})}>
    <Link route={ad.category.url}>
      <a className={styles.category}>
        <Bage
          className={styles.categoryBage} 
          backgroundColor={!archived && ad.category.color}
        >
          {ad.category.name}
        </Bage>
      </a>
    </Link>
    <Link route={ad.subcategory.url}>
      <a className={styles.category}>
        <Bage 
          className={styles.subcategoryBage} 
          borderColor={!archived && ad.category.color}
        >
          {ad.subcategory.name}
        </Bage>
      </a>
    </Link> 
  </div>
);

Categories.displayName = 'Modules/Mobile/Ad/Categories';

export default Categories;