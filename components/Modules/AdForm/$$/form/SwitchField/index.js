import React, {Component} from 'react';
import cx from 'classnames';
import Checkbox from 'components/Base/Checkbox';
import styles from './index.sass';
import {observer} from 'mobx-react';

@observer
class SwitchField extends Component {

  render () {
    const {field, className} = this.props;
    return (
      <Checkbox
        key={field.name}
        field={field}
        label={field.label}
        skin={'switch'}
        className={cx(styles.checkbox, className)}
        labelClassName={styles.checkboxLabel}
        value={field.value || false}
        onChange={this.onChangeHandler}
      />
    )
  }

  onChangeHandler = (e) => {
    const {checked} = e.target;
    const {field} = this.props;
    field.onChange(checked);
  }
}

SwitchField.displayName = 'Modules/AdForm/$$/form/SwitchField';
export default SwitchField;