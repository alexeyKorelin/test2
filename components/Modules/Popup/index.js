import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {uniqueId} from 'lodash';
import IconNew from 'components/Base/IconNew';
import Toggle from 'components/Base/Toggle';
import {Wrapper} from 'utils/utils';

class Popup extends Component {
  _bodyClass = uniqueId('overflow-hidden_')

  render() {
    const {children, isOpen, className, onClose, kind, size, color} = this.props
    
    return (
      <Toggle>
        <If condition={isOpen}>
          <div 
            className={cx(
              styles.root, 
              styles[`root_${kind || 'default'}`],
              styles[`root_${color || 'white'}`],
              {[styles[`root_${size}`]]: size}
            )}
          >
            <div className={styles.overlay} onClick={this.onClose} />
            <div className={styles.table}>
              <div className={styles.cell}>
                <div className={cx(styles.popup, className)}>
                  <If condition={onClose}>
                    <button className={styles.close} onClick={this.onClose}>
                      <IconNew className={styles.close__icon} i={'close'} />
                    </button>
                  </If>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </If>
      </Toggle>
    );
  }

  componentDidMount() {
    const { isOpen } = this.props

    isOpen && this.bodyClassToggle(true)
    window.addEventListener('keydown', this.handleEscKeydown, false)
  }

  componentWillUnmount() {
    this.bodyClassToggle(false)
    window.removeEventListener('keydown', this.handleEscKeydown, false)
  }

  componentWillReceiveProps(nextProps) {
    this.bodyClassToggle(nextProps.isOpen)
  }

  onClose = () => {    
    const { onClose, isOpen } = this.props

    if (onClose && isOpen) {
      onClose()
      this.bodyClassToggle(false)
    }
  }

  bodyClassToggle = (isOpen) => {
    isOpen ? document.body.classList.add(this._bodyClass) : document.body.classList.remove(this._bodyClass)
  }

  handleEscKeydown = (e) => {  
    (e.keyCode === 27) && this.onClose()
  }
}

export default Popup;
