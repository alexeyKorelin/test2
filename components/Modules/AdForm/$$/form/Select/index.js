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
    const {description, field} = this.props;
    if (!field) return null;
    const {required} = field.extra;
    const values = field.extra.values.map(v => {
      return {
        title: v[v.key],
        value: v.key
      }
    });
    const label = this.props.label || field.label;
    const errorMessage = !field.isValid && field.error && false;
    console.warn(field.error);

    return (
      <div className={cx(styles.root, {[styles.root_open]: this.state.isOpen}, {[styles.root_error]: field.error})}>
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
          <button className={cx(styles.selected, {[styles.selected_default]: (!field.value && label)})} onClick={this.toggle}>
            {field.value ? values.find(v => v.value === field.value).title : label}
          </button>
          <div className={styles.dropdown}>
            <div className={styles.dropdownInner}>
              <ul className={styles.ul}>
                {values.map((v, i) => {
                  return (
                    <li
                      key={i}
                      className={cx(styles.li, {[styles.li_active]: field.value == v.value})}
                      onClick={() => this.onChange(v.value)}>
                      {v.title}
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
    const {field} = this.props;
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
    this.props.field.set(value);
    this.props.field.validate({showErrors: true});
    this.setState({isOpen: false});
  }

  handleClickOutside = (e) => {
    if (this.ref && !this.ref.contains(e.target) && this.state.isOpen) {
      const {field} = this.props;
      if (!field.isValid) {
        this.props.field.validate({showErrors: true});
      }
      this.setState({isOpen: false});
    }
  }
};

export default Select;
