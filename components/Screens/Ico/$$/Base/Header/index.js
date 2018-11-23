import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import Settings from 'config';
import {throttle} from 'lodash';
import {Container, Row, Col} from 'components/Base/Grid';
import {Link} from 'routes';
import ParallaxMousemove from 'react-parallax-mousemove';
import Section from '../Section';
import {scrollTo} from 'utils/utils';
import Documents from '../Documents';
import Dropdown from '../Dropdown';
import IconNew from 'components/Base/IconNew';
import Icon from 'components/Base/Icon';
import Toggle from 'components/Base/Toggle';
import Button from 'components/Base/Button';

@inject('locales')
@observer
class Main extends Component {
  _root = React.createRef();
  
  state = {
    fixed: false,
    menuIsOpen: false,
    langIsOpen: false
  }

  componentDidMount() {
    this.updateFixed();
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  render () {
    const {fixed, menuIsOpen, langIsOpen} = this.state;
    const {className, locales: {t, languages, locale}} = this.props;
    
    return (
      <header ref={this._root} className={cx(styles.root, className, {[styles.root_fixed]: fixed})}>
        <div className={styles.root__inner}>
          <div className={styles.content}>
            <button className={styles.burger} onClick={this.openMenu}>
              <IconNew i='menu' />
            </button>
            <Documents className={styles.documents} position='right' kind='dark' />
            <div className={styles.center}>
              <a 
                href={t('ico.resources.items.onepager.href')} 
                target='_blank' 
                className={styles.center__link}
              >{t('ico.resources.items.onepager.title')}</a>
              <img 
                className={styles.center__logo} 
                src={`${Settings.assetHost}/ico/header/quarter-logo.svg`} 
                alt={t('ico.common.company')} 
                title={t('ico.common.company')} 
              />
              <a 
                href={t('ico.resources.items.whitepaper.href')} 
                target='_blank' 
                className={styles.center__link}>{t('ico.resources.items.whitepaper.title')}</a>
            </div>
            <div className={styles.buy}>  
              <Button 
                href={t('ico.common.buy_tokens.href')}
                className={styles.buy__btn} 
                kind='icoCircled' 
                color='icoWhiteTransparent'
                target='_blank'
              >{t('ico.common.buy_tokens.title')}</Button>
            </div>
            <Dropdown 
              className={styles.languages} 
              label={
                <span className={styles.languages__current}>
                  <Icon icon={`flag-${locale}`} className={styles.languages__flag} />
                  <span className={styles.languages__label}>{t(`header.languages.${locale}.shortname`)}</span>
                </span>
              } 
              kind='dark' 
              position='right'
            >
              <ul className={styles.languages__ul}>
                <For each='language' of={languages.filter(language => language != locale)}>
                  <li key={language} className={styles.languages__li}>
                    <button className={styles.languages__btn} key={language} onClick={() => this.changeLanguage(language)}>
                      <Icon icon={`flag-${language}`} width={21} className={styles.languages__flag} />
                      <span className={styles.languages__label}>{t(`header.languages.${language}.shortname`)}</span>
                    </button>
                  </li>
                </For>
              </ul>
            </Dropdown>
          </div>
          <Toggle>
            <If condition={menuIsOpen}>
              <Section className={styles.menu}>
                <div className={cx(styles.menu__inner, styles.menu__inner_1)} />
                <div className={cx(styles.menu__inner, styles.menu__inner_2)}>
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
                      <div className={styles.stars} />
                    </ParallaxMousemove.Layer>
                  </ParallaxMousemove>
                </div>
                <div className={cx(styles.menu__inner, styles.menu__inner_3)} />
                <div className={cx(styles.menu__inner, styles.menu__inner_4)} />
                <div className={styles.menu__content}>
                  <Container className={styles.menu__container}>
                    <div className={styles.menu__top}>
                      <button className={styles.close} onClick={this.closeMenu}>
                        <IconNew i='close' />
                      </button>
                    </div>
                    <Row className={styles.menu__bottom}>
                      <Col size='1-5'>
                        <ul className={styles.menu__ul}>
                          <li className={styles.menu__li}>
                            <a 
                              href={'#investors'} 
                              onClick={() => this.scrollTo('investors')} 
                              className={styles.menu__link}
                            >{t('ico.investors.title')}</a>
                          </li>
                          <li className={styles.menu__li}>
                            <a 
                              href={'#about'} 
                              onClick={() => this.scrollTo('about')} 
                              className={styles.menu__link}
                            >{t('ico.about.title')}</a>
                          </li>
                          <li className={styles.menu__li}>
                            <a 
                              href={'#functionality'} 
                              onClick={() => this.scrollTo('functionality')} 
                              className={styles.menu__link}
                            >{t('ico.functionality.title')}</a>
                          </li>
                          <li className={styles.menu__li}>
                            <a 
                              href={'#roadmap'} 
                              onClick={() => this.scrollTo('roadmap')} 
                              className={styles.menu__link}
                            >{t('ico.roadmap.title')}</a>
                          </li>
                          <li className={styles.menu__li}>
                            <a 
                              href={'#market'} 
                              onClick={() => this.scrollTo('market')} 
                              className={styles.menu__link}
                            >{t('ico.market.title')}</a>
                          </li>
                          <li className={styles.menu__li}>
                            <a 
                              href={'#ico'} 
                              onClick={() => this.scrollTo('ico')} 
                              className={styles.menu__link}
                            >{t('ico.ico.title')}</a>
                          </li>
                          <li className={styles.menu__li}>
                            <a 
                              href={'#juris'} 
                              onClick={() => this.scrollTo('juris')} 
                              className={styles.menu__link}
                            >{t('ico.juris.title')}</a>
                          </li>
                          <li className={styles.menu__li}>
                            <a 
                              href={'#team'} 
                              onClick={() => this.scrollTo('team')} 
                              className={styles.menu__link}
                            >{t('ico.team.title')}</a>
                          </li>
                          <li className={styles.menu__li}>
                            <a 
                              href={'#faq'} 
                              onClick={() => this.scrollTo('faq')} 
                              className={styles.menu__link}
                            >{t('ico.faq.title')}</a>
                          </li>
                          {/* пока нет Прессы */}
                          {/*<li className={styles.menu__li}>
                            <a href='/' className={styles.menu__link}>{t('ico.press.title')}</a>
                          </li>*/}
                        </ul>
                      </Col>
                      <Col size='1-5'>
                        <ul className={styles.menu__ul}>
                          <li className={styles.menu__li}>
                            <a
                              target='_blank' 
                              href={t('ico.resources.items.whitepaper.href')}  
                              className={styles.menu__link}
                            >{t('ico.resources.items.whitepaper.title')}</a>
                          </li>
                          <li className={styles.menu__li}>
                            <a
                              target='_blank' 
                              href={t('ico.resources.items.onepager.href')}
                              className={styles.menu__link}
                            >{t('ico.resources.items.onepager.title')}</a>
                          </li>
                        </ul>
                      </Col>
                      <Col size='1-5'>
                        <ul className={styles.menu__ul}>
                          <li className={styles.menu__li}>
                            <Link route='/'> 
                              <a className={styles.menu__link}>{t('ico.common.to_marketplace')}</a>
                            </Link>
                          </li>
                        </ul>
                      </Col>
                      <Col className={styles.menu__controls} size='1-5'>
                        <Button 
                          className={styles.menu__buy} 
                          href={t('ico.common.buy_tokens.href')} 
                          kind='icoCircled' 
                          color='icoWhiteTransparent' 
                          target='_blank'>{t('ico.common.buy_tokens.title')}</Button>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </Section>
            </If>
          </Toggle>
        </div>
      </header>
    )
  }

  scrollTo = (to) => {
    scrollTo(to, false, -110);
    this.closeMenu();
  }

  openMenu = () => {
    if (window.document.body) window.document.body.classList.add('overflow-hidden__icoMenu');
    this.setState({menuIsOpen: true});
  }

  closeMenu = () => {
    if (window.document.body) window.document.body.classList.remove('overflow-hidden__icoMenu');
    this.setState({menuIsOpen: false});
  }  

  changeLanguage = (lang) => this.props.locales.changeLanguage(lang);

  onScroll = throttle(() => {
    this.updateFixed();
  }, 10)

  updateFixed = () => {
    const rootNode = this._root.current;
    const {fixed} = this.state;

    (rootNode.getBoundingClientRect().top < 0) ? (!fixed && this.setState({fixed: true})) : this.setState({fixed: false});    
  }  
}

export default Main;
