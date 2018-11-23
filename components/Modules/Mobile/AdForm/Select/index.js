import React, { Component } from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {observer} from 'mobx-react';

@observer
class Select extends Component {

  render() {
    const {description, field, placeholder} = this.props;
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
      <div className={cx(styles.root, {[styles.root_error]: field.error})}>
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
          <select value={field.value} className={cx(styles.select, {[styles.placeholder]: !field.value})} onChange={(e) => this.onChange(e)}>
            {placeholder &&
              <option value='' selected disabled>{field.label}</option>
            }
            {values.map((v, i) => <option value={v.value} key={i}>{v.title}</option>)}
          </select>
        </div>
      </div>
    )
  }

  setRef = (node) => {
    this.ref = node;
  }

  onChange = (e) => {
    this.props.field.set(e.target.value);
    this.props.field.validate({showErrors: true});
  }
};

export default Select;
