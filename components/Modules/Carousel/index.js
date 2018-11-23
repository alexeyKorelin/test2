import React, {Component} from 'react';
import styles from './index.sass';
import cx from 'classnames';
import Icon from 'components/Base/Icon';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // items: STACK,
      currIndex: 0,
      isNext: true
    };
    this.handlerPrev = this.handlerPrev.bind(this);
    this.handlerNext = this.handlerNext.bind(this);
    this.goToHistoryClick = this.goToHistoryClick.bind(this);
  }

  handlerPrev() {
    let {currIndex} = this.state;
    if (currIndex < 1) {
      currIndex = this.props.items.length;
    }
    currIndex = currIndex - 1;
    this.setState({ currIndex, isNext: false });
  }

  handlerNext() {
    let {currIndex} = this.state;
    if (currIndex === this.props.items.length - 1) {
      currIndex = -1;
    }
    currIndex = currIndex + 1;
    this.setState({ currIndex, isNext: true });
  }

  goToHistoryClick(currIndex, index) {
    this.setState({ currIndex: index, isNext: currIndex < index });
  }

  render() {
    const {currIndex, isNext} = this.state;
    const {items, height} = this.props;
    const currItem = items[currIndex];
    return (
      <div className={styles.root} style={{height: `${height + 10}px`}}>
        <div className={styles.scene}>
          <ReactCSSTransitionGroup
             transitionEnterTimeout={500}
             transitionLeaveTimeout={500}
             component="div"
             transitionName={{
               enter: isNext ? styles.enterNext : styles.enterPrev,
               enterActive: styles.enterActive,
               leave: styles.leave,
               leaveActive: isNext ? styles.leaveActiveNext : styles.leaveActivePrev
             }}
            >
              <div className={styles.slide} key={currIndex}>{currItem}</div>
            </ReactCSSTransitionGroup>
        </div>
        <button className={cx(styles.arrow, styles['arrow-prev'])} onClick={this.handlerPrev}>
          <Icon icon="arrow-left" width={16}/>
        </button>
        <button className={cx(styles.arrow, styles['arrow-next'])} onClick={this.handlerNext}>
          <Icon icon="arrow-right" width={16}/>
        </button>
        <div className={styles.dots}>
          {items.map((item, index) => (
            <button
              key={index}
              className={cx(styles.dot, {[styles['dot-active']]: index === currIndex})}
              onClick={() => this.goToHistoryClick(currIndex, index)}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Carousel;
