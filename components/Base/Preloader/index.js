import { Component } from 'react';
import cx from 'classnames';
import styles from './index.sass';

export default class Preloader extends Component {
  render() {
    const {className, size} = this.props;

    return (
      <div className={cx(styles.root, className, styles[`root_${size || 'default'}`])}>
        <div />
        <div />
        <div />
        <div />
      </div>
    )
  }
}
