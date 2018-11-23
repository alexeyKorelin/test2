import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import Settings from 'config';
import Container from '../Container';
import {Link} from 'routes';
import SaleIndicator from '../SaleIndicator';
import IconNew from 'components/Base/IconNew';
import Toggle from 'components/Base/Toggle';
import Button from 'components/Base/Button';

@inject('locales')
@observer
class Main extends Component {
  state = {
    menuIsOpen: false
  }

  render () {
    const {menuIsOpen} = this.state;
    const {className, locales: {t}} = this.props;
    
    return (
      <div className={cx(styles.root, className)}>
        <div className={styles.root__undercover}>
          <div className={cx(styles.root__inner, styles.root__inner_1)}>
            <div className={styles.gradient} />
            <div className={styles.sky}>
              <div className={styles.sky__inner} />
            </div>
          </div>
          <div className={cx(styles.root__inner, styles.root__inner_2)} />
          <div className={cx(styles.root__inner, styles.root__inner_3)}>
            <Container>
              <img className={styles.pyramid} src={`${Settings.assetHost}/ico/main/pyramid-sm.png`} />
            </Container>
          </div>
          <div className={cx(styles.root__inner, styles.root__inner_4)} />
          <div className={cx(styles.root__inner, styles.root__inner_5)} />
          <div className={cx(styles.root__inner, styles.root__inner_6)} />
          <div className={cx(styles.root__inner, styles.root__inner_7)} />
        </div>
        <Container className={styles.content}>
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
            >{t('ico.common.buy_tokens.title')}</Button><br />
            <Link route='/'>
              <a className={cx(styles.content__control, styles.content__control_a)}>{t('ico.main.to_marketplace')}</a>
            </Link>
          </div>
        </Container>
        <SaleIndicator className={styles.saleIndicator} />
      </div>
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
}

export default Main;
