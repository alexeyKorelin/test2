import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import moment from 'moment';
import {inject, observer} from 'mobx-react';

@inject('locales')
@observer
class Timer extends Component {
  state = {
    time: 0,
    start: false
  }

  componentDidMount() {
    this.startTime();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render () {
    const {time} = this.state;
    const {className, locales: {t}, size} = this.props;
    const days = Math.floor(time / (60 * 60 * 24));
    const hours = Math.floor(time / (60 * 60) - days * 24); 
    const minutes = Math.floor(time / 60 - days * 24 * 60 - hours * 60);
    const seconds = time - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

    return (
      <div className={cx(styles.root, className, styles[`root_${size || 'default'}`])}>
        <div className={styles.time}>
          <div className={styles.content}>
            <div className={styles.value}>{days}</div>
            <div className={styles.unit}>{t(`ico.timer.day`)}</div>
          </div>
        </div>
        <div className={styles.time}>
          <div className={styles.content}>
            <div className={styles.value}>{hours}</div>
            <div className={styles.unit}>{t(`ico.timer.hour`)}</div>
          </div>
        </div>
        <div className={styles.time}>
          <div className={styles.content}>
            <div className={styles.value}>{minutes}</div>
            <div className={styles.unit}>{t(`ico.timer.min`)}</div>
          </div>
        </div>
        <div className={styles.time}>
          <div className={styles.content}>
            <div className={styles.value}>{seconds}</div>
            <div className={styles.unit}>{t(`ico.timer.sec`)}</div>
          </div>
        </div>
      </div>
    )
  }

  startTime = () => {
    const {locales: {t}} = this.props;

    this.timer = setInterval(() => {
      const time = this.state.start ? 
        this.state.time : 
        Math.round((moment(`${t('ico.timer.end_date')} +0300`, 'DD.MM.YYYY Z').valueOf() - Date.now()) / 1000);
      
      if (time > 0) { 
        (this.state.start) ? 
          this.setState({time: time - 1}) : 
          this.setState({time: time - 1, start: true});
      } else {
        !this.state.start && this.setState({start: true});
        clearInterval(this.timer);
      }
    }, 1000);
  }
}

export default Timer;
