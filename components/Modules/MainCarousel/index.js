import React, { Component } from 'react';
import cx from 'classnames';
import Slider from 'react-slick';
import carouselStyles from 'slick-carousel/slick/slick.css';
import mainCarouselStyles from './mainCarousel.css';
import Icon from 'components/Base/Icon';
import ControlledHrefLink from 'components/Base/ControlledHrefLink';
import CategoryBage from 'components/Modules/CategoryBage';
import ArrowButton from 'components/Base/ArrowButton';
import styles from './index.sass';

class MainCarousel extends Component {
  state = {
    dragging: false
  };

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
    const { sliderSettings } = this.props;

    if (this.props.list.length>0) {
      const settings = {
        customPaging: function(i) {
          return (
            <button className={cx(styles.page, 'page')} />
          );
        },
        infinite: this.props.list.length>3,
        slidesToShow: 3,
        slidesToScroll: 3,
        draggable: true,
        nextArrow: <ArrowButton arrowClassName={cx(styles.arrow, styles.arrow_right)} type={'right'} />,
        prevArrow: <ArrowButton arrowClassName={cx(styles.arrow, styles.arrow_left)} type={'left'} />,
        dots: true,
        beforeChange: () => this.setState({ dragging: true}),
        afterChange: () => this.setState({ dragging: false}),
        ...sliderSettings
      };

      return (
        <div className={cx(styles.root, this.props.className)} style={this.props.style}>
          <style dangerouslySetInnerHTML={{ __html: carouselStyles + mainCarouselStyles }} />
          <Slider className={cx(styles.slider, 'mainCarousel')} {...settings}>
            {this.props.list.map((item, i) =>
              <ControlledHrefLink key={i} data-index={i} stop={this.state.dragging} href={item.advert.url} prefetch={true}>
                <CategoryBage className={styles.item} card={item}/>
              </ControlledHrefLink>
            )}
          </Slider>
        </div>
      );
    } else {
      return null;
    }
  }
}

MainCarousel.displayName = 'Modules/MainCarousel';

export default MainCarousel;
