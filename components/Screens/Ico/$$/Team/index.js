import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import Settings from 'config';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import H2 from '../Base/H2';
import Currency from '../Base/Currency';
import {Container, Row, Col} from 'components/Base/Grid';
import Button from 'components/Base/Button';
import Popup from 'components/Modules/Popup';

@inject('locales')
@observer
class Team extends Component {
  center = {cx: 525, cy: 525};
  big = {r: 450};
  medium = {r: 225};
  small = {r: 37}

  state = {
    hoverPerson: false,
    complete: false,
    careerIsOpen: false,
    advisorIsOpen: false
  }

  componentDidMount() {
    setTimeout(() => this.setState({complete: true}), 10);
  }
  
  render () {
    const {hoverPerson, complete, careerIsOpen, advisorIsOpen} = this.state;
    const {className, locales: {t}} = this.props;
    const managementObject = t(`ico.team.management`, {returnObjects: true});
    const developersObject = t(`ico.team.developers`, {returnObjects: true});
    const management = Object.keys(managementObject).map(key => { return {key: key, value: managementObject[key]}});
    const developers = Object.keys(developersObject).map(key => { return {key: key, value: developersObject[key]}});

    return (
      <Container id='team' className={cx(styles.root, className)}>
        <H2 className={styles.title}>{t(`ico.team.title`)}</H2>
        <div className={styles.undercover}>
          <Currency currency='xrp' className={cx(styles.currency, styles.currency_3)} />
          <svg className={cx(styles.circles, {[styles.circles_active]: complete})} viewBox='0 0 1050 1100' xmlns='http://www.w3.org/2000/svg'>
            <path 
              id='team-circle-1'
              fill='transparent'
              d={`M${this.center.cx - this.big.r},${this.center.cy}a${this.big.r},${this.big.r} 0 1,0 ${this.big.r * 2},0a${this.big.r},${this.big.r} 0 1,0 -${this.big.r * 2},0`} 
            />
            <path 
              id='team-circle-2'
              fill='transparent'
              d={`M${this.center.cx - this.medium.r},${this.center.cy}a${this.medium.r},${this.medium.r} 0 1,0 ${this.medium.r * 2},0a${this.medium.r},${this.medium.r} 0 1,0 -${this.medium.r * 2},0`} 
            />
            {management.map((item, i) => {
                let position = i / management.length + 0.72;
                if (position > 1) position = position - 1;

                return (
                  <g 
                    key={i}
                    className={cx(styles.person, styles.manager)}
                    onClick={item.value.title ? (item.value.href ? () => this.goTo(item.value.href): null) : this.openCareer}
                  >
                    <animateMotion    
                      begin='0s'
                      keyTimes={'0;1'}
                      keyPoints={`${position};${position}`}
                      calcMode={'linear'}
                    >
                      <mpath xlinkHref={`#team-circle-2`} />
                    </animateMotion>
                    <circle
                      r={71} 
                      fill={`url(${(item.value.title && item.value.image) ? `#manager-${item.key}__image` : `#manager-soon__image`})`}
                    />
                    <circle
                      r={71} 
                      className={styles.cover}
                      fill='url(#cover-hover)'
                    />
                    <Choose>
                      <When condition={item.value.title}>
                        <image className={styles.cover} width='21' height='20' transform='translate(-10 -10)' xlinkHref={`${Settings.assetHost}/ico/team/linkedin.svg`} />
                      </When>
                      <Otherwise>
                        <text textAnchor='middle' y={5} className={cx(styles.join, styles.cover)}>{t(`ico.team.join`)}</text>
                      </Otherwise>
                    </Choose>
                    <text 
                      y={105} 
                      textAnchor='middle' 
                      className={styles.manager__title}
                    >{item.value.title || t(`ico.team.soon`)}</text>
                    <text 
                      y={130} 
                      textAnchor='middle' 
                      className={styles.manager__role}
                    >{item.value.role}</text>
                  </g>
                )
              })} 
            {developers.map((item, i) => {
              let position = i / developers.length + 0.73;
              if (position > 1) position = position - 1;

              return (
                <g 
                  key={i}
                  className={cx(styles.person, styles.developer)}
                  onClick={item.value.title ? (item.value.href ? () => this.goTo(item.value.href): null) : this.openCareer}
                >
                  <animateMotion    
                    begin='0s'
                    keyTimes={'0;1'}
                    keyPoints={`${position};${position}`}
                    calcMode={'linear'}
                  >
                      <mpath xlinkHref={`#team-circle-1`} />
                    </animateMotion>
                    <circle
                      r={50} 
                      fill={`url(${(item.value.title && item.value.image) ? `#developer-${item.key}__image` : `#developer-soon__image`})`}
                    />
                    <circle
                      r={50} 
                      className={styles.cover}
                      fill='url(#cover-hover)'
                    />
                    <Choose>
                      <When condition={item.value.title}>
                        <image className={styles.cover} width='21' height='20' transform='translate(-10 -10)' xlinkHref={`${Settings.assetHost}/ico/team/linkedin.svg`} />
                      </When>
                      <Otherwise>
                        <text textAnchor='middle' y={5} className={cx(styles.join_sm, styles.cover)}>{t(`ico.team.join`)}</text>
                      </Otherwise>
                    </Choose>
                    <text 
                      y={85} 
                      textAnchor='middle' 
                      className={styles.developer__title}
                    >{item.value.title || t(`ico.team.soon`)}</text>
                    <text 
                      y={110} 
                      textAnchor='middle' 
                      className={styles.developer__role}
                    >{item.value.role}</text>
                  </g>
                )
              }
            )}                 
            <defs>
              <For each='item' index='i' of={management.filter(item => item.value.image)}>
                <pattern key={i} id={`manager-${item.key}__image`} x='0' y='0' patternUnits='objectBoundingBox' width='1' height='1'>
                  <image xlinkHref={`${Settings.assetHost}/${item.value.image}`} x='0' y='0' width='142' height='142' />
                </pattern>
              </For>
              <For each='item' index='i' of={developers.filter(item => item.value.image)}>
                <pattern key={i} id={`developer-${item.key}__image`} x='0' y='0' patternUnits='objectBoundingBox' width='1' height='1'>
                  <image xlinkHref={`${Settings.assetHost}/${item.value.image}`} x='0' y='0' width='100' height='100' />
                </pattern>
              </For>
              <pattern id='manager-soon__image' x='0' y='0' patternUnits='objectBoundingBox' width='1' height='1'>
                <image xlinkHref={`${Settings.assetHost}/ico/team/soon.png`} x='0' y='0' width='142' height='142' />
              </pattern>
              <pattern id='developer-soon__image' x='0' y='0' patternUnits='objectBoundingBox' width='1' height='1'>
                <image xlinkHref={`${Settings.assetHost}/ico/team/soon.png`} x='0' y='0' width='100' height='100' />
              </pattern>
              <linearGradient id='cover-hover' x1='-155.811' y1='10.444' x2='-155.811' y2='464.863' gradientUnits='userSpaceOnUse'>
                <stop stopColor='rgba(141,0,255,.701)' />
                <stop offset='1' stopColor='rgba(243,125,203,.701)' />
              </linearGradient>       
            </defs>
          </svg>
          <Currency currency='bch' className={cx(styles.currency, styles.currency_2)} />
        </div>
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
        <Currency currency='ltc' className={cx(styles.currency, styles.currency_1)} />
        <Popup isOpen={careerIsOpen} onClose={this.closeCareer} color='icoPink'>
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
        <Popup isOpen={advisorIsOpen} onClose={this.closeAdvisor} color='icoPink'>
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
      </Container>
    )
  }

  goTo = (href) => window.open(href, '_blank');

  openCareer = () => this.setState({careerIsOpen: true});
  
  closeCareer = () => this.setState({careerIsOpen: false});

  openAdvisor = () => this.setState({advisorIsOpen: true});
  
  closeAdvisor = () => this.setState({advisorIsOpen: false});
}

export default Team;
