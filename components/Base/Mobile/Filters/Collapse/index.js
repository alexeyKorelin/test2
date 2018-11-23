import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import Sidebar from 'components/Modules/Mobile/Sidebar';
import Toggle from 'components/Base/Toggle';
import { inject, observer } from 'mobx-react';
import {upperFirst} from 'lodash';

@inject('locales')
@observer
class Collapse extends Component {
  state = {
    isOpen: false
  }

  render() {
    const {isOpen} = this.state;
    const {
      children,
      title,
      className,
      listValues,
      numberValues,
      valuesNames,
      onClose,
      type,
      external,
      locales: {t}
    } = this.props;
    let shortValues = '';
    let longValues = '';

    if (type == 'list') {
      if (listValues && listValues.length > 0) {
        shortValues = `${t('controls.selected')} ${listValues.length}`;
        longValues = `${t('controls.selected')} ${listValues.length}: ${listValues.join(', ')}`;
      }
    } else if (type == 'price') {
      if (listValues && listValues.length > 0) {
        shortValues = `${t('controls.selected')} ${listValues.length}`;
      }

      if (listValues && listValues.length > 1) {
        longValues = `${t('controls.selected')} ${listValues.length}: ${listValues.map(value => value.toUpperCase()).join(', ')}`;
      } else if (listValues.length === 1) {
        longValues = `${t('controls.selected')} ${listValues.map(value => value.toUpperCase()).join(', ')} ${t('controls.range', {from: numberValues.min, to: numberValues.max})}`;
      }
    } else if (type == 'switch') {
      longValues = listValues.filter(value => value.value).map(value => value.name).join(', ');
    } else if (type == 'range') {
      longValues = upperFirst(t('controls.range', {from: numberValues.min, to: numberValues.max}));
    }

    return (
      <div className={cx(styles.root, className, {[styles.root_open]: isOpen})}>
        <div onClick={this.toggle} className={styles.title}>{title}</div>
        <Choose>
          <When condition={external}>
            <Sidebar
              className={styles.fullSidebar}
              isOpened={isOpen}
              from={'right'}
              onClose={onClose}
              onBack={this.onClose}
              saveOverflow={true}
              style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)'}}
            >
              <div className={styles.header}>
                <h2 className={styles.h2}>{title}</h2>
                <Toggle>
                  {shortValues &&
                    <div className={styles.subheader}>{shortValues}</div>
                  }
                </Toggle>
              </div>
              {children}
            </Sidebar>
          </When>
          <Otherwise>
            <Toggle>
              <If condition={isOpen}>
                <div className={styles.expanded}>{children}</div>
              </If>
            </Toggle>
          </Otherwise>
        </Choose>
        <If condition={longValues && !isOpen}>
          <Toggle>
            <div className={styles.selected}>{longValues}</div>
          </Toggle>
        </If>
      </div>
    )
  }

  open = () => {
    this.setState({isOpen: true});
  }

  toggle = () => {
    this.setState({isOpen: !this.state.isOpen});
  }

  onClose = () => {
    this.setState({isOpen: false});
  }
}

Collapse.displayName = 'Base/Mobile/Filters/Collapse';

export default Collapse;
