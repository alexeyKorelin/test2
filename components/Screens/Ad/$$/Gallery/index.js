import React, { Component } from 'react';
import cx from 'classnames';
import Slider from 'react-slick';
import carouselStyles from 'slick-carousel/slick/slick.css';
import gallerySliderStyles from './gallerySlider.css';
import ArrowButton from 'components/Base/ArrowButton';
import ImagesZoom from 'components/Modules/ImagesZoom';
import Toggle from 'components/Base/Toggle';
import styles from './index.sass';

class Gallery extends Component {
  _slider = React.createRef();

  state = {
    activeSlide: 0,
    zoom: false,
    dragging: false,
    images: this.props.list.map((image, i) => {
      return {...image, fullLoaded: false, thumbLoaded: false}
    })
  };
  
  componentDidMount() {
    this.loadImages();
  }

  render() {
    const {className, archived} = this.props;
    const {zoom, activeSlide, dragging, images} = this.state;
    const settings = {
      customPaging: function(i) {
        return (
          <button 
            className={cx(
              styles.page, 
              {[styles.page_active]: i === activeSlide}
            )}  
          />
        );
      },
      infinite: images.length > 1,
      draggable: !archived,
      arrows: false,
      dots: !archived,
      beforeChange: (current, next) => this.setState({dragging: true}),
      afterChange: (index) => this.setState({activeSlide: index, dragging: false}),
      speed: 500
    };
    
    return (
      <div className={cx(styles.root, this.props.className, className, {[styles.root_archived]: archived})}>
        <If condition={images.length > 0}>
          <div>
            <style dangerouslySetInnerHTML={{ __html: carouselStyles + gallerySliderStyles }} />
            <div>
              <div className={styles.root__inner}>
                <Slider ref={this._slider} className={cx(styles.slider, 'gallerySlider')} {...settings}>
                  {images.map((item, i) =>
                    <div key={i} dataindex={i} className={styles.item}>
                      <div className={styles.itemInner} onClick={!dragging ? this.zoomOpen : null}>
                        <span className={styles.itemCover} style={{backgroundImage: `url(${item.mid})`}} />
                        <img className={styles.itemImage} src={item.mid} />
                      </div>
                    </div>
                  )}
                </Slider>
              </div>
              <If condition={images.length > 1 && !archived}>
                <ArrowButton onClick={this.slickNext} arrowClassName={cx(styles.arrow, styles.arrow_right)} type={'right'} />
                <ArrowButton onClick={this.slickPrev} arrowClassName={cx(styles.arrow, styles.arrow_left)} type={'left'} />
              </If>
            </div>
            {(images.length > 1 && !archived) && <div className={styles.pagesCount}>{this.state.activeSlide + 1}/{images.length}</div>}
            <Toggle>
              <If condition={zoom}>
                <ImagesZoom images={images} initialSlide={activeSlide} close={this.zoomClose} />
              </If>
            </Toggle>
          </div>
        </If>
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

  slickNext = () => {
    const sliderNode = (this._slider && this._slider.current) || null;
    if (!sliderNode) return;

    sliderNode.slickNext();    
  }

  slickPrev = () => {
    const sliderNode = (this._slider && this._slider.current) || null;
    if (!sliderNode) return;

    sliderNode.slickPrev();    
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

Gallery.displayName = 'Modules/Ad/Gallery';

export default Gallery;
