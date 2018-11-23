import React, {Component} from 'react';
import cx from 'classnames';
import Icon from 'components/Base/Icon';
import styles from './index.sass';
import { observer } from 'mobx-react';

@observer
class LikeButton extends Component {
  state = {
    transparent: false
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active === true && !nextProps.active) {
      this.setState({transparent: true});
    } else {
      this.setState({transparent: false});
    }
  }

  render() {
    const {active, className, onClick} = this.props;
  
    return (
      <button 
        className={cx(
          styles.root, 
          className,
          {[styles.root_active]: active},
          {[styles.root_transparent]: this.state.transparent}
        )} 
        onMouseLeave={this.onMouseLeave}
        onClick={onClick}
      >
        <Icon 
          icon={'heart'} 
          className={cx(styles.icon)} 
          heartStyles={styles.heartStyles} 
        />
      </button>
    )
  }

  onMouseLeave = () => {
    this.setState({transparent: false});
  }
}

LikeButton.displayName = 'Modules/LikeButton';

export default LikeButton;
