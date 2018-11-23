import React, {Component} from 'react';
import Icon from 'components/Base/Icon';
import IconNew from 'components/Base/IconNew';
import styles from './index.sass';
import {Router, Link} from 'routes';
import cx from 'classnames';
import Button from 'components/Base/Button';
import Sidebar from 'components/Modules/Mobile/Sidebar';
import CreateAd from 'components/Modules/Header/$$/CreateAd';
import { inject, observer } from 'mobx-react';
import {Wrapper} from 'utils/utils';
import _sortBy from 'lodash/sortBy';
import * as S from './$$';
import AnimatedClose from 'components/Modules/AnimatedClose';

@inject('auth')
@inject('categories')
@inject('locales')
@inject('searchAdverts')
@observer
class Menu extends Component {

  state = {
    menuIsOpened: false,
    currentOpened: '',
    query: ''
  }

  render() {
    const {
      menuIsOpened,
      currentOpened,
      query
    } = this.state;
    const { locales } = this.props;
    const { t, locale, languages } = locales;
    const {categories} = this.props.categories;

    return (
      <Wrapper>
        <AnimatedClose className={styles.animatedClose} onClick={this.openMenu} reverse active={menuIsOpened} />

        <Sidebar
          from="left"
          onClose={this.closeMenu}
          isOpened={menuIsOpened}
          className={styles.menuSidebar}
          reverseOpenColor
          purpled
        >
          <nav>
            <li onClick={this.closeMenu}>
              <Link route="/main"><a>{ t('header.homepage') }</a></Link>
            </li>
            <li onClick={() => this.setCurrent('search')}>{ t('header.search') }</li>
            <li onClick={() => this.setCurrent('catalog')}>{ t('header.catalog') }</li>
            <li onClick={this.closeMenu}><Link route="/about"><a>{ t('header.about') }</a></Link></li>
            <li onClick={this.closeMenu}><a href="https://mentalmarket.zendesk.com/hc/ru" target="_blank">{ t('header.help') }</a></li>
            {/*   <li onClick={this.closeMenu}><Link route='/ico'><a>{ t('ico.ico.title') }</a></Link></li>  */}

            <div className={styles.ad} onClick={this.closeMenu}>
              <CreateAd className={styles.create} auth={this.props.auth} kind={'circled'} color={'white'} />
            </div>
          </nav>
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
          <div className={styles.logo_area}>
            <Icon icon="logo_square" className={styles.logo}/>
          </div>
        </Sidebar>

        <Sidebar
          from="left"
          onClose={this.closeMenu}
          onBack={this.closeCurrent}
          closeClass={styles.closeClass}
          isOpened={currentOpened == 'search'}
          className={styles.searchSidebar}
          saveOverflow={true}
        >
          <h2>{ t('header.search') }</h2>
          <form action="." className={styles.inputContainer} onSubmit={this.onSearchSubmit}>
            <IconNew
              i={'search'}
              className={styles.inputButton}
              size={14}
            />
            <input
              type="search"
              placeholder={ t('header.lookingFor') }
              value={query}
              onChange={this.onQueryChange}
            />
            {query.trim().length ? (
              <IconNew
                i={'close'}
                className={styles.inputCross}
                size={14}
                onClick={() => this.setState({ query: '' })}
              />
            ) : null}
          </form>
        </Sidebar>

        <S.Categories
          categories={categories}
          onClose={this.closeMenu}
          onBack={this.closeCurrent}
          isOpened={currentOpened == 'catalog'}
          saveOverflow={true}
        />
      </Wrapper>
    );
  }

  changeLanguage(lang) {
    this.props.locales.changeLanguage(lang)
  }

  openMenu = () => {
    this.setState({menuIsOpened: true});
  }

  closeMenu = () => this.setState({menuIsOpened: false, currentOpened: false});

  setCurrent = (slug) => {
    this.setState({currentOpened: slug});
  }

  closeCurrent = () => this.setState({currentOpened: false});

  onQueryChange = e => this.setState({ query: e.target.value });

  onSearchSubmit = (e) => {
    e.preventDefault()
    const query = this.state.query.trim().toLowerCase();
    const {searchAdverts: {adverts_store}} = this.props;
    if (query.length) {
      this.setState({
        menuIsOpened: false,
        currentOpened: false,
        query: ''
      }, () => {
        adverts_store.setQuery(query);
        Router.pushRoute(`/search?query=${query}`);
      });
    }
  }

}

export default Menu;
