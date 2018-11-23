import React, {Component} from 'react';
import cx from 'classnames';
import {chunk} from 'lodash';
import Checkbox from 'components/Base/Checkbox';
import styles from './index.sass';

class CheckboxesList extends Component {
  render() {
    const {list, value} = this.props;

    return (
      <div className={cx(styles.root, this.props.className)}>
        {chunk(list, Math.ceil(list.length/2)).map((list, i) => (
          <div key={i} className={styles.column}>
            {list.map((item, j) => (
              <div key={j} className={styles.checkbox}>
                <Checkbox
                  label={item.title}  
                  value={item.value}
                  checked={value.includes(item.value)}
                  onChange={this.onChange}
                  skin={this.props.skin}
                  size={'sm'}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }

  toggle = () => {
    this.setState({showAll: !this.state.showAll})
  }

  onChange = (e) => {
    const newValue = e.target.value;
    const {value} = this.props;
    let newCheckedValue;
    if (value.includes(newValue)) {
      const index = value.indexOf(newValue);
      newCheckedValue = [
        ...value.slice(0, index),
        ...value.slice(index + 1)
      ];
    } else {
      newCheckedValue = [...value, newValue];
    }
    this.props.onChange(newCheckedValue);
  }
}

CheckboxesList.displayName = 'Modules/CheckboxesList';

export default CheckboxesList;
