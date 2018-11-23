import React, { Component } from 'react';
import cx from 'classnames';
import styles from './index.sass';
import Checkbox from 'components/Base/Checkbox';
import {observer} from 'mobx-react';

@observer
class Currencies extends Component {
  state = {
    error: false
  }

  render() {
    const {form, size} = this.props;
    const field = form.$('coins');
    const currencies = field.extra.values;

    return(
      <div
        className={cx(
          styles.root,
          this.props.className,
          {[styles.root_error]: this.state.error}
        )}
      >
        {(this.props.title || this.props.description || this.props.count) &&
          <div className={styles.info}>
            {this.props.title &&
              <span
                className={cx(
                  styles.title,
                  {[styles.title_required]: this.props.required}
                )}
              >{this.props.title}{this.props.required && ' *'}</span>
            }
            {this.props.description &&
              <span className={styles.description}>{this.props.description}</span>
            }
            {this.props.count &&
              <span className={styles.count}>{this.state.count}/{this.props.count}</span>
            }
          </div>
        }
        <div className={styles.control}>
          {currencies.map((item, i) => (
            <Checkbox
              key={i}
              checked={field.value.includes(item)}
              label={item.toLocaleUpperCase()}
              value={item}
              skin={'currency'}
              onChange={this.onCurrencyCheck}
              size={size}
            />
          ))}
        </div>
      </div>
    )
  }

  onCurrencyCheck = (e) => {
    const {value} = e.target;
    const {form} = this.props;
    const field = form.$('coins');
    const coinField = form.$('coin');
    if (field.value.includes(value)) {
      if (value == coinField.value) return;
      const index = field.value.indexOf(value);
      const nextValue = [
        ...field.value.slice(0, index),
        ...field.value.slice(index + 1),
      ];
      field.set(nextValue);
    } else {
      field.set(field.value.concat(value));
    }
  }
};

export default Currencies;
