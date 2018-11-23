import {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {throttle} from 'lodash';
import ArrowButton from 'components/Base/ArrowButton';
import scrollTo from 'ssr-scroll-to';
import Toggle from 'components/Base/Toggle';
import Icon from 'components/Base/Icon';

class GoTop extends Component {
  state = {
    show: false
  }
  
  componentDidMount () {
    window.addEventListener('scroll', this.onScroll);
  }

  render () {
    const {show} = this.state;
    const {size} = this.props;

    return (
      <Toggle>
        <If condition={show}>
          <button 
            onClick={this.scrollTop} 
            className={cx(styles.root, styles[`root_${size || 'default'}`])} 
            type='top'
          >
            <Icon className={styles.icon} icon='go-top' />
          </button>
        </If>
      </Toggle>
    )
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll = throttle(() => {
    this.checkScroll();
  }, 50);  

  checkScroll = () => this.setState({show: window.pageYOffset > window.innerHeight});

  scrollTop = () => {
    scrollTo(false, 0);
  }
}

GoTop.displayName = 'Modules/GoTop';

export default GoTop;