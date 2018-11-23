import React, {Component} from 'react';
import cx from 'classnames';
import Slider from 'react-slick';
import carouselStyles from 'slick-carousel/slick/slick.css';
import cardsCarouselStyles from './cardsCarousel.css';
import styles from './index.sass';

export class CardsCarousel extends Component {
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
    if (this.props.list.length > 0) {
      const settings = {        
        customPaging: function(i) {
          return (
            <button className={cx(styles.page, 'page')} />
          );
        },
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: true,
        dots: true,
        arrows: false,
        adaptiveHeight: true
      };

      return (
        <div className={cx(styles.root, this.props.className)}>
          <style dangerouslySetInnerHTML={{ __html: carouselStyles + cardsCarouselStyles }} />
          <Slider className={cx(styles.slider, 'cardsCarousel')} {...settings}>
            {this.props.list.map((item, i) =>
              <div key={i} className={styles.itemContainer}>
                <div className={styles.item}>{item}</div>
              </div>
            )}
          </Slider>
        </div>
      );
    } else {
      return null;
    }
  }

  displayName = 'Modules/Mobile/CardsCarousel';
}

export const CardsCarouselItem = ({children}) => (
  <div className={styles.item}>{children}</div>
)
