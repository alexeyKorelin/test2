import React, { Component } from 'react';
import cx from 'classnames';
import Geosuggest from 'react-geosuggest'
import styles from './index.sass';
import {observer} from 'mobx-react';
import {obtainGoogleSuggest} from 'utils/geo'

@observer
class GeoInput extends Component {

  constructor (props) {
    super(props);
    this.state = {
      query: '',
      initialValue: props.field.value.geo_label
    }
  }

  onSelect = (value) => {
    const {field} = this.props;
    field.reset();
    if (value) {
      const options = obtainGoogleSuggest(value, field.extra.type);
      field.set(options);
      field.validate({showErrors: true});
    }
  }

  onChange = (str) => {
    const {field} = this.props;
    this.setState({query: str})
  }

  render() {
    const {field, description, className, placeholder} = this.props;
    const {extra: {required }} = field;
    const {initialValue} = this.state;
    const label = this.props.label || field.label;

    return(
      <div
        className={cx(
          styles.root,
          className,
          {[styles.root_error]: field.error}
        )}
      >
        {
          <div className={styles.info}>
            {label &&
              <span
                className={cx(
                  styles.title,
                  {[styles.title_required]: required}
                )}
              >{label}{required && ' *'}</span>
            }
            {(!field.isValid && field.error) &&
              <span className={cx(styles.description, styles.description_error)}>{!field.isValid && field.error}</span>
            }
          </div>
        }
        <div className={styles.control}>
          <Geosuggest
            className={styles.suggest}
            initialValue={initialValue}
            ref={el => this._geoSuggest = el}
            onChange={this.onChange}
            onSuggestSelect={this.onSelect}
            placeholder={placeholder}
            inputClassName={styles.input}
            suggestsClassName={styles.suggests}
            suggestsHiddenClassName={styles.suggests_hidden}
            suggestItemClassName={styles.suggestItem}
            suggestItemActiveClassName={styles.suggestItem_active}
          />
        </div>
      </div>
    )
  }
};

export default GeoInput;
