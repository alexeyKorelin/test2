import React, {Component} from 'react';
import CheckboxesList from 'components/Base/Mobile/CheckboxesList';
import RangeSlider from 'components/Base/RangeSlider';
import {inject, observer} from 'mobx-react';
import {observe} from 'mobx';
import Collapse from 'components/Base/Mobile/Filters/Collapse';
import {currencyRatio} from 'stores/fields/content.js';
import {coins} from 'utils/const';
import cx from 'classnames';

@inject('locales')
@observer
class PriceRange extends Component {
  constructor (props) {
    super(props);
    observe(this.props.coinField, 'value', this.setMax);
  }

  setMax = () => {
    const {coinField, priceField} = this.props;
    if (coinField.value.length === 1) {
      priceField.applyChanges({
        max: currencyRatio[coinField.value[0]].max,
        step: currencyRatio[coinField.value[0]].step,
        value: {min: priceField.min, max: currencyRatio[coinField.value[0]].max}
      })
    }
  }

  render () {
    const {styles, priceField, coinField, onClose, locales: {t}} = this.props;
    const priceRangeActive = coinField.value.length === 1;
    const coinValues = coinField.value_keys.map(coin => {
      return {
        value: coin,
        title: coins[coin]
      }
    });

    return (
      <Collapse 
        title={t('controls.currAndPrice')}
        onClose={onClose}
        className={styles.collapse}
        listValues={coinField.value}
        numberValues={priceField.value}
        type={'price'}
        external
      >
        <CheckboxesList
          className={styles.list}
          list={coinValues}
          value={coinField.value}
          onChange={this.changeCoinsHandler}
          size={'sm'}
        />
        <div className={styles.help} dangerouslySetInnerHTML={{__html: t('controls.oneCurrExt')}} />
        <div className={cx(
          styles.rangeSlider,
          {[styles.rangeSlider_open]: priceRangeActive}
        )}>
          <RangeSlider
            disabled={!priceRangeActive}
            title={'Цена'}
            min={priceField.min}
            max={priceField.max}
            step={currencyRatio[coinField.value[0]] ? currencyRatio[coinField.value[0]].step : null}
            value={priceField.value}
            onChange={this.changePricesHandler}
            size={'sm'}
          />
        </div>
      </Collapse>
    )
  }

  changeCoinsHandler = (coins) => {
    const {coinField} = this.props;
    coinField.applyChanges({value: coins});
  }

  changePricesHandler = (values) => {
    const {priceField} = this.props;
    priceField.applyChanges({value: {min: values[0], max: values[1]}})
  }
}
PriceRange.displayName = 'Base/Mobile/Filters/PriceRange';
export default PriceRange;