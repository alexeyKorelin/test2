import React, {Component} from 'react';
import {throttle} from 'lodash';
import cx from 'classnames';
import styles from './index.sass';
import Fixed from 'components/Base/Fixed';

class FixedTop extends Component {
  _rootInner = React.createRef ? React.createRef() : null;

  componentDidMount() { 
    this.onHeightChange();
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  }

  render() {
    const {className, children} = this.props;
    
    return (
      <Fixed
        className={cx(styles.root, className)}
        stickiedClassName={styles.stickied}
        fixedStickiedClassName={styles.fixedStickied}
      >
        <div ref={this._rootInner} className={styles.root__inner}>{children}</div>
      </Fixed>
    );
  };

  onScroll = throttle(() => {
    this.onHeightChange();
  }, 10)

  onResize = throttle(() => {
    this.onHeightChange();
  }, 500)  

  onHeightChange = () => {
    const rootInnerNode = (this._rootInner && this._rootInner.current) || null;
    if (!rootInnerNode) return;

    if (this.props.onHeightChange) {
      this.props.onHeightChange(rootInnerNode); 
    } else {
      return null;
    } 
  }
};

FixedTop.displayName = 'Modules/FixedTop';

export default FixedTop;
