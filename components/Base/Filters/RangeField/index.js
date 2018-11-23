import React, {Component} from 'react';
import RangeSlider from 'components/Base/RangeSlider';
import Collapse from 'components/Base/Filters/Collapse';
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
    const {field, styles, forcedOpen} = this.props;
    const fallbackValue = {min: field.min, max: field.max};
    if (!field.min && !field.max) return <div></div>;
    
    return (
      <Collapse
        key={field.slug}
        className={styles.collapse}
        title={field.label + ` (${field.measure})`}
        forcedOpen={forcedOpen}
        numberValues={field.value || fallbackValue}
        type={'range'}
      >
        <RangeSlider
          className={styles.rangeSlider}
          title={field.label}
          min={field.min}
          max={field.max}
          value={field.value || fallbackValue}
          onChange={this.onChangeHandler}
        />
      </Collapse>
    )
  }
}
RangeField.displayName = 'Base/RangeField';
export default RangeField;
