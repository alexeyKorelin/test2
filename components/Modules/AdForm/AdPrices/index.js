import React, {Component} from 'react';
import cx from 'classnames';
import { Row, Col } from 'components/Base/Grid';
import CurrencySelect from 'components/Modules/AdForm/$$/form/CurrencySelect';
import NumberInput from 'components/Modules/AdForm/$$/form/NumberInput';
import Currencies from 'components/Modules/AdForm/$$/form/Currencies';
import Button from 'components/Base/Button';
import Checkbox from 'components/Base/Checkbox';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import {observe} from 'mobx';
import API from 'utils/api';
import IconNew from 'components/Base/IconNew';
import Settings from 'config';
import ym from 'react-yandex-metrika';

@inject('device')
@observer
class PriceForm extends Component {
  constructor (props) {
    super(props);
    this.form = props.form;
    observe(this.form.$('coin'), '$value', (change) => {
      this.calculateFiatPrice();
      this.addToCoins(change.oldValue, change.newValue);
    })
    observe(this.form.$('fiat'), '$value', this.calculateCoinPrice);
  }

  calculateCoinPrice = () => {
    const {form} = this;
    const coin = form.$('coin').value;
    const price = parseFloat(form.$('price').value);
    const fiat = form.$('fiat').value;
    const coin_price = form.$('coin_price');
    if (coin && fiat && price) {
      API.prices.index({price, fiat, coin})
        .then(res => {
          coin_price.set(parseFloat(res.value.toFixed(3)));
        })
    }
  }

  calculateFiatPrice = () => {
    const {form} = this;
    const coin = form.$('coin').value;
    const coin_price = parseFloat(form.$('coin_price').value);
    const fiat = form.$('fiat').value;
    const price = form.$('price');
    if (coin_price && fiat && coin) {
      API.prices.index({coin_price, fiat, coin})
        .then(res => {
          price.set(parseFloat(res.value.toFixed(3)));
        })
    }
  }

  addToCoins = (oldValue, newValue) => {
    const {form} = this;
    const coinsField = form.$('coins');
    if (!coinsField.value.includes(newValue)) {
      const index = coinsField.value.indexOf(oldValue);
      coinsField.value.splice(index, 1)
      coinsField.set(coinsField.value.concat(newValue));
    }
  }

  changePriceHandler = (e) => {
    let {name, value} = e.target;
    const {form} = this;
    if (name == 'price' || name == 'coin_price') {
      if (value < 0) return;
      value = parseFloat(value);
    }
    if (name == 'price' || name == 'fiat') {
      form.$('price').set(parseFloat(value))
      this.calculateCoinPrice();
    } else if (name == 'coin_price') {
      form.$('coin_price').set(parseFloat(value))
      this.calculateFiatPrice();
    }
  }

  submit = () => {
    const {form} = this;
    const {submit} = this.props;
    form.validate({showErrors: true});
    if (form.isValid) {
      submit();
      if (Settings.stage == 'production') {
        ym('reachGoal', 'CreateAD');
      }
    } else {
      console.log(form.errors())
    }
  }

  render () {
    const { form } = this;
    const { saved, t, device: { isMobileDevice, size } } = this.props;
    const isMob = isMobileDevice
    const columnsSettings = {
      'mobile': 6,
      'tablet': 4,
      'desktop': 2
    }
    const columns = columnsSettings[size]

    return (
      <div className={styles.form}>
        <div className={cx(styles.form__top, isMob ? styles.form__top_mobile : '')}>
          <Row>
            <Col size={columns}>
              <NumberInput field={form.$('coin_price')} label={t('createAd.fields.coin')} onChange={this.changePriceHandler} />
            </Col>
            <div className={styles.currencyContainer}>
              <CurrencySelect field={form.$('coin')} className={styles.currencyContainer} />
            </div>
            <IconNew className={cx(styles.icon_separator, size === 'mobile' ? styles.icon_separator_mobile : null)} i={'double_arrows'} size={16} />
            <Col size={columns}>
              <NumberInput
                field={form.$('price')}
                label={t('createAd.fields.fiat')}
                onChange={this.changePriceHandler}
                className={cx({[styles.disabled]: !form.$('indexing').value})}
                disabled={!form.$('indexing').value}
              />
            </Col>
            <div className={styles.currencyContainer}>
              <CurrencySelect field={form.$('fiat')} className={styles.currencyContainer} disabled={!form.$('indexing').value} />
            </div>
          </Row>
          <Row>
            <Col size={12} className={styles.indexing}>
              <Checkbox
                labelClassName={cx(styles.indexing_label, isMob ? styles.indexing_label_mobile : '')}
                label={t('createAd.fields.indexing')}
                value={form.$('indexing').value}
                checked={form.$('indexing').value}
                onChange={(e) => form.$('indexing').set(!form.$('indexing').value)}
              />
            </Col>
          </Row>
          <Row>
            <Col size={12}>
              <Currencies
                form={form}
                title={t('createAd.fields.readyToConsiderCurrency')}
                size={(size == 'mobile' || size == 'tablet') && 'sm'}
              />
            </Col>
          </Row>
          {/*<Row>
            <Col size={12}>
              <Checkbox
                label={'Безопасная сделка'}
                type={'switch'}
                className={styles.checkbox}
                labelClassName={styles.checkboxLabel}
              />
              <span className={styles.inputDescribe}>
                {' '}<b className={styles.inputDescribe__b}>**</b> (требуется Ethereum кошелек)
              </span>
            </Col>
          </Row>*/}
        </div>
        <div className={styles.form__bottom}>
          <If condition={!isMob}>
            <div className={styles.notes}>
              <div className={styles.notes__note}>
                <b className={styles.notes__b}>*</b> {t('createAd.fields.required')}
              </div>
              {/*
                <div className={styles.notes__note}>
                  <b className={styles.notes__b}>**</b> безопасная сделка доступна только для ETH, <Link route={'/main'}><a className={styles.notes__a}>узнать подробнее</a></Link>
                </div>
              */}
            </div>
          </If>
          <Button className={cx(styles.nextButton, isMob ? styles.nextButton_mobile : '')} color={'gradient'} onClick={this.submit}>
            {saved ? t('createAd.buttons.refresh') : t('createAd.buttons.createAd')}
          </Button>
        </div>
      </div>
    )
  }
}
export default PriceForm;
