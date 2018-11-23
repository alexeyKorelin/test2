import React, {Component} from 'react';
import Collapse from 'components/Base/Mobile/Filters/Collapse';
import SwitchField from 'components/Base/Filters/SwitchFields/SwitchField';
import { inject, observer } from 'mobx-react';

@inject('locales')
@observer
class SwitchFields extends Component {

  render () {
    const {styles, fields, onClose, locales: {t}} = this.props;
    
    return (
      <Collapse
        title={t('controls.offer')}
        onClose={onClose}
        className={styles.collapse}
        listValues={fields}
        type={'switch'}
      >
        <div className={styles.list}>
          {fields.map((field, i) => <SwitchField key={i} field={field} styles={styles} />)}
        </div>
      </Collapse>
    )
  }

}
SwitchFields.displayName = 'Base/Mobile/SwitchFields'
export default SwitchFields;