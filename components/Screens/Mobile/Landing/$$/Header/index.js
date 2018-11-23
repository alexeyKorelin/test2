import React, {Component} from 'react';
import Icon from 'components/Base/Icon';
import IconNew from 'components/Base/IconNew';
import styles from './index.sass';
import {Link} from 'routes';
import cx from 'classnames';
import Button from 'components/Base/Button';
import Sidebar from 'components/Modules/Mobile/Sidebar';
import {Wrapper, scrollTo} from 'utils/utils';
import { inject, observer } from 'mobx-react';
import AnimatedClose from 'components/Modules/AnimatedClose';

@inject('locales')
@observer
class Header extends Component {
  state = {
    menuIsOpened: false
  }

  render() {
    const {
      menuIsOpened
    } = this.state;
    const { locales } = this.props;
    const { t, locale, languages } = locales;

    return (
      <Wrapper>
        <header className={styles.header}>
          <AnimatedClose className={styles.animatedClose} onClick={this.onMenuOpen} active={menuIsOpened} />
        </header>

        <Sidebar
          from="left"
          onClose={this.onMenuClose}
          isOpened={menuIsOpened}
          className={styles.menuSidebar}
          closeClass={styles.close}
          innerClass={styles.menuSidebarInner}
          purpled
        >
          <nav>
            <li><a href="#about" onClick={() => this.linkHandle('about')}>{ t('landing.aboutString') }</a></li>
            <li><a href="#whom" onClick={() => this.linkHandle('whom')}>{ t('landing.whom') }</a></li>
            <li><a href="#how" onClick={() => this.linkHandle('how')}>{ t('landing.howWorks') }</a></li>
            <li><a href="#advantages" onClick={() => this.linkHandle('advantages')}>{ t('landing.advantagesString') }</a></li>
            <li><a href="#plans" onClick={() => this.linkHandle('plans')}>{ t('landing.plans') }</a></li>
            <div className={styles.go_area}>
              <div onClick={this.onMenuClose}>
                <Link href={'/main'}><a className={styles.go}>{ t('landing.goToSite') }</a></Link>
              </div>
            </div>
            <div className={styles.languageBlock}>
              <For each='language' of={ languages }>
                <div 
                  key={language} 
                  className={cx(styles.langButton, {[styles.langButtonActive]: locale === language})}
                  onClick={() => this.changeLanguage(language)}>
                  { t(`header.languages.${language}.shortname`) }
                </div>
              </For>
            </div>
          </nav>
        </Sidebar>
      </Wrapper>
    );
  }

  changeLanguage(lang) {
    this.props.locales.changeLanguage(lang)
  }

  onMenuOpen = () => this.setState({menuIsOpened: true});

  onMenuClose = () => this.setState({menuIsOpened: false});

  linkHandle = (id) => {
    this.onMenuClose();
    scrollTo(id);
  }
}

export default Header;
