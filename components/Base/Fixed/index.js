
import React, { Component } from 'react';
import cx from 'classnames';
import {throttle} from 'lodash';
import styles from './index.sass';

class Fixed extends Component {
  _root = React.createRef ? React.createRef() : null;
  _stickied = React.createRef ? React.createRef() : null;
  
  state = {
    fixed: false
  }

  componentDidMount() {
    const {autoShift} = this.props;

    (autoShift !== false) && this.shiftInit();
    this.updateFixed();
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  render() {
    const {fixed} = this.state;
    const {className, stickiedClassName, fixedStickiedClassName, children} = this.props;

    return (
      <div ref={this._root} className={cx(styles.root, className)}>
        <div 
          ref={this._stickied}
          className={cx(
            styles.stickied, 
            className, 
            stickiedClassName,
            {[fixedStickiedClassName]: fixed},
            {[styles.stickied_fixed]: fixed}
          )}
        >{children}</div>
      </div>
    )
  }

  shiftInit = () => {
    const rootNode = (this._root && this._root.current) || null;
    const stickiedNode = (this._stickied && this._stickied.current) || null;
    if (!stickiedNode || !rootNode) return;   
    
    rootNode.style.height = stickiedNode.offsetHeight + 'px';
  }

  onScroll = throttle(() => {
    this.updateFixed();
  }, 10)

  updateFixed = () => {
    const rootNode = (this._root && this._root.current) || null;
    const {fixed} = this.state;

    (rootNode.getBoundingClientRect().top <= 0) ? (!fixed && this.setState({fixed: true})) : this.setState({fixed: false});    
  }
}

export default Fixed;
