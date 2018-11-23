import React, {Component} from 'react';
import cx from 'classnames';
import Slider from 'react-slick';
import styles from './index.sass';

export class Carousel extends Component {
  _slider = React.createRef();

  componentDidMount(){
    window.addEventListener('touchstart', this.touchStart);
    window.addEventListener('touchmove', this.preventTouch, {passive: false});
  }

  componentWillUnmount(){
      window.removeEventListener('touchstart', this.touchStart);
      window.removeEventListener('touchmove', this.preventTouch, {passive: false});
  }

  touchStart(e){
      this.firstClientX = e.touches[0].clientX;
      this.firstClientY = e.touches[0].clientY;
  }

  preventTouch(e){
      const minValue = 20;

      this.clientX = e.touches[0].clientX - this.firstClientX;
      this.clientY = e.touches[0].clientY - this.firstClientY;

      if(Math.abs(this.clientX) > minValue && event.cancelable){ 
        e.preventDefault();
        e.returnValue = false;
        return false;
      }
  }

  render() {
    const {className, children, settings, setRef} = this.props;

    return (
      <Slider ref={setRef} className={cx(styles.root, className)} {...settings}>{children}</Slider>
    );
  }
}

export default Carousel;
