import {stringify} from 'query-string';
import req from './request';
import Settings from 'config';
import {latestPerPage, defaultPerPage} from './pagination';

const API = {
  path: Settings.api.path,
  initData: {
    index (options={}) {
      const url = `${API.path}/frontend/init_data`;
      return req(url, options);
    }
  },
  cards: {
    index () {
      const url = `${API.path}/cards`;
      return req(url);
    }
  },
  users: {
    me (options={}) {
      const url = `${API.path}/users/me`;
      return req(url, options);
    },
    get (username, options) {
      const url = `${API.path}/users/${username}`;
      return req(url, options);
    },
    login (code) {
      const url = `${API.path}/users/login`;
      const payload = JSON.stringify({code});
      return req(url, {method: 'POST', body: payload});
    },
    updateInfo (params = {}) {
      const payload = JSON.stringify(params);
      return req(`${API.path}/users/update_info`, {method: 'PUT', body: payload});
    },
    updateWallet (params = {}) {
      const payload = JSON.stringify(params);
      return req(`${API.path}/users/update_wallet`, {method: 'PUT', body: payload});
    },
    deleteWallet () {
      return req(`${API.path}/users/delete_wallet`, {method: 'DELETE'});
    }
  },
  categories: {
    index(options={}) {
      return req(`${API.path}/categories`, options);
    },
    get (slug, options={}) {
      return req(`${API.path}/categories/${slug}`, options)
    }
  },
  adverts: {
    index (params={}, options={}) {
      if (!params.per_page) params.per_page = defaultPerPage;
      return req(`${API.path}/adverts?${stringify(params)}`, options);
    },
    get (uid, options={}) {
      return req(`${API.path}/adverts/${uid}`, options);
    },
    update (id, body) {
      const payload = JSON.stringify({advert: body});
      return req(`${API.path}/adverts/${id}`, {method: 'PUT', body: payload});
    },
    create (params = {}) {
      const payload = JSON.stringify({advert: params});
      return req(`${API.path}/adverts`, {method: 'POST', body: payload});
    },
    search(params={}) {
      return req(`${API.path}/adverts/search?${stringify(params)}`);
    },
    uploadImage (id, formdata) {
      return req(`${API.path}/adverts/${id}/upload_image`, {
        method: 'POST',
        body: formdata
      });
    },
    deleteImage (id, imageId) {
      return req(`${API.path}/adverts/${id}/delete_image/${imageId}`, {
        method: 'DELETE'
      });
    },
    archive (id, reason) {
      const payload = JSON.stringify({advert: {reason: reason}});
      return req(`${API.path}/adverts/${id}/archive`, {method: 'PUT', body: payload});
    },
    translate (id, locale) {
      const payload = JSON.stringify({id: id, locale: locale});
      return req(`${API.path}/adverts/${id}/translate`, {method: 'PUT', body: payload});
    },
    delete (id) {
      return req(`${API.path}/adverts/${id}`, {method: 'DELETE'});
    }
  },
  latestAdverts: {
    index (params={}, options={}) {
      if (!params.per_page) params.per_page = latestPerPage;
      return req(`${API.path}/adverts/latest?${stringify(params)}`, options);
    }
  },
  sameAdverts: {
    index (uid, options={}) {
      return req(`${API.path}/adverts/${uid}/same`, options);
    }
  },
  searchAdverts: {
    index(params={}, options={}) {
      return req(`${API.path}/search?${stringify(params)}`, options);
    }
  },
  favorites: {
    index (options={}) {
      return req(`${API.path}/favorites`, options);
    },
    post (uid)  {
      const payload = JSON.stringify({id: uid});
      return req(`${API.path}/favorites`, {method: 'POST', body: payload});
    },
    delete (uid)  {
      return req(`${API.path}/favorites/${uid}`, {method: 'DELETE'});
    }
  },
  prices: {
    index (query) {
      return req(`${API.path}/coin_prices?${stringify(query)}`);
    }
  },
  shops: {
    index () {
      return req(`${API.path}/shops`);
    },
    get (domain, options) {
      const url = `${API.path}/shops/${domain}`;
      return req(url, options);
    },
    create (shop) {
      const payload = JSON.stringify({shop: shop});
      return req(`${API.path}/shops`, {method: 'POST', body: payload});
    },
    update (shop, domain) {
      const payload = JSON.stringify({shop: shop});
      return req(`${API.path}/shops/${domain}`, {method: 'PUT', body: payload});
    },
    delete (domain) {
      return req(`${API.path}/shops/${domain}`, {method: 'DELETE'});
    }
  }
}

export default API;
