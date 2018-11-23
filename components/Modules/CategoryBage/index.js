import React, {Component} from 'react';
import {Router} from 'routes';
import cx from 'classnames';
import styles from './index.sass';

class CategoryBage extends Component {

  render () {
    const {card} = this.props;
    return (
      <div className={cx(styles.root, this.props.className)}>
        <div className={styles.image} style={{backgroundImage: `url(${card.avatar})`}}></div>
        <div className={styles.title}>{card.title}</div>
      </div>
    )
  }
}
CategoryBage.displayName = 'Modules/CategoryBage';

export default CategoryBage;
