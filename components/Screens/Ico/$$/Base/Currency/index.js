import {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import Settings from 'config';

class Currency extends Component {
  state = {
    delay: 0 
  };
  
  componentDidMount() {
    this.setState({delay: Math.random()});
  };

  render () {
    const {delay} = this.state;
    const {className, currency} = this.props;
    
    return (
      <img 
        src={`${Settings.assetHost}/ico/currencies/${currency}.png`} 
        className={cx(styles.root, className)}
        style={{animationDelay: `${delay}s`}}
      />
    )
  }
}

export default Currency;
