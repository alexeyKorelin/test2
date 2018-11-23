import React, {Component} from 'react';
import Button from 'components/Base/Button';
import PriceRange from 'components/Base/Mobile/Filters/PriceRange';
import SwitchFields from 'components/Base/Mobile/Filters/SwitchFields';
import RangeField from 'components/Base/Mobile/Filters/RangeField';
import ListField from 'components/Base/Mobile/Filters/ListField';
import styles from './index.sass';
import {inject, observer} from 'mobx-react'

@inject('locales')
@observer
class Filters extends Component {

  onApplyFilter = () => {
    const {store, onClose} = this.props;
    store.applyFilter();
    onClose();
  }

  onResetFilter = () => {
    const {store, onClose} = this.props;
    store.resetFilter();
    onClose();
  }

  render() {
    const {store, onClose, locales: {t}} = this.props;
    const {fields} = store;
    const coinField = fields[0];
    const priceField = fields[1];
    const filters = [
      <PriceRange
        key='priceRange'
        priceField={priceField}
        coinField={coinField}
        styles={styles}
        onClose={onClose}
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
          onClose={onClose}
        />
      );
    }

    if (rangeFields.length) {
      filters.push(
        rangeFields.map(field => <RangeField key={field.slug} field={field} styles={styles} onClose={onClose}/>)
      )
    }

    if (listFields.length) {
      filters.push(
        listFields.map(field => <ListField key={field.slug} field={field} styles={styles} onClose={onClose}/>)
      )
    }

    return (
      <div className={styles.root}>
        <h2 className={styles.h2}>{t('filters.settings')}</h2>
        {filters}
        <div className={styles.controls}>
          <Button
            color={'transparent'}
            onClick={this.onApplyFilter}
            disabled={!store.touched}
            className={styles.apply}
          >{t('filters.apply')}</Button>
          <If condition={store.applied}>
            <br />
            <Button
              className={styles.controls_reset}
              kind={'link'}
              onClick={this.onResetFilter}
            >{t('filters.clear')}</Button>
          </If>
        </div>
      </div>
    )
  }
};

Filters.displayName = 'Modules/Mobile/Filters';

export default Filters;
