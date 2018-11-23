import React, {Component} from 'react';
import CheckboxesList from 'components/Base/CheckboxesList';
import Collapse from 'components/Base/Filters/Collapse';
import {observer} from 'mobx-react';

@observer
class ListField extends Component {

  render () {
    const {styles, field, forcedOpen} = this.props;
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
        key={field.slug}
        className={styles.collapse}
        title={field.label}
        forcedOpen={forcedOpen}
        listValues={listValues || []}
        type={'list'}
      >
        <CheckboxesList
          className={styles.list}
          defaultCount={3}
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
ListField.displayName = 'Base/ListField';
export default ListField;
