import React, {Component} from 'react';
import CheckboxesList from 'components/Base/Mobile/CheckboxesList';
import Collapse from 'components/Base/Mobile/Filters/Collapse';
import {observer} from 'mobx-react';

@observer
class ListField extends Component {

  render () {
    const {styles, field, onClose} = this.props;
    const values = field.values.map(v => {
      return {
        title: v[v.key],
        value: v.key
      }
    });
    const listValues = field.value ? 
      field.values
        .filter(value => field.value.includes(value.key))
        .map(value => value[value.key]) : 
      null;

    return (
      <Collapse
        title={field.label}
        className={styles.collapse}
        onClose={onClose}
        listValues={listValues || []}
        type={'list'}
        external
      >
        <CheckboxesList
          className={styles.list}
          list={values}
          value={field.value || []}
          onChange={this.onChangeHandler}
        />
      </Collapse>
    )
  }

  onChangeHandler = (values) => {
    const {field} = this.props;
    field.applyChanges({value: values});
  }
}
ListField.displayName = 'Base/Mobile/Filters/ListField';
export default ListField;