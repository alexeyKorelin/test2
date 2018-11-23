import API from '../utils/api'
import {
  defaultState,
  categoryState,
  subcategoryState,
  userState,
  shopState,
  adState,
  searchState,
  editAdState
} from './states';

// Getters =========================================================

async function getInitData(options={}) {
  return await API.initData.index(options)
    .then(data => {
      data.agent = options.userAgent
      return data
    });
}

async function getUser(username, options={}) {
  return await API.users.get(username, options)
    .then(data => data);
}

async function getShop(domain, options={}) {
  return await API.shops.get(domain, options)
    .then(data => data);
}

async function getAd(ad, options={}) {
  return await API.adverts.get(ad, options)
    .then(data => data);
}

async function getSameAdverts(ad, options={}) {
  return await API.sameAdverts.index(ad, options)
    .then(data => data);
}

async function getSearched(query = {}, options={}) {
  return await API.adverts.index({...query, per_page: 15}, options)
    .then(data => data)
}

async function getCategories(options={}) {
  return await API.categories.index(options)
    .then(data => data);
}

async function getFields (slug, options={}) {
  return await API.categories.get(slug, options)
    .then(data => data.fields)
}

async function getAdverts (params={}, options={}) {
  return await API.adverts.index(params, options)
    .then(data => data)
}

const catchErrors = p =>
  p.catch(err=> {
    console.log('Error via fetching');
    console.log(err);
    return ({ error: err.error, status: err.status })
  });


// Handlers ========================================================

export async function handleIndex(options={}) {
  const [ initState ] = await Promise.all([
    getInitData(options)
  ].map(catchErrors));
  const state = defaultState(initState);
  return state;
}

export async function handleCategory(category, options={}) {
  const [ initState, adverts ] = await Promise.all([
    getInitData(options),
    getAdverts({category}, options)
  ].map(catchErrors));
  const state = defaultState(initState);
  return categoryState(state, category, adverts);
}

export async function handleSubcategory(category, subcategory, options) {
  const [ initState, adverts ] = await Promise.all([
    getInitData(options),
    getAdverts({category: subcategory}, options)
  ].map(catchErrors));
  const state = defaultState(initState);
  return subcategoryState(state, category, subcategory, adverts);
}

export async function handleAd(uid, options={}) {
  const [ initState, ad, same_adverts_store ] = await Promise.all([
    getInitData(options),
    getAd(uid, options),
    getSameAdverts(uid, options)
  ].map(catchErrors));
  const state = defaultState(initState);
  return adState(state, ad, same_adverts_store);
}

export async function handleEditAd(uid, options={}) {
  const [ initState, ad ] = await Promise.all([
    getInitData(options),
    getAd(uid, options),
  ].map(catchErrors));
  const state = defaultState(initState);
  return editAdState(state, ad);
}


export async function handleUser(username, options={}) {
  const [ initState, user ] = await Promise.all([
    getInitData(options),
    getUser(username, options)
  ].map(catchErrors));
  const state = defaultState(initState);
  return userState(state, user);
}

export async function handleShop(domain, options={}) {
  const [ initState, shop ] = await Promise.all([
    getInitData(options),
    getShop(domain, options)
  ].map(catchErrors));
  const state = defaultState(initState);
  return shopState(state, shop);
}

export async function handleDefault (options={}) {
  const [ initState ] = await Promise.all([
    getInitData(options)
  ].map(catchErrors));
  const state = defaultState(initState);
  return state;
}

export async function handleSearch (query, options={}) {
  const [ initState, adverts ] = await Promise.all([
    getInitData(options),
    getSearched({query})
  ].map(catchErrors))
  const state = defaultState(initState)
  return searchState(state, adverts, query);
}

export async function handleMe (options) {
  return handleDefault(options);
}
