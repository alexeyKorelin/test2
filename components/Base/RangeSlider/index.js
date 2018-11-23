import React, { Component } from 'react';
import {Range} from 'rc-slider';
import rcStyles from 'rc-slider/assets/index.css';
import cx from 'classnames';
import styles from './index.sass';
import {observer} from 'mobx-react';
import {currencyRatio} from 'stores/fields/content.js';

@observer
class RangeSlider extends Component {
  state = {
    isActive: false,
    min: this.props.value ? this.props.value.min : this.props.min,
    max: this.props.value ? this.props.value.max : this.props.max,
    invalidMin: false,
    invalidMax: false
  }

  handleStyle = {
    height: 18,
    width: 18,
    padding: 0,
    border: '5px solid #fff',
    boxShadow: '0 2px 6px rgba(144,164,183,0.22)',
    marginTop: -6,
    marginLeft: -9
  }

  trackStyle = [
    {
      height: 6
    }
  ];

  railStyle = {
    height: 6,
    borderTop: '1px solid #DFE6EE',
    borderBottom: '1px solid #DFE6EE',
    backgroundColor: '#F4F7FA',
    borderRadius: 0
  };

  render() {
    const {invalidMin, invalidMax} = this.state;
    const {value, min, max, step, disabled, size} = this.props;
    
    return (
      <div 
        className={cx(
          styles.root, 
          this.props.className, 
          {[styles.root_disabled]: disabled},
          {[styles[`root_` + size]]: !!size}
        )}
      >
        <style dangerouslySetInnerHTML={{ __html: rcStyles }} />
        <style jsx global>{`
          .${styles.root} .rc-slider .rc-slider-handle {
            background: #7200FF;
            transition: background 0.3s;
          }
          .${styles.root} .rc-slider .rc-slider-track {
            background: #7200FF;
            transition: background 0.3s;
          }
          .${styles.root} .rc-slider-disabled {
            background: transparent;
          }
          .${styles.root} .rc-slider-disabled .rc-slider-handle {
            background: #9B9B9B;
          }
          .${styles.root} .rc-slider-disabled .rc-slider-track {
            background: #9B9B9B;
          }
        `}</style>
        <div className={cx(styles.inputs, {[styles.inputs_active]: this.state.isActive})}>
          <div className={styles.inputs__col}>
            <input
              className={cx(styles.inputs__input, {[styles.inputs__input_error]: invalidMin})}
              type={'number'}
              step={'any'}
              value={this.state.min}
              onChange={this.onMinValueChange}
              onBlur={this.onMinBlur}
              disabled={disabled}
              min={min}
              max={max}
            />
          </div>
          <div className={styles.inputs__col}>
            <input
              className={cx(styles.inputs__input, {[styles.inputs__input_error]: invalidMax})}
              type={'number'}
              step={'any'}
              value={this.state.max}
              onChange={this.onMaxValueChange}
              onBlur={this.onMaxBlur}
              disabled={disabled}
              min={min}
              max={max}
            />
          </div>
        </div>
        <div className={styles.range}>
          <div className={styles.range__container}>
            <Range
              className={styles.range__range}
              min={min}
              max={max}
              step={step || 1}
              defaultValue={[min, max]}
              value={[value ? value.min : min, value ? value.max : max]}
              handleStyle={[this.handleStyle, this.handleStyle]}
              trackStyle={this.trackStyle}
              railStyle={this.railStyle}
              allowCross={false}
              onBeforeChange={this.onBeforeChange}
              onAfterChange={this.onAfterChange}
              onChange={this.onChange}
              disabled={disabled}
            />
          </div>
        </div>
      </div>
    )
  }

  onMinValueChange = (e) => {
    let newValue = parseFloat(e.target.value);
    const {value, min} = this.props;
    let invalid = false;

    if (newValue !== NaN && newValue !== null && newValue >= min && newValue <= value.max ) {
      this.props.onChange([newValue, value.max]);
    } else {
      (isNaN(newValue)) && (newValue = '');
      invalid = true;
    }

    this.setState({min: newValue, invalidMin: invalid});
  }

  onMaxValueChange = (e) => {
    let newValue = parseFloat(e.target.value);
    const {value, max} = this.props;
    let invalid = false;
    
    if (newValue !== NaN && newValue !== null && newValue >= value.min && newValue <= max) {
      this.props.onChange([value.min, newValue]);
    } else {
      (isNaN(newValue)) && (newValue = '');
      invalid = true;
    }

    this.setState({max: newValue, invalidMax: invalid});   
  }

  onMinBlur = () => {
    this.setState({min: this.props.value.min, invalidMin: false});
  }

  onMaxBlur = () => {
    this.setState({max: this.props.value.max, invalidMax: false});
  }

  onChange = (value) => {
    this.setState({min: value[0], max: value[1]});
    this.props.onChange([value[0], value[1]]);
  }

  onBeforeChange = () => {
    this.setState({isActive: true});
  }

  onAfterChange = () => {
    this.setState({isActive: false});
  }
}

export default RangeSlider;
