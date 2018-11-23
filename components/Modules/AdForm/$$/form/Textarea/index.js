import React, { Component } from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {observer} from 'mobx-react';

@observer
class Textarea extends Component {
  state = {
    count: 0,
  }

  render() {
    const {field, description, count, className} = this.props;
    const rows = this.props.rows || 5;
    if (!field) return null;
    const {extra: {required}} = field;
    const errorMessage = !field.isValid && field.error && false;
    const label = this.props.label || field.label;

    return(
      <div
        className={cx(
          styles.root,
          className,
          {[styles.root_error]: field && field.error}
        )}
      >
        {label &&
          <div className={styles.info}>
            <span
              className={cx(
                styles.title,
                {[styles.title_required]: field.extra.required}
              )}
            >{label}{required && ' *'}</span>
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
          <textarea
            {...this.props}
            {...field.bind()}
            className={styles.textarea}
            rows={rows}
          />
        </div>
      </div>
    )
  }
};

export default Textarea;
