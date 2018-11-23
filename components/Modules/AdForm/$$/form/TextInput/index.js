import React, { Component } from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {observer} from 'mobx-react';

@observer
class TextInput extends Component {

  render() {
    const {field, count, description, className} = this.props;
    if (!field) return null;
    const {extra: {required}} = field;
    const errorMessage = !field.isValid && field.error && false;
    const label = this.props.label || field.label;

    return(
      <div
        className={cx(
          styles.root,
          className,
          {[styles.root_error]: field.error}
        )}
      >
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
            {count &&
              <span className={styles.count}>{field.value.length}/{count}</span>
            }
          </div>
        }
        <div className={styles.control}>
          <input {...this.props} {...field.bind(this)} className={styles.input} />
        </div>
      </div>
    )
  }
};

export default TextInput;
