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
      initialValue: this.props.shop ? this.props.shop.geo_label : ''
    }
  }

  onSelect = (value) => {
    const {shop, type} = this.props;
    if (value) {
      const options = obtainGoogleSuggest(value, type);
      shop.applyChanges({address: options});
    }
  }

  onChange = (str) => {
    this.setState({query: str})
  }

  render() {
    const {className, label, placeholder, required, error} = this.props;
    const {initialValue} = this.state;

    return(
      <div
        className={cx(
          styles.root,
          className,
          {[styles.root_error]: error}
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
            {(error) &&
              <span className={cx(styles.description, styles.description_error)}>({error})</span>
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
            placeholder={placeholder ? placeholder : ''}
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