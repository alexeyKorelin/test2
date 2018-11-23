import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import Toggle from 'components/Base/Toggle';

class Dropdown extends Component {
  _root = React.createRef();
  
  state = {
    isOpen: false
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  render () {
    const {isOpen} = this.state;
    const {className, children, label, kind, position} = this.props;

    return (
      <div 
        ref={this._root} 
        className={cx(
          styles.root, 
          className, 
          {[styles.root_open]: isOpen}, 
          styles[`root_${kind || 'default'}`], 
          styles[`root_${position || 'left'}`]
        )}
      >
        <button onClick={this.open} className={styles.toggler}>{label}</button>
        <Toggle>
          <If condition={isOpen}>
            <div className={styles.dropdown}>
              <button onClick={this.close} className={styles.label}>{label}</button>
              <div className={styles.content}>{children}</div>
            </div>
          </If>
        </Toggle>
      </div>
    )
  }

  open = () => this.setState({isOpen: true});

  close = () => this.setState({isOpen: false});

  handleClickOutside = (e) => {
    const {isOpen} = this.state;
    const root = this._root.current;

    (!root.contains(e.target) && isOpen) && this.close();
  }
}

export default Dropdown;
