import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import Settings from 'config';
import {throttle} from 'lodash';
import Container from '../Container';
import H4 from 'components/Screens/Ico/$$/Base/H4';
import Cap from 'components/Screens/Ico/$$/Base/Cap';
import Card from 'components/Screens/Ico/$$/Base/Card';
import IconNew from 'components/Base/IconNew';
import Carousel from '../Carousel';
import {formatPrice, tToArray} from 'utils/utils';

@inject('locales')
@observer
class Distribution extends Component {
  eth = 200;

  _root = React.createRef();

  state = {
    active: 0,
    width: 0
  }

  slideWidth = 280;

  componentDidMount() {
    this.updateSlider();

    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  render () {
    const {active, width} = this.state;
    const {className, locales: {t}} = this.props;
    const settings = {     
      className: 'slider variable-width',
      customPaging: function(i) {
        return (
          <button className={styles.page} />
        );
      },
      infinite: false,
      variableWidth: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe: true,
      arrows: false,
      dots: true,
      beforeChange: (current, next) => this.setState({active: next})
    };
    const visibleSlides = active + Math.ceil(width / this.slideWidth) - 2;
    
    return (
      <div ref={this._root} id='distribution' className={cx(styles.root, className)}>
        <Container className={styles.container}>
          <H4 className={styles.title}>{t(`ico.distribution.title`)}</H4>
          <div className={styles.course}>1 ETH = {this.eth} USD</div>      
          <div className={styles.caps}>
            <div className={styles.caps__inner}>
              <Cap className={styles.caps__cap} kind='s'>
                3 300 <IconNew i='eth' className={styles.caps__icon} />&nbsp;= {3300 * this.eth} <IconNew i='usd' className={styles.caps__icon} />
              </Cap>
              <Cap className={styles.caps__cap}>
                3 300 <IconNew i='eth' className={styles.caps__icon} />&nbsp;= {3300 * this.eth} <IconNew i='usd' className={styles.caps__icon} />
              </Cap>
            </div>
          </div>   
        </Container>
        <div className={styles.items}>
          <Carousel settings={settings}>
            <For each='item' index='i' of={tToArray(t('ico.distribution.items', {returnObjects: true}))}>
              <div 
                key={i} 
                className={cx(styles.item, {[styles.item_invisible]: i > visibleSlides || i < active})} 
                style={{width: this.slideWidth}}
              >
                <Card 
                  active={true}
                  className={styles.card}
                  subtitle={item.title} 
                  percent={parseFloat(item.percent)}
                  soft={<span>{formatPrice(item.eth.soft)} <IconNew i='eth' className={styles.card__icon} /> = {formatPrice(parseFloat(item.eth.hard) * this.eth)} <IconNew i='usd' className={styles.card__icon} /></span>}
                  hard={<span>{formatPrice(item.eth.hard)} <IconNew i='eth' className={styles.card__icon} /> = {formatPrice(parseFloat(item.eth.hard) * this.eth)} <IconNew i='usd' className={styles.card__icon} /></span>}
                />            
              </div>
            </For>
          </Carousel>
        </div>
      </div>
    )
  }
  
  onResize = throttle(() => {
    this.updateSlider();
  }, 500);

  updateSlider = () => {
    const root = this._root.current;

    this.setState({width: root.offsetWidth});
  }
}

export default Distribution;
