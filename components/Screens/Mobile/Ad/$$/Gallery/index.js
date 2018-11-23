import React, { Component } from 'react';
import cx from 'classnames';
import Slider from 'react-slick';
import carouselStyles from 'slick-carousel/slick/slick.css';
import gallerySliderMobileStyles from './gallerySlider.css';
import ArrowButton from 'components/Base/ArrowButton';
import Toggle from 'components/Base/Toggle';
import ImagesZoom from 'components/Modules/ImagesZoom';
import styles from './index.sass';

class Gallery extends Component {
  _slider = React.createRef ? React.createRef() : null;

  state = {
    activeSlide: 0,
    zoom: false,
    dragging: false,
    images: this.props.list.map((image, i) => {
      return {...image, fullLoaded: false, thumbLoaded: false}
    })
  };
 
  componentDidMount(){
    this.loadImages();

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
    const {className, archived} = this.props;
    const {activeSlide, zoom, dragging, images} = this.state;
    const settings = {
      infinite: images.length > 1,
      draggable: !archived,
      dots: false,
      arrows: false,
      beforeChange: (current, next) => this.setState({dragging: true, activeSlide: next}),
      afterChange: () => this.setState({dragging: false}),
      speed: 500
    };

    return (
      <div className={cx(styles.root, this.props.className, className, {[styles.root_archived]: archived})}>
        {images.length > 0 &&
          <div>
            <style dangerouslySetInnerHTML={{ __html: carouselStyles + gallerySliderMobileStyles }} />
            <Slider ref={this._slider} className={cx(styles.slider, 'gallerySliderMobile')} {...settings}>
              {images.map((item, i) =>
                <div key={i} dataindex={i} className={styles.item}>
                  <div className={styles.itemInner} onClick={!dragging ? this.zoomOpen : null}>
                    <span className={styles.itemCover} style={{backgroundImage: `url(${item.mid})`}} />
                    <img className={styles.itemImage} src={item.mid}/>
                  </div>
                </div>
              )}
            </Slider>
            {(images.length > 1 && !archived) && <div className={styles.pagesCount}>{this.state.activeSlide + 1}/{images.length}</div>}
          </div>
        }
        <Toggle>
          <If condition={zoom}>
            <ImagesZoom size={'sm'} images={images} initialSlide={activeSlide} close={this.zoomClose} />
          </If>
        </Toggle>
      </div>  
    );
  }

  zoomOpen = () => {
    this.setState({zoom: true});
  }

  zoomClose = (i) => {
    const sliderNode = this._slider.current;

    sliderNode.slickGoTo(i);

    this.setState({zoom: false});
  }

  loadImages = () => {
    const {images} = this.state;

    images.map((image, i) => {
      let img = new Image();
      let thumb = new Image();
      img.onload = () => this.fullImageLoaded(i);
      thumb.onload = () => this.thumbImageLoaded(i);
      thumb.src = image.thumb;
      img.src = image.url;
    });
  }

  fullImageLoaded = (i) => {
    let {images} = this.state;

    images[i].fullLoaded = true;
    
    this.setState({images: images});
  }

  thumbImageLoaded = (i) => {
    let {images} = this.state;

    images[i].thumbLoaded = true;
    
    this.setState({images: images});
  } 
}

Gallery.displayName = 'Modules/Mobile/Ad/Gallery';

export default Gallery;