import React, {Component} from 'react';
import Collapse from 'components/Base/Filters/Collapse';
import SwitchField from './SwitchField';
import { inject, observer } from 'mobx-react';

@inject('locales')
@observer
class SwitchFields extends Component {

  render () {
    const {styles, fields, forcedOpen, locales: {t}} = this.props;
    
    return (
      <Collapse
        key={'offers'}
        className={styles.collapse}
        title={t('controls.offer')}
        forcedOpen={forcedOpen}
        listValues={fields}
        type={'switch'}
      >
        <div className={styles.list}>
          {fields.map((field, i) => <SwitchField key={i} field={field} styles={styles}/>)}
        </div>
      </Collapse>
    )
  }

}
SwitchFields.displayName = 'Base/SwitchFields'
export default SwitchFields;
