import React, { Component } from 'react';
import cx from 'classnames';
import styles from '../TextInput/index.sass';
import {observer} from 'mobx-react';

@observer
class NumberInput extends Component {

  render() {
    const {field, description, className, onChange, disabled} = this.props;
    if (!field) return null;
    const {extra: {required, min, max, measure}} = field;
    const errorMessage = !field.isValid && field.error && false;
    const label = this.props.label || field.label;

    return(
      <div
        className={cx(
          styles.root,
          className,
          {[styles.root_error]: !field.isValid}
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
            {max && max.toString() && (min == 0 || min )  && min.toString() &&
              <span className={styles.count}>{min}-{max} ({measure})</span>
            }
            {errorMessage &&
              <span className={cx(styles.description, styles.description_error)}>{errorMessage}</span>
            }
          </div>
        }
        {onChange ? (
          <div className={styles.control}>
            <input
              min="0"
              max={max}
              type="number"
              step={field.extra.type == 'number' ? '1' : '0.01'}
              className={styles.input}
              name={field.name}
              value={field.value}
              onChange={(e) => onChange(e)}
              disabled={disabled}
            />
          </div>
        ) : (
          <input {...field.bind(this)}
            min="0"
            max={max}
            type="number"
            step={field.extra.type == 'number' ? '1' : '0.01'}
            className={styles.input}
          />
        )}
      </div>
    )
  }
};

export default NumberInput;
