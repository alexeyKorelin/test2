import React, {Component} from 'react';
import cx from 'classnames';
import Checkbox from 'components/Base/Checkbox';

class SwitchField extends Component {

  render () {
    const {field, styles, size} = this.props;
    return (
      <Checkbox
        key={field.slug}
        label={field.name}
        className={cx(styles.checkbox, styles.switch)}
        skin={'switch'}
        field={field}
        value={field.value}
        onChange={this.onChangeHandler}
        size={size}
      />
    )
  }

  onChangeHandler = (e) => {
    const {checked} = e.target;
    const {field} = this.props;
    field.applyChanges({value: checked});
  }
}

SwitchField.displayName = 'Base/Filters/SwitchField';
export default SwitchField;
