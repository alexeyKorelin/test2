import { Component } from 'react'
import cx from 'classnames';
import styles from './index.sass';
import Settings from 'config';
import IconNew from 'components/Base/IconNew'
import { inject, observer } from 'mobx-react'
import {Router, Link} from 'routes';

@inject('locales')
@inject('searchAdverts')
@inject('device')
@observer
class SearchIsEmpty extends Component {
  state = {
    searchedQuery: this.props.searchAdverts.adverts_store.query
  }

  onSearchSubmit = (e) => {
    e.preventDefault();
    const query = this.state.searchedQuery.trim().toLowerCase();
    const {searchAdverts: {adverts_store}} = this.props;
    
    if (query.length) {
      this.setState({
        searchedQuery: query
      }, () => {
        adverts_store.setQuery(query);
        Router.pushRoute(`/search?query=${query}`);
      });
    }
  }

  onQueryChange = e => this.setState({ searchedQuery: e.target.value });

  render() {
    const { searchedQuery } = this.state
    const {
      locales: { t },
      searchAdverts: { adverts_store: { query }},
      device: { isMobileDevice },
      size,
      className,
      description
    } = this.props
    const rootSize = size ? size : 'default';

    return (
      <div className={cx(styles.root, className, {[styles[`root_${rootSize}`]]: rootSize})}>
        <div className={styles.description}>{description}</div>
        <If condition={isMobileDevice}>
          <form action='.' className={styles.inputContainer} onSubmit={this.onSearchSubmit}>
            <input
              className={styles.input}
              type='search'
              placeholder={ t('header.lookingFor') }
              value={searchedQuery}
              onChange={this.onQueryChange}
            />
            {searchedQuery && searchedQuery.trim().length ? (
              <IconNew
                i={'search'}
                onClick={this.onSearchSubmit}
                className={styles.inputButton}
                size={14}
              />
            ) : null}
          </form>
        </If>
        <img
          className={styles.catbox}
          src={`${Settings.assetHost}/assets/catbox.png`}
          title={description}
        />
      </div>
    )
  } 
};

SearchIsEmpty.displayName = 'Modules/SearchIsEmpty';

export default SearchIsEmpty;
