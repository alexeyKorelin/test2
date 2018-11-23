import React, {Component} from 'react';
import cx from 'classnames';
import {throttle} from 'lodash';
import Button from 'components/Base/Button';
import Toggle from 'components/Base/Toggle';
import PriceRange from 'components/Base/Filters/PriceRange';
import SwitchFields from 'components/Base/Filters/SwitchFields';
import RangeField from 'components/Base/Filters/RangeField';
import ListField from 'components/Base/Filters/ListField';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';

@inject('locales')
@observer
class Filters extends Component {
  _root = React.createRef ? React.createRef() : null;

  state = {
    fixedTop: false,
    absoluteBottom: false,
    left: null,
  }

  componentDidMount() {
    const {flow} = this.props;

    if (flow !== false) {
      window.addEventListener('scroll', this.onScroll);
      window.addEventListener('resize', this.onResize);

      this.updateFilterPosition();
      this.setState({lastScrollPos: window.scrollY});
    }
  }

  componentWillUnmount() {
    const {flow} = this.props;

    if (flow !== false) {
      window.removeEventListener('scroll', this.onScroll);
      window.removeEventListener('resize', this.onResize);
    }
  }

  render() {
    const {fixedTop, absoluteBottom, left} = this.state;
    const {store, flow, short, locales: {t}} = this.props;
    const shift = this.props.shift ? this.props.shift + 12 : 63;
    const {fields} = store;
    const coinField = fields[0];
    const priceField = fields[1];
    const filters = [
      <PriceRange
        key='priceRange'
        priceField={priceField}
        coinField={coinField}
        styles={styles}
        forcedOpen={short}
        uncontrolled={short}
      />
    ];
    const metaFields = fields.slice(2);
    const geoFields =  metaFields.filter(f => f.type == 'city' || f.type == 'address');
    const switchFields = metaFields.filter(f => f.type == 'checkbox');
    const listFields = metaFields.filter(f => f.type == 'list');
    const rangeFields = metaFields.filter(f => f.type == 'number' || f.type == 'floating');

    if (switchFields.length) {
      filters.push(
        <SwitchFields
          key='switchFields'
          fields={switchFields}
          styles={styles}
          forcedOpen={true}
        />
      );
    }

    if (rangeFields.length) {
      filters.push(
        rangeFields.map(field => <RangeField key={field.slug} field={field} styles={styles} forcedOpen={short} />)
      )
    }

    if (listFields.length) {
      filters.push(
        listFields.map(field => <ListField key={field.slug} field={field} styles={styles} forcedOpen={short} />)
      )
    }

    return (
      <div
        ref={this._root}
        className={cx(
          styles.root,
          {[styles.root_fixedTop]: fixedTop},
          {[styles.root_absoluteBottom]: absoluteBottom}
        )}
        style={{left: left, top: fixedTop ? shift : null}}
      >
        <div className={styles.filters}>{filters}</div>
        <div className={styles.controls}>
          <Button
            kind={'primary'}
            color={'transparent'}
            block={true}
            onClick={store.applyFilter}
            disabled={!store.touched}
          >{t('filters.apply')}</Button>
          <Toggle>
            <If condition={store.fieldsAreSet}>
              <Button
                className={cx(
                  styles.clear,
                  {[styles.clear_active]: store.fieldsAreSet}
                )}
                kind={'link'}
                onClick={store.resetFilter}
              >{t('filters.clear')}</Button>
            </If>
          </Toggle>
        </div>
      </div>
    )
  }

  onScroll = throttle(() => {
    this.updateFilterPosition();
  }, 10)

  onResize = throttle(() => {
    this.updateFilterPosition();
  }, 500)

  updateFilterPosition = () => {
    const rootNode = (this._root && this._root.current) || null;
    if (!rootNode) return;
    const parentNode = rootNode.parentNode;
    let fixedTop = false;
    let absoluteBottom = false;
    let left = null;
    const shift = this.props.shift ? this.props.shift + 12 : 63;

    if (
      (window.scrollY + shift) > parentNode.offsetTop &&
      (parentNode.offsetHeight - shift) > rootNode.offsetHeight
    ) {
      if (parentNode.getBoundingClientRect().bottom <= (rootNode.offsetHeight + shift)) {
        absoluteBottom = true;
      } else {
        fixedTop = true;
        left = parentNode.getBoundingClientRect().left + 10;
      }
    }

    this.setState({
      fixedTop: fixedTop,
      absoluteBottom: absoluteBottom,
      left: left
    })
  }
};

Filters.displayName = 'Modules/Filters';

export default Filters;
