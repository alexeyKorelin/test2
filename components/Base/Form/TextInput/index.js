import React, { Component } from 'react';
import cx from 'classnames';
import styles from './index.sass';

class TextInput extends Component {
  state = {
    count: 0,
    error: false
  }

  componentDidMount() {
    this.setState({count: this.props.value ? this.props.value.slice(0, this.props.count).length : 0})
  }

  onChange = (e) => {
    this.props.count && this.changeCount(e.target.value)
    this.props.onChange && this.props.onChange(e, e.target.value)
  }

  changeCount = (value) => {
    this.setState({
      count: value.length,
      error: value.length > this.props.count
    });
  }

  render() {
    const {label, value, count, description, className, required, placeholder, name, error} = this.props;

    return(
      <div
        className={cx(
          styles.root,
          {[styles.root_error]: this.state.error || error}
        )}
      >
        {(label || description || count) &&
          <div className={styles.info}>
            {label &&
              <label
                htmlFor={name ? name : ''}
                className={cx(
                  styles.title,
                  {[styles.title_required]: required}
                )}
              >{label}{required && ' *'}</label>
            }
            {description &&
              <span className={styles.description}>{description}</span>
            }
            {error &&
              <span className={styles.error}>({error})</span>
            }
            {count &&
              <span className={styles.count}>{value ? value.length : 0}/{count}</span>
            }
          </div>
        }
        <div className={styles.control}>
          <input 
            name={name ? name : ''}
            placeholder={placeholder ? placeholder : ''} 
            className={className ? className : styles.input}
            onChange={this.onChange}
            value={value && count ? value.slice(0, count) : value}
          />
        </div>
      </div>
    )
  }
};

export default TextInput;
