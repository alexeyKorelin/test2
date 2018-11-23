import React, {Component} from 'react';
import IconNew from 'components/Base/IconNew';
import cx from 'classnames';
import styles from './index.sass';

class FormCollapse extends Component {
  state = {
    isOpen: this.props.defaultOpen
  }

  render() {
    return (
      <div 
        className={cx(
          styles.root, 
          this.props.className, 
          {[styles.root_open]: (this.state.isOpen && !this.props.collapsed)},
          {[styles.root_collapsed]: this.props.collapsed}
        )}
      >
        <If condition={!this.props.disabled}>
          <div className={cx(styles.title, this.props.titleClass)} onClick={this.toggle}>
            <If condition={this.props.icon}>
              <IconNew i={this.props.icon} size={34}/>
            </If>
            {this.props.title}
            {this.props.collapsedMessage && <span className={styles.message}>&nbsp;{this.props.collapsedMessage}</span>}
          </div>
        </If>
        <If condition={this.props.disabled}>
          <div className={cx(styles.title, styles.title_disabled, this.props.titleClass)}>{this.props.title}</div>
        </If>
        <div className={styles.children}>    
          <div className={styles.childrenInner}>{this.props.children}</div>
        </div>
      </div>
    )
  }

  toggle = () => {
    if (!this.props.collapsed) {
      this.setState({isOpen: !this.state.isOpen});
    }
  }  
}

FormCollapse.displayName = 'Modules/FormCollapse';

export default FormCollapse;
