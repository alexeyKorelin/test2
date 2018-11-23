import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {throttle} from 'lodash';
import Slider from 'react-slick';
import IconNew from 'components/Base/IconNew';
import ArrowButtonLg from 'components/Base/ArrowButtonLg';
import Preloader from 'components/Base/Preloader';
import Toggle from 'components/Base/Toggle';

class ImagesZoom extends Component {
  _slider = React.createRef();

  state = {
    sliderHeight: false,
    activeSlide: this.props.initialSlide,
    initialSlide: this.props.initialSlide
  }

  componentWillMount() {
    this.slidesSizeUpdate();
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    window.addEventListener('keydown', this.onKeydown, false);

    if (window.document.body) window.document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('keydown', this.onKeydown, false);

    if (window.document.body) window.document.body.style.overflow = '';
  }

  render() {
    const {sliderHeight, activeSlide, initialSlide} = this.state;
    const {className, images, close, size} = this.props;
    const settings = {
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: true,
      nextArrow: <ArrowButtonLg arrowClassName={cx(styles.arrow, styles.arrow_right)} type={'right'} />,
      prevArrow: <ArrowButtonLg arrowClassName={cx(styles.arrow, styles.arrow_left)} type={'left'} />,
      dots: false,
      beforeChange: (current, next) => this.setState({activeSlide: next}),
      initialSlide: initialSlide,
      speed: 700,
      accessibility: false
    };
    
    return (
      <div 
        className={cx(
          styles.root, 
          className, 
          {[styles.root_single]: images.length === 1},
          {[styles[`root_${size}`]]: size},
          'noBlur'
        )}
      >
        <div className={cx(styles.overlay)} />
        <button className={styles.close} onClick={() => close(activeSlide)}>
          <IconNew i='close' />
        </button>
        <div className={styles.content}>
          <div className={styles.top}>
            <If condition={sliderHeight}>
              <Slider ref={this._slider} className={cx(styles.slider, 'imagesZoomSlider')} {...settings}>
                <For each='image' index='i' of={images}>
                  <div key={i} className={styles.slide}>
                    <div 
                      className={styles.slide__inner} 
                      style={{height: `${sliderHeight}px`}} 
                    >
                      <Toggle>
                        <Choose>
                          <When condition={image.fullLoaded}>
                            <div 
                              key='image' 
                              className={styles.slide__image} 
                              style={{
                                backgroundImage: `url(${(size && size == 'sm') ? image.mid : image.url}`
                              }} 
                            />
                          </When>
                          <Otherwise>
                            <Preloader key='preloader' className={styles.loader} />
                          </Otherwise>
                        </Choose>
                      </Toggle>
                    </div>
                  </div>
                </For>
              </Slider>
            </If>
          </div>
          <If condition={images.length > 1}>
            <div className={styles.bottom}>
              <div className={styles.pagesCount}>{`${activeSlide + 1} / ${images.length}`}</div>
              <div className={styles.pages}>
                <For each='image' index='i' of={images}>
                  <button
                    key={i} 
                    className={cx(styles.page, {[styles.page_active]: i == activeSlide})} 
                    onClick={() => this.goToSlide(i)}
                  >
                    <Toggle>
                      <Choose>
                        <When condition={image.thumbLoaded}>
                          <div key='image' className={styles.page__image} style={{backgroundImage: `url(${image.thumb})`}} />
                        </When>
                        <Otherwise>
                          <Preloader key='preloader' size={size} className={styles.page__preloader} />
                        </Otherwise>
                      </Choose>
                    </Toggle>
                  </button>
                </For>
              </div>
            </div>
          </If>
        </div>
      </div>
    )
  }

  onResize = throttle(() => {
    this.slidesSizeUpdate();
  }, 200);

  onKeydown = (e) => {
    const sliderNode =  this._slider.current;
    
    if (e.keyCode === 37) {
      sliderNode.slickPrev();
    } else if (e.keyCode === 39) {
      sliderNode.slickNext();
    }
  }

  slidesSizeUpdate = () => {
    const {size, images} = this.props;
    let outlineHeight = 0;

    if (size == 'sm') {
      if (images.length > 1) {
        outlineHeight += 13 + 43 + 14 + 10 + 13 + 46;
      } else {
        outlineHeight += 23 + 43;
      }
    } else {
      if (images.length > 1) {
        outlineHeight += 13 + 60 + 20 + 18 + 13 + 88;
      } else {
        outlineHeight += 23 + 60;
      }
    }

    this.setState({sliderHeight: window.innerHeight - outlineHeight})
  };

  goToSlide = (i) => {
    const sliderNode = this._slider.current;
   
    sliderNode.slickGoTo(i);    
  }
}

ImagesZoom.displayName = 'Modules/ImagesZoom';

export default ImagesZoom;