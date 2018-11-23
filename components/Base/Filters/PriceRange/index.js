import React, {Component} from 'react';
import cx from 'classnames';
import CheckboxesList from 'components/Base/CheckboxesList';
import RangeSlider from 'components/Base/RangeSlider';
import Collapse from 'components/Base/Filters/Collapse';
import {Wrapper} from 'utils/utils';
import {observe} from 'mobx';
import {currencyRatio} from 'stores/fields/content.js';
import {coins} from 'utils/const';
import { inject, observer } from 'mobx-react';

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
    const {styles, priceField, coinField, forcedOpen, uncontrolled, locales: {t}} = this.props;
    const priceRangeActive = coinField.value.length === 1;
    const coinValues = coinField.value_keys.map(coin => {
      return {
        value: coin,
        title: coins[coin]
      }
    });

    return (
      <Wrapper>
        <Collapse
          key={coinField.slug}
          className={styles.collapse}
          title={coinField.label}
          defaultOpen={coinField.opened}
          forcedOpen={forcedOpen}
          listValues={coinField.value}
          numberValues={priceField.value}
          type={'price'}
        >
          <CheckboxesList
            className={styles.list}
            defaultCount={3}
            list={coinValues}
            value={coinField.value}
            onChange={this.changeCoinsHanlder}
          />
        </Collapse>
        <Collapse
          key={priceField.slug}
          className={cx(styles.collapse, styles.collapse_price)}
          title={t('controls.price')}
          defaultOpen={priceField.opened}
          collapsed={!priceRangeActive}
          collapsedMessage={t('controls.oneCurr')}
          uncontrolled={uncontrolled}
          forcedOpen={forcedOpen}
        >
          <RangeSlider
            disabled={!priceRangeActive}
            className={styles.rangeSlider}
            title={t('controls.price')}
            min={priceField.min}
            max={priceField.max}
            step={currencyRatio[coinField.value[0]] ? currencyRatio[coinField.value[0]].step : null}
            value={priceField.value}
            onChange={this.changePricesHandler}
          />
        </Collapse>
      </Wrapper>
    )
  }

  changeCoinsHanlder = (coins) => {
    const {coinField} = this.props;
    coinField.applyChanges({value: coins});
  }

  changePricesHandler = (values) => {
    const {priceField} = this.props;
    priceField.applyChanges({value: {min: values[0], max: values[1]}})
  }
}
PriceRange.displayName = 'Base/PriceRange';
export default PriceRange;
