import React, { Component } from 'react';
import cx from 'classnames';
import styles from './index.sass';
import Toggle from 'components/Base/Toggle';
import IconNew from 'components/Base/IconNew';
import {observer} from 'mobx-react';

@observer
class CurrencySelect extends Component {
  _dropdown = React.createRef ? React.createRef() : null;

  state = {
    collapsed: true
  }

  componentDidMount () {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  render() {
    const {field, className, disabled} = this.props;
    if (!field) return null;
    const {required, values} = field.extra;
    const label = this.props.label || field.label;
    const errorMessage = !field.isValid && field.error && false;
    
    return (
      <div className={cx(styles.root, className)}>
        <div ref={this._dropdown} className={cx(styles.dropdown, {[styles.dropdown_expanded]: !this.state.collapsed})}>
          <div className={cx(styles.inner)}>
            <button onClick={this.toggle} className={cx(styles.current, {[styles.current_disabled]: disabled})}>
              <span className={styles.current__coin}>{field.value}</span>
              <IconNew className={cx(styles.current__icon)} i={field.value} size={field.value === 'dash' ? 9 : 12} />
            </button>
            <Toggle>
              {!this.state.collapsed &&
                <ul className={styles.list}>
                  {values.map((value, i) => {
                    if (field.value == value) {
                      return null;
                    } else {
                      return (
                        <li
                          key={i}
                          className={styles.list__li}
                          onClick={() => this.onChange(value)}>
                          <span className={cx(styles.list__coin)}>{value}</span>
                          <IconNew className={styles.list__icon} i={value} size={value === 'dash' ? 9 : 12} />
                        </li>
                      )
                    }
                  })}
                </ul>
              }
            </Toggle>
          </div>
        </div>
      </div>
    )
  }

  toggle = () => {
    if (!this.props.disabled) {
      this.setState({collapsed: !this.state.collapsed});
    }
  }

  onChange (value) {
    this.props.field.set(value);
    this.props.field.validate({showErrors: true});
    this.setState({collapsed: false});
  }

  collapse = () => {
    this.setState({collapsed: true});
  }

  handleClickOutside = (e) => {
    const dropdownNode = (this._dropdown && this._dropdown.current) || null;
    if (!dropdownNode) return;
    if (dropdownNode && !dropdownNode.contains(e.target)) {
      this.collapse();
    }
  } 
};

export default CurrencySelect;
