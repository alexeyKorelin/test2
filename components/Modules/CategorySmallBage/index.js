import React from 'react';
import {Link} from 'routes';
import styles from './index.sass';

const CategorySmallBage = ({title, image, slug, ...props}) => (
  <Link route={`/${slug}`}>
    <a className={styles.root}>
      <div className={styles.image} style={{backgroundImage: `url(${image})`}}></div>
      <div className={styles.title}>{title}</div>
    </a>
  </Link>
);

CategorySmallBage.displayName = 'Modules/CategorySmallBage';

export default CategorySmallBage;
