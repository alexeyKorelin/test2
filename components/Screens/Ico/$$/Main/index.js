import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import Settings from 'config';
import ParallaxMousemove from 'react-parallax-mousemove';
import {Parallax} from 'react-scroll-parallax';
import {Container, Row, Col} from 'components/Base/Grid';
import {chunk} from 'lodash';
import {Link} from 'routes';
import Section from '../Base/Section';
import Documents from '../Base/Documents';
import Header from '../Base/Header';
import Currency from '../Base/Currency';
import SaleIndicator from '../Base/SaleIndicator';
import IconNew from 'components/Base/IconNew';
import Toggle from 'components/Base/Toggle';
import Button from 'components/Base/Button';

@inject('locales')
@observer
class Main extends Component {
  state = {
    menuIsOpen: false,
    smoke: {
      x: 0,
      y: 0
    },
    tracks: [
      {x: 0, y: 0}, 
      {x: 0, y: 0}, 
      {x: 0, y: 0}, 
      {x: 0, y: 0}, 
      {x: 0, y: 0}, 
      {x: 0, y: 0}, 
      {x: 0, y: 0}, 
      {x: 0, y: 0}, 
      {x: 0, y: 0}, 
      {x: 0, y: 0}
    ],
    pyramidActive: false
  }

  render () {
    const {menuIsOpen, smoke, pyramidActive, tracks} = this.state;
    const {className, locales: {t}} = this.props;

    return (
      <Section className={cx(styles.root, className)}>
        <div className={styles.root__undercover}>
          <Parallax
            offsetYMax={'900px'}
            offsetYMin={'-900px'}
            slowerScrollRate
            className={cx(styles.root__inner, styles.root__inner_1)}
            styleInner={{position: 'relative', width: '100%', height: '100%'}}
          > 
            <div className={styles.gradient} />
          </Parallax>
          <Parallax
            offsetYMax={'500px'}
            offsetYMin={'-500px'}
            slowerScrollRate
            className={cx(styles.root__inner, styles.root__inner_2)}
            styleInner={{position: 'relative', width: '100%', height: '100%'}}
          >
            <ParallaxMousemove containerStyle={{position: 'relative', width: '100%', height: '100%'}}>
              <ParallaxMousemove.Layer 
                layerStyle={{position: 'relative', width: '100%', height: '100%'}}
                config={{
                  xFactor: 0.05,
                  yFactor: 0.05,
                  springSettings: {
                    stiffness: 20,
                    damping: 20
                  }
                }}
              >
                <div className={styles.sky}>
                  <div className={styles.sky__inner} />
                </div>
              </ParallaxMousemove.Layer>
            </ParallaxMousemove>
          </Parallax>
          <Parallax
            offsetYMax={'250px'}
            offsetYMin={'-250px'}
            slowerScrollRate
            className={cx(styles.root__inner, styles.root__inner_3)}
            styleInner={{position: 'relative', width: '100%', height: '100%'}} 
          >
            <div className={cx(styles.hill, styles.hill_1)} />
          </Parallax>
          <div className={cx(styles.root__inner, styles.root__inner_4)}>
            <Container className={styles.pyramid}>            
              <Parallax
                offsetYMax={'180px'}
                offsetYMin={'-180px'}
                slowerScrollRate
                className={styles.pyramid__pyramid}
              >
                <div className={cx(styles.pyramid__inner, {[styles.pyramid__inner_active]: pyramidActive})}>
                  <div className={styles.smoke} style={{top: smoke.y, left: smoke.x}}>
                    <div className={cx(styles.smoke__light, styles.smoke__light_2)} />
                  </div>
                  <For each='item' index='i' of={tracks}>
                    <div key={i} className={cx(styles.track)} style={{top: item.y, left: item.x}}>
                      <div className={cx(styles.smoke__light, styles.smoke__light_2)} />
                    </div>
                  </For>
                  <img className={styles.pyramid__img} src={`${Settings.assetHost}/ico/main/ghost-pyramid-test-5.png`} />
                </div>
              </Parallax>
            </Container>      
          </div>
          <Parallax
            offsetYMax={'120px'}
            offsetYMin={'-120px'}
            slowerScrollRate
            className={cx(styles.root__inner, styles.root__inner_5)}
            styleInner={{position: 'relative', width: '100%', height: '100%'}} 
          >
            <div className={cx(styles.hill, styles.hill_2)} />
          </Parallax>
          <div className={cx(styles.root__inner, styles.root__inner_6)} />
          <div className={cx(styles.root__inner, styles.root__inner_7)} />
          <div className={cx(styles.root__inner, styles.root__inner_8)} />
          <div className={cx(styles.root__inner, styles.root__inner_9)} />
          <Parallax 
            offsetYMax={'400px'}
            offsetYMin={'-400px'}
            className={cx(styles.root__inner, styles.root__inner_10)}
            styleInner={{position: 'relative', width: '100%', height: '100%'}} 
          >
            <div className={styles.currencies}>
              <Currency className={cx(styles.currency, styles.currency_1)} currency='bch' />
              <Currency className={cx(styles.currency, styles.currency_2)} currency='eur' />
              <Currency className={cx(styles.currency, styles.currency_3)} currency='zch' />
              <Currency className={cx(styles.currency, styles.currency_4)} currency='xrp' />
              <Currency className={cx(styles.currency, styles.currency_5)} currency='dash' />
              <Currency className={cx(styles.currency, styles.currency_6)} currency='ltc' />
              <Currency className={cx(styles.currency, styles.currency_7)} currency='rub' />
            </div>
          </Parallax>
        </div>
        <Header className={styles.header} />
        <Container className={styles.content}>
          <div className={styles.content__inner}>
            <div className={styles.links}>
              <a
                href={t('ico.resources.items.onepager.href')} 
                target='_blank'
                className={styles.links__link}
              >{t('ico.resources.items.onepager.title')}</a>
              <a
                href={t('ico.resources.items.whitepaper.href')} 
                target='_blank'
                className={styles.links__link}
              >{t('ico.resources.items.whitepaper.title')}</a>
            </div>
            <img 
              src={`${Settings.assetHost}/assets/white-logo.svg`} 
              className={styles.bigLogo} 
              title={t('ico.common.company')} 
            />
            <div 
              className={styles.description} 
              dangerouslySetInnerHTML={{__html: t('ico.main.description')}} 
            />
            <div className={styles.content__controls}>
              <Button 
                href={t('ico.common.buy_tokens.href')} 
                target='_blank' 
                className={cx(styles.content__control, styles.content__buy)} 
                kind='icoCircled'
              >{t('ico.common.buy_tokens.title')}</Button>
              <Link route='/'>
                <a className={cx(styles.content__control, styles.content__control_a)}>{t('ico.main.to_marketplace')}</a>
              </Link>
            </div>
          </div>              
          <Parallax
            offsetYMax={'180px'}
            offsetYMin={'-180px'}
            slowerScrollRate
            className={styles.content__pyramid} 
          >
            <div 
              className={styles.content__pyramidCover}
              onMouseMove={this.onPyramidMouseMove}
              onMouseLeave={this.onPyramidMouseLeave}
            />
          </Parallax>
        </Container>
        <SaleIndicator className={styles.saleIndicator} />
      </Section>
    )
  }

  openMenu = () => {
    if (window.document.body) window.document.body.classList.add('overflow-hidden__icoMenu');
    this.setState({menuIsOpen: true});
  }

  closeMenu = () => {
    if (window.document.body) window.document.body.classList.remove('overflow-hidden__icoMenu');
    this.setState({menuIsOpen: false});
  }  

  onPyramidMouseMove = (e) => {
    const {tracks: {items}} = this.state;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    let active = false;

    if ((y >= (-2.546 * x + 377)) && (y >= (2.529 * x - 394.371)) && y <= 377 && y >= 0) {  
      active = true;

      this.setState({smoke: {x: x, y: y}, pyramidActive: active});
      if (!this.state.pyramidActive) this.timer = setInterval(() => this.trackAnimation(), 20);
    } else {
      this.setState({pyramidActive: false});
      clearInterval(this.timer);
    }
  }

  onPyramidMouseLeave = () => {
    this.setState({pyramidActive: false});
    clearInterval(this.timer);
  }

  trackAnimation = () => {
    let {smoke, tracks} = this.state;
    let {x, y} = smoke;

    tracks.forEach((item, i) => {
      let next = tracks[i + 1] || tracks[0];

      tracks[i] = {x, y};
      x += (next.x - x) * .9;
      y += (next.y - y) * .9;
    });
    
    this.setState({tracks: tracks});
  }
}

export default Main;
