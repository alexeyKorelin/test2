import React, { Component } from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {observer} from 'mobx-react';

@observer
class Select extends Component {
  state = {
    isOpen: false
  }

  render() {
    const {description, value} = this.props;
    if (!value) return null;
    const {required, values} = value.extra;
    const label = this.props.label || value.label;
    const errorMessage = !value.isValid && value.error && false;
    console.warn(value.error);

    return (
      <div className={cx(styles.root, {[styles.root_open]: this.state.isOpen}, {[styles.root_error]: value.error})}>
        {(label || description) &&
          <div className={styles.info}>
            {label &&
              <span
                className={cx(
                  styles.title,
                  {[styles.title_required]: required}
                )}
              >{label}{required && ' *'}</span>
            }
            {description &&
              <span className={styles.description}>{description}</span>
            }
            {errorMessage &&
              <span className={cx(styles.description, styles.description_error)}>{errorMessage}</span>
            }
          </div>
        }
        <div ref={this.setRef} className={styles.control}>
          <button className={cx(styles.selected, {[styles.selected_default]: (!value && label)})} onClick={this.toggle}>
            {value || label}
          </button>
          <div className={styles.dropdown}>
            <div className={styles.dropdownInner}>
              <ul className={styles.ul}>
                {values.map(v => {
                  return (
                    <li
                      className={cx(styles.li, {[styles.li_active]: value == v})}
                      onClick={() => this.onChange(v)}>
                      {v}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  toggle = () => {
    this.setState({isOpen: !this.state.isOpen});
  }

  componentDidMount () {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setRef = (node) => {
    this.ref = node;
  }

  onChange (value) {
    this.props.value.set(value);
    this.props.value.validate({showErrors: true});
    this.setState({isOpen: false});
  }

  handleClickOutside = (e) => {
    if (this.ref && !this.ref.contains(e.target) && this.state.isOpen) {
      const {value} = this.props;
      if (!value.isValid) {
        this.props.value.validate({showErrors: true});
      }
      this.setState({isOpen: false});
    }
  }
};

export default Select;
