import {flatten} from 'lodash';

export const obtainGoogleSuggest = (options, type = 'address') => {
  const answer = {};
  const {address_components} = options.gmaps;
  const types = flatten(address_components.map(a => a.types));

  for (let i in address_components) {
    let data = address_components[i];
    let locTypes = data.types;
    answer.lan = options.location.lat;
    answer.lng = options.location.lng;
    answer.geo_label = options.label;

    if (locTypes.includes("street_number")) {
      answer.house = data.long_name;
    }
    if (locTypes.includes("route")) {
      answer.street = data.long_name;
    }
    if (locTypes.includes("administrative_area_level_2") && locTypes.includes("political")) {
      answer.city = data.long_name;
    }
    if (locTypes.includes("political") && locTypes.includes("locality")) {
      answer.city = data.long_name;
    }
    if (locTypes.includes("country") && locTypes.includes("political")) {
      answer.country = data.long_name;
    }
    if (locTypes.includes("postal_code")) {
      answer.postal = data.long_name;
    }
  }

  const fieldsForValidation = {
    address: ['postal', 'city', 'country', 'house', 'street', 'lan', 'lng'],
    city: ['city', 'country', 'lan', 'lng']
  };

  fieldsForValidation[type].forEach(f => {
    if (!(answer[f])) {
      answer[f] = null;
    }
  })

  return answer;
}
