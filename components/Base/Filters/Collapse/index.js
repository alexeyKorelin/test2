import React, {Component} from 'react';
import IconNew from 'components/Base/IconNew';
import cx from 'classnames';
import styles from './index.sass';
import {declOfNum} from 'utils/utils';
import Toggle from 'components/Base/Toggle';
import {upperFirst} from 'lodash';
import { inject, observer } from 'mobx-react';

@inject('locales')
@observer
class Collapse extends Component {
  state = {
    isOpen: this.props.defaultOpen
  }

  render() {
    const {isOpen} = this.state;
    const {
      forcedOpen, 
      uncontrolled, 
      additionText, 
      collapsedMessage, 
      listValues, 
      numberValues, 
      valuesNames, 
      type,
      locales: {t}
    } = this.props;
    let longValues = '';

    if (type == 'list') {
      if (listValues && listValues.length > 0) {
        longValues = 
          `${t('controls.selected')} ${listValues.length}: ${listValues.join(', ')}`;
      }
    } else if (type == 'price') {
      if (listValues && listValues.length > 1) {
        longValues = 
          `${t('controls.selected')} ${listValues.length}: ${listValues.map(value => value.toUpperCase()).join(', ')}`;
      } else if (listValues.length === 1) {
        longValues = 
          `${t('controls.selected')} ${listValues.map(value => value.toUpperCase()).join(', ')} ${t('controls.range', {from: numberValues.min, to: numberValues.max})}`;
      }
    } else if (type == 'switch') {
      longValues = listValues.filter(value => value.value).map(value => value.name).join(', ');
    } else if (type == 'range') {
      longValues = upperFirst(t('controls.range', {from: numberValues.min, to: numberValues.max}));
    }

    return (
      <div 
        className={cx(
          styles.root, 
          this.props.className, 
          {[styles.root_open]: (isOpen && !this.props.collapsed) || forcedOpen},
          {[styles.root_collapsed]: this.props.collapsed},
          {[styles.root_forcedOpen]: forcedOpen},
          {[styles.root_uncontrolled]: uncontrolled}
        )}
      >
        <If condition={!this.props.disabled}>
          <div className={cx(styles.title, this.props.titleClass)} onClick={!uncontrolled ? this.toggle: null}>
            <If condition={this.props.icon}>
              <IconNew i={this.props.icon} size={34}/>
            </If>
            {this.props.title}
            <Toggle>
              {(collapsedMessage && ((isOpen && !this.props.collapsed) || forcedOpen)) && <span className={styles.message}>&nbsp;{collapsedMessage}</span>}
            </Toggle>
          </div>
        </If>
        <If condition={this.props.disabled}>
          <div className={cx(styles.title, styles.title_disabled, this.props.titleClass)}>{this.props.title}</div>
        </If>
        <div className={styles.children}>    
          <div className={styles.childrenInner}>{this.props.children}</div>
        </div>
        <Toggle>
          <If condition={longValues && !((isOpen && !this.props.collapsed) || forcedOpen)}>
            <div className={styles.values} title={longValues}>{longValues}</div>
          </If>
        </Toggle>
        <Toggle>         
          {(collapsedMessage && !((isOpen && !this.props.collapsed) || forcedOpen)) &&
            <div className={styles.values}>{collapsedMessage}</div>
          }
        </Toggle>
      </div>
    )
  }

  toggle = () => {
    if (!this.props.collapsed) {
      this.setState({isOpen: !this.state.isOpen});
    }
  }  
}

Collapse.displayName = 'Modules/Collapse';

export default Collapse;
