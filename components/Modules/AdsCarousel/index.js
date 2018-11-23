import React, {Component} from 'react';
import cx from 'classnames';
import { observer } from 'mobx-react';
import AdBage from 'components/Modules/AdBage';
import {Link} from 'routes';
import Slider from 'react-slick';
import Icon from 'components/Base/Icon';
import ArrowButton from 'components/Base/ArrowButton';
import carouselStyles from 'slick-carousel/slick/slick.css';
import adsCarouselStyles from './adsCarousel.css';
import styles from './index.sass';

@observer
class AdsCarousel extends Component {
  state = {
    dragging: false
  };

  render() {
    const {auth} = this.props;

    if (this.props.list.length>0) {
      const settings = {
        infinite: this.props.list.length>4,
        slidesToShow: 4,
        slidesToScroll: 1,
        draggable: true,
        nextArrow: <ArrowButton arrowClassName={cx(styles.arrow, styles.arrow_right)} type={'right'} />,
        prevArrow: <ArrowButton arrowClassName={cx(styles.arrow, styles.arrow_left)} type={'left'} />,
        beforeChange: () => this.setState({ dragging: true}),
        afterChange: () => this.setState({ dragging: false}),
        variableWidth: true,
      };

      return (
        <div className={cx(styles.root, this.props.className)}>
          <style dangerouslySetInnerHTML={{ __html: carouselStyles + adsCarouselStyles }} />
          <Slider className={cx(styles.slider, 'adsCarousel')} {...settings}>
            {this.props.list.map((item, i) =>
              <div key={i} data-index={i} className={styles.item}>
                <AdBage ad={item} auth={auth} stop={this.state.dragging} />
              </div>
            )}
          </Slider>
        </div>
      );
    } else {
      return null;
    }
  }
}

AdsCarousel.displayName = 'Modules/AdsCarousel';

export default AdsCarousel;
