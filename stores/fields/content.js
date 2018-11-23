export const coinField = {
  slug: 'coin',
  value_keys: ['btc', 'eth', 'ltc', 'zec', 'dash', 'xrp', 'bch'],
  opened: true,
  value: []
};

export const priceField = {
  slug: 'price',
  max: 1000,
  min: 0,
  step: 1,
  opened: true,
  value: {
    min: 0,
    max: 1000
  }
}

let defaultRatio = 50

export const currencyRatio = {
  btc: {max: defaultRatio, step: 0.1},
  eth: {max: defaultRatio * 15, step: 0.2},
  dash: {max: defaultRatio * 20, step: 0.2},
  zec: {max: defaultRatio * 40, step: 0.2},
  ltc: {max: defaultRatio * 70, step: 0.4},
  xrp: {max: defaultRatio * 12000, step: 1},
  bch: {max: defaultRatio * 10, step: 0.5}
}
