import React, {Component} from 'react';
import RangeSlider from 'components/Base/RangeSlider';
import Collapse from 'components/Base/Mobile/Filters/Collapse';
import {observer} from 'mobx-react'

@observer
class RangeField extends Component {

  onChangeHandler = (values) => {
    const {field} = this.props;
    field.applyChanges({value: {
      min: values[0],
      max: values[1]
    }})
  }

  render () {
    const {field, styles, onClose} = this.props;
    const fallbackValue = {min: field.min, max: field.max};
    
    if (!field.min && !field.max) return <div></div>;

    return (
      <Collapse
        title={field.label + ` (${field.measure})`}
        onClose={onClose}
        className={styles.collapse}
        numberValues={field.value || fallbackValue}
        type={'range'}
      >
        <RangeSlider
          className={styles.rangeSlider_open}
          title={field.label}
          min={field.min}
          max={field.max}
          value={field.value || fallbackValue}
          onChange={this.onChangeHandler}
          size={'sm'}
        />
      </Collapse>
    )
  }
}
RangeField.displayName = 'Base/Mobile/Filters/RangeField';
export default RangeField;