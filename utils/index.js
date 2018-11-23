export const fieldsToQuery = (fields) => {
  const query = {};
  for (let i in fields.toJSON()) {
    let field = fields[i];
    if (!field.value) continue;

    if (field.slug == 'coin') {
      if (field.value.length == 1) {
        query.coin = field.value[0];
      } else if (field.value.length > 1) {
        query.coins = field.value.join(',');
      }
    }

    if (field.slug == 'price' && query.coin) {
      if (field.value.min) query.price_low = field.value.min;
      if (field.value.max) query.price_high = field.value.max;
    }

    if (field.type == 'checkbox' && field.value) {
      query[field.slug] = true;
    }

    if (field.type == 'list' && field.value.length > 0) {
      query[field.slug] = field.value.join(',');
    }

    if (field.type == 'number' || field.type == 'floating') {
      if (field.value.min) query[`${field.slug}_low`] = field.value.min;
      if (field.value.max) query[`${field.slug}_high`] = field.value.max;
    }
  }
  return query;
}

export const locationQuery = () => {
  const pairs = location.search.slice(1).split('&');
  const result = {};
  pairs.forEach(function(pair) {
    pair = pair.split('=');
    if (pair[0]) {
      result[pair[0]] = decodeURIComponent(pair[1] || '');
    }
  });
  return result;
}
