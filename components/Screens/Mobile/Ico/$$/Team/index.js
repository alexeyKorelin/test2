import {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import {sortBy, throttle} from 'lodash';
import Settings from 'config';
import Container from '../Container';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import H2 from 'components/Screens/Ico/$$/Base/H2';
import Carousel from '../Carousel';
import Popup from 'components/Modules/Popup';
import Button from 'components/Base/Button';

@inject('locales')
@observer
class Team extends Component {  
  _root = React.createRef();

  state = {
    width: 0,
    active: 0,
    dragging: false,
    careerIsOpen: false,
    advisorIsOpen: false
  }

  slideWidth = 275;

  componentDidMount() {
    this.updateSlider();

    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  render () {
    const {width, active, careerIsOpen, advisorIsOpen} = this.state;
    const {className, locales: {t}} = this.props;
    const managementObject = t(`ico.team.management`, {returnObjects: true});
    const developersObject = t(`ico.team.developers`, {returnObjects: true});
    const management = this.getItems('management');
    const developers = this.getItems('developers');
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
      beforeChange: (current, next) => this.setState({active: next, dragging: true}),
      afterChange: () => this.setState({dragging: false})
    };
    const items = management.concat(developers);
    const visibleSlides = active + Math.ceil(width / this.slideWidth) - 2;

    return (
      <div ref={this._root} id='team' className={cx(styles.root, className)}>
        <Container> 
          <H2 size='sm'>{t('ico.team.title')}</H2>
        </Container>
        <Carousel settings={settings}>
          <For each='item' index='i' of={items}>
            <div 
              key={i} 
              className={cx(styles.item, {[styles.item_invisible]: i > visibleSlides || i < active})} 
              style={{width: this.slideWidth}}
            >
              <div className={styles.item__inner}>
                <img 
                  src={`${Settings.assetHost}/${item.image || 'ico/team/soon.png'}`} 
                  className={styles.item__image} 
                  alt={item.title || t('ico.team.soon')} 
                  title={item.title || t('ico.team.soon')} 
                />
                <div className={styles.item__title}>{item.title || t('ico.team.soon')}</div>
                <div className={styles.item__role}>{item.role}</div>
                <If condition={item.href}>
                  <a className={styles.item__link} href={item.href} target='_blank'>
                    <img src={`${Settings.assetHost}/ico/team/linkedin.svg`} />
                  </a>
                </If>
                <If condition={!item.title}>
                  <button className={styles.item__join} onClick={this.openCareer}>{t('ico.team.join')}</button>
                </If>
              </div>
            </div>
          </For>
        </Carousel>
        <div className={styles.advisors}>
          <h6 className={styles.advisors__title}>{t(`ico.team.advisors.title`)}</h6>
          <div className={styles.advisors__items}>
            <div className={styles.advisor}>
              <div 
                onClick={this.openAdvisor}
                className={styles.advisor__img}
                style={{backgroundImage: `url(${Settings.assetHost}/ico/team/soon.png)`}}  
              >
                <div className={styles.advisor__blur} />
                <div className={styles.advisor__cover}>
                  <div className={styles.advisor__join}>{t(`ico.team.join`)}</div>
                </div>
              </div>
              <div className={styles.advisor__title}>{t(`ico.team.soon`)}</div>
            </div>
            <div className={styles.advisor}>
              <div 
                onClick={this.openAdvisor}
                className={styles.advisor__img}
                style={{backgroundImage: `url(${Settings.assetHost}/ico/team/soon.png)`}}  
              >
                <div className={styles.advisor__blur} />
                <div className={styles.advisor__cover}>
                  <div className={styles.advisor__join}>{t(`ico.team.join`)}</div>
                </div>
              </div>
              <div className={styles.advisor__title}>{t(`ico.team.soon`)}</div>
            </div>
          </div>
          <div className={styles.advisors__controls}>
            <Button className={styles.advisors__stay} onClick={this.openAdvisor} kind='icoCircled' color='icoPinkReverse'>{t(`ico.team.advisors.stay`)}</Button>
          </div>
        </div>        
        <Popup isOpen={careerIsOpen} onClose={this.closeCareer} color='icoPink' size='sm'>
          <div className={styles.popup__header}>{t(`ico.team.popups.thanks`)}</div>
          <div 
            className={styles.popup__description} 
            dangerouslySetInnerHTML={{__html: t(`ico.team.popups.career.description`)}} 
          />
          <a 
            className={styles.popup__mail} 
            href={`mailto:${t('ico.team.popups.career.mail')}`}
          >{t('ico.team.popups.career.mail')}</a>
          <CopyToClipboard text={t('ico.team.popups.career.mail')}>
            <Button className={styles.popup__copy} kind='icoCircled' color='icoWhiteAlways'>{t('ico.team.popups.copy')}</Button>
          </CopyToClipboard>
        </Popup>
        <Popup isOpen={advisorIsOpen} onClose={this.closeAdvisor} color='icoPink' size='sm'>
          <div className={styles.popup__header}>{t(`ico.team.popups.thanks`)}</div>
          <div 
            className={styles.popup__description} 
            dangerouslySetInnerHTML={{__html: t(`ico.team.popups.advisor.description`)}} 
          />
          <a 
            className={styles.popup__mail} 
            href={`mailto:${t('ico.team.popups.advisor.mail')}`}
          >{t('ico.team.popups.advisor.mail')}</a>
          <CopyToClipboard text={t('ico.team.popups.advisor.mail')}>
            <Button className={styles.popup__copy} kind='icoCircled' color='icoWhiteAlways'>{t('ico.team.popups.copy')}</Button>
          </CopyToClipboard>
        </Popup>        
      </div>
    )
  }  

  getItems = (slug) => {
    const {locales: {t}} = this.props;
    const itemsObject = t(`ico.team.${slug}`, {returnObjects: true});
    const items = sortBy(Object.keys(itemsObject).map(key => { 
      let numberKey = key.replace('item', '');
      
      return {key: numberKey, ...itemsObject[key]}
    }), item => parseInt(item.key));  
    
    return items;
  }

  onResize = throttle(() => {
    this.updateSlider();
  }, 500);

  updateSlider = () => {
    const root = this._root.current;

    this.setState({width: root.offsetWidth});
  }

  openCareer = () => this.setState({careerIsOpen: true});
  
  closeCareer = () => this.setState({careerIsOpen: false});

  openAdvisor = () => this.setState({advisorIsOpen: true});
  
  closeAdvisor = () => this.setState({advisorIsOpen: false});
}

export default Team;
