import {advertHasImages, addressIsFull} from './validators';
import _isEqual from 'lodash/isEqual';

const cryptocurrencies = ['eth', 'btc', 'zec', 'dash', 'xrp', 'ltc', 'bch'];

export const buildFormFields = (advert, locales) => {
  const allFields = [
    {
      name: 'owner_id',
      value: advert.owner_id,
      rules: 'required|integer',
      extra: {
        required: true
      }
    },
    {
      name: 'owner_type',
      value: advert.owner_type,
      rules: 'required|string',
      extra: {
        required: true
      }
    },
    {
      name: 'uid',
      value: advert.uid
    },
    {
      name: 'locale',
      label: locales.t('createAd.fields.locale'),
      rules: 'required|string',
      value: advert.locale || locales.locale,
      extra: {
        custom: false,
        values: ['ru-RU', 'en']
      }
    },
    {
      name: 'name',
      label: locales.t('createAd.fields.name.label'),
      placeholder: locales.t('createAd.fields.name.placeholder'),
      rules: 'required|string|between:5,70',
      value: advert.name,
      extra: {
        required: true,
        custom: false,
      },
    },
    {
      name: 'coin',
      label: 'Основная криптовалюта',
      rules: 'required|string',
      value: advert.coin ? advert.coin : 'eth',
      extra: {
        required: true,
        custom: false,
        values: cryptocurrencies
      },
    },
    {
      name: 'fiat',
      rules: 'required|string',
      value: advert.fiat ? advert.fiat : 'usd',
      extra: {
        required: false,
        custom: false,
        values: ['usd', 'eur', 'rub']
      },
    },
    {
      name: 'coin_price',
      label: locales.t('createAd.fields.coin'),
      rules: 'required',
      value: advert.coin_price ? advert.coin_price : 0,
      extra: {
        required: true,
        custom: false,
        type: 'number'
      },
    },
    {
      name: 'price',
      label: locales.t('createAd.fields.fiat'),
      rules: 'required',
      value: advert.price ? advert.price : 0,
      extra: {
        required: false,
        custom: false,
        type: 'number'
      },
    },
    {
      name: 'coins',
      label: 'Принимаемые валюты',
      value: advert.prices && advert.prices.length ? advert.prices.map(p => p.coin) : ['eth'],
      extra: {
        custom: false,
        values: cryptocurrencies
      },
    },
    {
      name: 'images',
      label: locales.t('createAd.fields.images.label'),
      validators: [advertHasImages(locales.t)],
      value: advert.images,
      extra: {
        required: true
      }
    },
    {
      name: 'description',
      label: locales.t('createAd.fields.description.label'),
      value: advert.description,
      placeholder: locales.t('createAd.fields.description.placeholder'),
      rules: 'required|string|between:0,1000',
      extra: {
        required: true,
        custom: false,
      },
    },
    {
      name: 'meta',
      label: 'Meta',
      fields: []
    },
    {
      name: 'indexing',
      label: locales.t('createAd.fields.indexing'),
      value: advert.indexing
    }
  ];

  advert.fields.forEach(field => {
    let fieldObject;
    if (field.type == 'address') {
      const addressRules = field.strict ? 'required' : '';
      fieldObject = {
        name: field.slug,
        label: field.name,
        validators: [addressIsFull(locales.t)],
        extra: {
          required: field.strict,
          type: field.type,
          custom: true,
        },
        fields: [
          {
            name: 'geo_label',
            label: 'Label',
            value: advert.meta && advert.meta.geo_label,
          },
          {
            name: 'postal',
            label: 'Postal',
            rules: addressRules,
            value: advert.meta && advert.meta.postal,
          },
          {
            name: 'house',
            label: 'House',
            value: advert.meta && advert.meta.house,
            rules: addressRules,
          },
          {
            name: 'street',
            label: 'Street',
            value: advert.meta && advert.meta.street,
            rules: addressRules,
          },
          {
            name: 'city',
            label: 'City',
            value: advert.meta && advert.meta.city,
            rules: addressRules,
          },
          {
            name: 'country',
            label: 'Country',
            value: advert.meta && advert.meta.country,
            rules: addressRules,
          },
          {
            name: 'lan',
            label: 'Lan',
            rules: addressRules,
            value: advert.meta && advert.meta.lan,
          },
          {
            name: 'lng',
            label: 'Lng',
            rules: addressRules,
            value: advert.meta && advert.meta.lng,
          }
        ]
      }
    } else if (field.type == 'city') {
      const cityRules = field.strict ? 'required' : '';
      fieldObject = {
        name: field.slug,
        label: field.name,
        validators: [addressIsFull(locales.t)],
        extra: {
          custom: true,
          required: field.strict,
          type: field.type,
        },
        fields: [
          {
            name: 'geo_label',
            label: 'Label',
            value: advert.meta && advert.meta.geo_label,
          },
          {
            name: 'city',
            label: 'City',
            value: advert.meta && advert.meta.city,
            rules: cityRules,
          },
          {
            name: 'country',
            label: 'Country',
            value: advert.meta && advert.meta.country,
            rules: cityRules,
          },
          {
            name: 'lan',
            label: 'Lan',
            value: advert.meta && advert.meta.lan,
            rules: cityRules
          },
          {
            name: 'lng',
            label: 'Lng',
            value: advert.meta && advert.meta.lng,
            rules: cityRules
          }
        ]
      }
    } else {
      fieldObject = {
        name: field.slug,
        label: field.name,
        value: advert.meta[field.slug],
        extra: {
          custom: true,
          required: field.strict,
          type: field.type,
          values: field.values,
          min: field.min,
          max: field.max,
          measure: field.measure
        }
      }
    }
    const rules =  rulesFieldGenerator(field);
    if (rules) {fieldObject.rules = rules};
    allFields[12].fields.push(fieldObject);
  })

  return allFields;
}

const rulesFieldGenerator = (field) => {
  let rule = "";
  if (field.strict) {
    rule += "required|";
  }
  if (field.type == 'number') {
    rule += "integer|";
  }
  if (field.type == 'floating') {
    rule += "numeric|";
  }
  if (field.type == 'number' || field.type == 'floating') {
    if (field.min && field.max && field.min.toString() && field.max.toString()) {
      rule += `between:${field.min},${field.max}|`
    }
  }
  if (field.type == 'list' && field.strict) {
    rule += "string|";
  }
  return rule.substring(0, rule.length - 1);
}

export const prepareApiData = (form) => {
  const values = form.values();
  form.$('meta').fields.forEach(field => {
    if (field.extra.type == 'city' || field.extra.type == 'address') {
      values.meta = {...values.meta, ...field.value}
    }
  })
  if (_isEqual(form.$('meta').values(), [])) {
    values.meta = {}
  }
  return values;
}
