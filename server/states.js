import Cookies from 'universal-cookie';
import locales from './locales';
import {languages} from 'utils/const';

export const initState = ({req, query}) => {
  const isServer = !!req;
  if (isServer) {
    const initialState = query && query.initialState || null;
    const langFromParams = req.query.lng && languages.includes(req.query.lng)
    return {
      userAgent: req.headers['user-agent'],
      initialState: {...initialState,
        actions: { action: req.query.action },
        locales: { ...initialState.locales,
          locale: langFromParams ? req.query.lng : (new Cookies(req.headers.cookie).get('locale') || 'ru-RU') // TODO detect by ip
        },
      }, // setup start state from express,
      isServer: true,
      env: process.env.NODE_ENV
    }
  } else {
    return {
      userAgent: navigator.userAgent,
      initialState: null,
      isServer: false,
      env: process.env.NODE_ENV
    }
  }
}

export const defaultState = (data) => {
  const {user, categories, cards, latest, agent } = data;
  if (data.error) {
    return {
      auth: {user: null},
      categories: {categories: []},
      cards: {cards: []},
      latestAdverts: {adverts: []},
      locales: locales, // detect lang here
      device: {agent},
    }
  } else {
    return {
      auth: {user},
      categories: {categories},
      cards: {cards},
      latestAdverts: {adverts: latest},
      locales: locales, // detect lang here
      device: {agent},
    }
  }
}

export const categoryState = (state, category, res) => {
  const index = state.categories.categories.map(c => c.slug).indexOf(category);
  if (index === -1) return notFound(state);
  if (res.error && res.status == 404) return state;
  state.categories.categories[index].adverts_store = {
    adverts: res.data,
    total: res.total,
    page: res.page,
    per_page: res.per_page
  };
  return state;
}

export const subcategoryState = (state, category, subcategory, res) => {
  const catIndex = state.categories.categories.map(c => c.slug).indexOf(category);
  if (catIndex === -1) return notFound(state);
  const subcatIndex = state.categories.categories[catIndex].children.map(c => c.slug).indexOf(subcategory);
  if (subcatIndex === -1) return notFound(state);
  if (res.error && res.status == 404) return state;
  state.categories.categories[catIndex].children[subcatIndex].adverts_store = {
    adverts: res.data,
    total: res.total,
    page: res.page,
    per_page: res.per_page
  };
  return state;
}

export const userState = (state, user) => {
  if (user.error && user.status == 404) return notFound(state);
  if (user.error && user.status == 403) return forbidden(state);
  if (user.error && user.status == 401) return accessDenied(state);
  state.user = {current: user};
  return state;
}

export const shopState = (state, shop) => {
  if (shop.error && shop.status == 404) return notFound(state);
  if (shop.error && shop.status == 403) return forbidden(state);
  if (shop.error && shop.status == 401) return accessDenied(state);
  state.shops = {current: shop};
  return state;
}

export const adState = (state, ad, same_adverts_store) => {
  if (ad.error && ad.status == 404) return notFound(state);
  if (ad.error && ad.status == 403) return forbidden(state);
  if (ad.error && ad.status == 401) return accessDenied(state);
  state.advert = {current: ad, same_adverts_store: {adverts: same_adverts_store}};
  return state;
}

export const editAdState = (state, ad) => {
  if (ad.error && ad.status == 404) return notFound(state);
  if (ad.error && ad.status == 403) return forbidden(state);
  if (ad.error && ad.status == 401) return accessDenied(state);
  state.advertForm = {advert: ad};
  return state;
}

export const searchState = (state, res, query) => {
  if (res.error && res.status === 404) return notFound(state)
  state.searchAdverts = {
    ...state.searchAdverts,
    adverts_store: {
      adverts: res.data,
      total: res.total,
      page: res.page,
      per_page: res.per_page,
      query: query
    }
  };
  return state
}

const notFound = (state) => {
  return {
    ...state,
    status: 404
  }
}

const forbidden = (state) => {
  return {
    ...state,
    status: 403
  }
}

const accessDenied = (state) => {
  return {
    ...state,
    status: 401
  }
}
