import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';

class Avatar extends Component {
  stub = '';
  size = 60;

  render () {
    const { owner, className, size, centered, isShop } = this.props;
    let appliedSize = size ? size : this.size;

    return (
      <div
        className={cx(
          styles.root,
          className,
          {[styles.root_avatar]: owner.avatar},
          {[styles.root_name]: !owner.avatar && owner.shortname},
          {[styles.root_stub]: !owner.avatar && !owner.shortname},
          {[styles.root_shop]: isShop && !owner.avatar && owner.shortname},
          {[styles.centered]: centered}
        )}
        style={
          Object.assign(
            owner.avatar ? { backgroundImage: `url(${owner.avatar})` } : (owner.shortname ? {} : { backgroundImage: `url(${this.stub})` }) ,
            {
              width: appliedSize,
              height: appliedSize,
              fontSize: Math.round(appliedSize * 0.42) + 'px'
            }
          )
        }
        title={owner.fullname}
      >{(!owner.avatar && owner.shortname) &&
        <span className={styles.shortname}>{owner.shortname}</span>
      }</div>
    )
  }
};

Avatar.displayName = 'Modules/Avatar';

export default Avatar;
