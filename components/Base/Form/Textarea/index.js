import React, { Component } from 'react';
import cx from 'classnames';
import styles from './index.sass';

class Textarea extends Component {
  state = {
    error: false
  }

  onChange = (e) => {
    this.props.count && this.changeCount(e.target.value);
    this.props.onChange && this.props.onChange(e, e.target.value)
  }

  changeCount = (value) => {
    this.setState({
      count: value.length,
      error: value.length > this.props.count
    });
  }

  render() {
    const {label, value, count, description, className, required, placeholder, rows, kind} = this.props;

    return(
      <div 
        className={cx(
          styles.root, 
          className,
          {[styles[`root_${kind}`]]: kind},
          {[styles.root_error]: this.state.error}
        )}
      >
        <If condition={this.props.count && kind != 'user'}>
          <div className={styles.info}>
            {this.props.count &&
              <span className={styles.count}>{value ? value.length : '0'}/{count}</span>
            }
          </div>
        </If>
        <div className={styles.control}>
          {label &&
            <label
              htmlFor={value}
              className={cx(
                styles.title, 
                {[styles.title_required]: required}
              )}
            >{label}{required && ' *'}</label>
          }
          <textarea
            id={value}
            name={value}
            className={className ? className : styles.textarea}
            onChange={this.onChange}
            placeholder={placeholder ? placeholder : ''} 
            rows={rows}
            value={value && count ? value.slice(0, count) : value}
          />
        </div>
        {description &&
          <div className={styles.info}>
            <If condition={this.props.count && kind == 'user'}>
              <span className={cx(styles.description, this.props.description_center && styles.center)}>
                {(value && (value.length > this.props.count)) ? description : `${(value ? value.length : '0')}/${count}`}
              </span>
            </If>
            <If condition={description && kind != 'user'}>
              <span className={cx(styles.description, this.props.description_center && styles.center)}>{description}</span>
            </If>
          </div>
        }
      </div>
    )
  }
};

export default Textarea;