import React, {Component} from 'react';
import cx from 'classnames';
import {Router} from 'routes';
import styles from './index.sass';

class ControlledHrefLink extends Component {
  componentDidMount() {
    const {prefetch, href} = this.props;

    if (prefetch) {
      Router.prefetchRoute(href);
    }
  }

  linkCallback = (e) => {
    const {stop, href} = this.props;
    e.stopPropagation();
    e.preventDefault();
    if (!stop) {
      Router.pushRoute(href);
    }
  }


  render () {
    const {href, stop, className} = this.props;
    return (
      <a
        className={cx(styles.root, className)}
        href={href}
        onClick={this.linkCallback}
      >
        {this.props.children}
      </a>
    )
  }
}

ControlledHrefLink.displayName = 'Modules/ControlledHrefLink';

export default ControlledHrefLink;
