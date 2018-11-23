import React, {Component} from 'react';
import cx from 'classnames';
import Checkbox from 'components/Base/Checkbox';
import styles from './index.sass';
import { inject, observer } from 'mobx-react';

@inject('locales')
@observer
class CheckboxesList extends Component {
  state = {
    showAll: false
  }

  render() {
    const {defaultCount, list, locales: {t}} = this.props;
    const {value} = this.props;
    const {showAll} = this.state
    let hiddenCheckboxes = [];
    let visibleCheckboxes = [];

    if (defaultCount && defaultCount < list.length) {
      visibleCheckboxes = list.slice(0, defaultCount);
      hiddenCheckboxes = list.slice(defaultCount);
    } else visibleCheckboxes = list;

    return (
      <div className={cx(styles.root, this.props.className, showAll ? styles.root_open : '')}>
        <div>
          {visibleCheckboxes.map((item, i) => (
            <Checkbox
              key={i}
              label={item.title}
              className={styles.checkbox}
              value={item.value}
              checked={value.includes(item.value)}
              onChange={this.onChange}
              skin={this.props.skin}
            />
          ))}
        </div>
        {hiddenCheckboxes.length > 0 && (
          <div className={cx(styles.more, {[styles.more_open]: showAll})}>
            <div className={styles.more__hidden}>
              {hiddenCheckboxes.map((item, i) => (
                <Checkbox
                  key={i}
                  label={item.title}
                  className={styles.checkbox}
                  value={item.value}
                  checked={value.includes(item.value)}
                  onChange={this.onChange}
                  skin={this.props.skin}
                />
              ))}
            </div>
            <button onClick={this.toggle} className={styles.more__button}>
              {showAll ? t('controls.hide') : t('controls.show')}
            </button>
          </div>
        )}
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
