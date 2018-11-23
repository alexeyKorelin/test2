import React, {Component} from 'react';
import cx from 'classnames';
import { inject, observer } from 'mobx-react';
import RadioButton from 'components/Base/RadioButton';
import styles from './index.sass';

@inject('locales')
@observer
class RadioButtonsList extends Component {
  state = {
    isOpen: false,
    value: this.props.defaultValue
  }

  render() {
    let radioButtons = this.props.list;
    const {defaultCount, locales: {t}} = this.props.defaultCount;
    let hiddenRadioButtons = [];
    let visibleRadioButtons = [];

    if (defaultCount && defaultCount<radioButtons.length) {
      hiddenRadioButtons = radioButtons.slice(defaultCount, radioButtons.length-1);
      radioButtons = radioButtons.slice(0, defaultCount);
    }

    return (
      <div className={cx(styles.root, this.props.className, this.state.isOpen ? styles.root_open : '')}>
        <div>
          {radioButtons.map((item, i) => (
            <RadioButton
              key={i} 
              label={item.title} 
              className={styles.radioButton} 
              kind={this.props.kind}
              value={item.value}
              checked={this.state.value === item.value}
              onChange={this.onChange}
            />
          ))}
        </div>
        {hiddenRadioButtons.length>0 && (
          <div className={cx(styles.more, {[styles.more_open]: this.state.isOpen})}>
            <div className={styles.more__hidden}>
              {hiddenRadioButtons.map((item, i) => (
                <RadioButton 
                  key={i} 
                  label={item.title} 
                  className={styles.radioButton} 
                  kind={this.props.kind}
                  value={item.value}
                  checked={this.state.value === item.value} 
                  onChange={this.onChange}
                />
              ))}              
            </div>
            <button onClick={this.toggle} className={styles.more__button}>{this.state.isOpen ? t('controls.hide') : t('controls.show')}</button>
          </div>
        )}
      </div>
    )
  }

  onChange = (e) => {
    const value = e.target.value;

    this.setState({value: value});

    this.props.onChange(value);
  }
  
  toggle = () => {
    this.setState({isOpen: !this.state.isOpen})
  }
}

RadioButtonsList.displayName = 'Modules/RadioButtonsList';

export default RadioButtonsList;
