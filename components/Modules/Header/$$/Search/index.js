import React, {Component} from 'react';
import cx from 'classnames';
import IconNew from 'components/Base/IconNew';
import Button from 'components/Base/Button';
import styles from './index.sass';
import config from 'config';
import {debounce} from 'lodash';
import {Router, Link} from 'routes';
import {parse} from 'query-string';
import API from 'utils/api';
import { inject, observer } from 'mobx-react';

@inject('searchAdverts')
@inject('locales')
@observer

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      focusIndex: null,
      items: [],
      loaded: false,
      query: '',
      focusedInput: false
    }

    this.activateSearch = this.activateSearch.bind(this)
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.onSearchRequest = debounce(this.onSearchRequest, 300);
    this.showAll = this.showAll.bind(this);
    this.resetQuery = this.resetQuery.bind(this);
  }


  render() {
    const {items, isActive, focusIndex, query, loaded, focusedInput} = this.state;
    const {className, locales: { t }} = this.props;
    const translation = {
      lookingFor: t('header.lookingFor'),
      search: t('header.search'),
      showAll: t('header.showAll'),
      nothingFound: t('header.nothingFound')
    }
    return (
      <div
        ref={this.setWrapperRef}
        className={cx(styles.root, className, {[styles.root_active]: query.length})}
      >
        <input
          className={styles.input}
          type="text"
          placeholder={this.state.isActive ? translation.lookingFor : translation.search}
          onChange={this.onQueryChange}
          onFocus={this.focusInput}
          value={query}
          onClick={this.activateSearch}
        />
        <Button className={styles.button} color={'gradient'} onClick={this.onSubmit}>
          <IconNew className={styles.searchIcon} i={'search'} />
        </Button>
        {focusedInput && query && query.length && items.length ? (
          <div className={styles.dropdown}>
            {items.map((item, index) => (
              <Link route={`/${item.category_slug}/${item.subcategory_slug}/ad/${item.uid}`} key={item.uid}>
                <a
                  className={cx(styles.dropdownItem, {[styles.focus]: index === focusIndex})}
                  onMouseEnter={() => this.onItemHover(index)}
                >{item.name}<span>{item.category_name}</span></a>
              </Link>
            ))}
            {items.length && items.length > 5 ? (
              <Link route={`/search?query=${query}`} key={'all'}>
                <a
                  className={cx(styles.dropdownItem, styles.showAll, {[styles.focus]: focusIndex === items.length})}
                  onMouseEnter={() => this.onItemHover()} onClick={this.showAll}
                >{ translation.showAll }</a>
              </Link>
            ) : null}

          </div>
        ) : null}
        {focusedInput && loaded && items.length == 0 && query.length ? (
          <div className={styles.dropdown}>
            <a disabled
              className={cx(styles.dropdownItem, styles.showAll, styles.focus)}
            >{ translation.nothingFound }</a>
          </div>
        ) : null}
    </div>
    )
  }

  focusInput = () => {
    const { query } = this.state
    this.setState({ focusedInput: true })
    if (query) {
      this.onSearchRequest(query)
    }
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    window.addEventListener('keydown', this.handleKeyDown);
    // lets update the searching query if it's possible
    const { searchAdverts: { adverts_store: { query }}} = this.props
    if (query) this.setState({ query })
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  activateSearch = () => {
    !this.state.isActive && this.setState({isActive: true});
  }

  handleClickOutside = (e) => {
    if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      this.setState({isActive: false, focusedInput: false});
    }
  }

  resetQuery = () => {
    this.setState({
      query: '',
      isActive: false,
      focusIndex: null,
      items: []
    });
  }

  showAll = () => {
    const {query} = this.state;
    const {searchAdverts: {adverts_store}} = this.props;
    // this.resetQuery();
    Router.pushRoute(`/search?query=${query}`);
    adverts_store.setQuery(query);
    adverts_store.fetch();
  }

  onQueryChange = ev => {
    const query = (ev && ev.target ? ev.target.value : '');
    this.setState({query, loaded: false});
    if (query.length) {
      this.onSearchRequest(query)
    } else {
      this.setState({ items: [], focusIndex: null });
    }
  }

  onSearchRequest = query => {
    API.adverts.search({query})
      .then(response => {
        const res = response.data;
        if (res && Array.isArray(res)) {
          this.setState({ items: res, focusIndex: null, loaded: true });
        } else {
          this.setState({ items: [], focusIndex: null, loaded: true });
        }
      })
      .catch(err => {
        this.setState({ items: [] });
        throw new Error('Error while request search results');
      });
  }

  onItemHover = focusIndex => this.setState({ focusIndex: focusIndex !== undefined ? focusIndex : this.state.items.length });

  handleKeyDown = ev => {
    if (!this.state.isActive) return;
    const key = ev.keyCode;
    const {items, focusIndex, query} = this.state;
    if (key === 13 && focusIndex === null) {
      this.onSubmit();
      return;
    }
    if (![38, 40, 13].includes(key) || !items.length) return;
    ev.preventDefault();
    let newFocusIndex;
    switch(key) {
      case 40: // down
        if (focusIndex === null) {
          newFocusIndex = 0;
        } else if (focusIndex === items.length) {
          newFocusIndex = 0;
        } else {
          newFocusIndex = focusIndex + 1;
        }
        this.setState({ focusIndex: newFocusIndex });
        break;
      case 38: // up
        if (focusIndex === null || focusIndex === 0) {
          newFocusIndex = items.length;
        } else {
          newFocusIndex = focusIndex - 1;
        }
        this.setState({ focusIndex: newFocusIndex });
        break;
      case 13: { // enter
        const item = items[focusIndex];
        if (item) {
          const {category_slug, subcategory_slug, uid} = item;
          this.resetQuery();
          Router.pushRoute(`/${category_slug}/${subcategory_slug}/ad/${uid}`);
        } else {
          this.showAll();
        };
      }
    }
  }

  onSubmit = () => {
    const {query} = this.state;
    if (query.trim().length) {
      this.setState({isActive: false});
      this.showAll();
    }
  }
}

Search.displayName = 'Modules/Search';

export default Search;
