import React, { Component } from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import IconNew from 'components/Base/IconNew';

@inject('locales')
@observer
class Description extends Component {
  _description = React.createRef ? React.createRef() : null;
  _descriptionWrapper = React.createRef ? React.createRef() : null;

  state = {
    expanded: false,
    togglerShowed: false
  }

  componentDidMount() {
    this.showToggler();
  }

  render() {
    const {className, description, archived, locales: {t}} = this.props;

    return (
      <div
        className={cx(
          styles.root,
          {[styles.root_archived]: archived},
          {[styles.root_expanded]: this.state.expanded}
        )}
      >
        <div ref={this._descriptionWrapper} className={cx(styles.description, className)}>
          <div ref={this._description}>{description.split('\n').map((row, i) => { return <div key={i} className={styles.desc_row}>{row}</div>})}</div>
        </div>
        {this.state.togglerShowed &&
          <button className={styles.button} onClick={this.toggle}>
            {this.state.expanded ? t('ad.description.hide') : t('ad.description.show')}
            <IconNew className={styles.caret} i={'caret-down'} />
          </button>
        }
      </div>
    )
  }

  toggle = () => {
    this.setState({expanded: !this.state.expanded});
  }

  showToggler = () => {
    const descriptionWrapperNode = (this._descriptionWrapper && this._descriptionWrapper.current) || null;
    const descriptionNode = (this._description && this._description.current) || null;
    if (!descriptionWrapperNode || !descriptionNode) return;

    if (descriptionWrapperNode.offsetHeight < descriptionNode.offsetHeight) this.setState({togglerShowed: true});
  }
}

Description.displayName = 'Screens/Ad/Description';

export default Description;
