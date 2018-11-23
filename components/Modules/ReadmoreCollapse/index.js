import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';

class ReadmoreCollapse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({isOpen: !this.state.isOpen})
  }

  render() {
    const { className, size } = this.props;

    return (
      <div 
        className={cx(
          styles.root, 
          className, 
          {[styles.root_open]: this.state.isOpen},
          {[styles[`root_` + size]]: size}
        )}
      >
        <div className={styles.title} onClick={this.toggle}>
          {this.props.title}
          <button className={styles.button}/>
        </div>
        <div className={styles.description}>    
          <div className={styles.descriptionInner} dangerouslySetInnerHTML={{ __html: this.props.description }} />
        </div>
      </div>
    )
  }
}

ReadmoreCollapse.displayName = 'Modules/ReadmoreCollapse';

export default ReadmoreCollapse;
