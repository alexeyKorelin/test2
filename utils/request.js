// import 'whatwg-fetch';
import 'isomorphic-fetch'
import {cookie} from 'utils/utils';

const req = (url, options = {}) => {
  const token = options.token || cookie.get('authToken');
  const locale = options.locale || cookie.get('locale');
  const reqOptions = {
    ...options,
    mode: 'cors',
    headers: {
      ...options.headers,
      'Accept': '*/*',
      'Access-Control-Allow-Origin': '*',
      'Authorization': token,
      'Locale': locale,
    }
  }

  if (typeof options.body === 'string') {
    reqOptions.headers = {
      ...reqOptions.headers,
      'Content-Type': 'application/json',
    }
  }
  return fetch(url, reqOptions).then(parseStatus).then(parseJson).catch(parseJson);
}

class CustomError {
  constructor (errorResponse) {
    this.errors = {
      [errorResponse.type]: errorResponse.statusText,
      response: errorResponse
    }
  }
}

const parseStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
}

const parseJson = (response) => {
  return new Promise((resolve, reject) => {
    response.json().then(data => {
      if (response.status < 300) {
        const headers = response.headers;
        if (headers.get('x-total')) {
          resolve({
            data: data,
            total: parseInt(headers.get('x-total')),
            per_page: parseInt(headers.get('x-per-page')),
            page: parseInt(headers.get('x-page')),
          })
        } else {
          resolve(data);
        }
      } else {
        reject({...data, ...response});
      }
    })
    .catch(e => {
      reject(new CustomError(response));
    })
  })
}

export default req;
