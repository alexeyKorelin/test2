import React from 'react';
import ReactDOM from 'react-dom';
import scrollToComponent from 'react-scroll-to-component-ssr';
import Cookies from 'universal-cookie';
import sortBy from 'lodash/sortBy';

export const isMobile = userAgent => (
  userAgent.match(/Android/i)
  || userAgent.match(/webOS/i)
  || userAgent.match(/iPhone/i)
  || userAgent.match(/iPad/i)
  || userAgent.match(/iPod/i)
  || userAgent.match(/BlackBerry/i)
  || userAgent.match(/Windows Phone/i)
);

export const Wrapper = props => props.children;


export const cookie = {
  get(name) {
    const cookies = new Cookies();
    return cookies.get(name);
  },
  set(name, value, options) {
    options = options || {};
    options.expires = options.expires || new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7);
    options.path = "/";
    const cookies = new Cookies();
    cookies.set(name, value, options);
  },
  remove(name) {
    const cookies = new Cookies();
    cookies.remove(name);
  }
}

export const declOfNum = (function () {
  const cases = [2, 0, 1, 1, 1, 2]
  const declOfNumSubFunction = function (titles, number) {
    number = Math.abs(number)
    return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]]
  }
  return function (_titles) {
    if (arguments.length === 1) {
      return function (_number) {
        return declOfNumSubFunction(_titles, _number)
      }
    } else {
      return declOfNumSubFunction.apply(null, arguments)
    }
  }
})()

export function goUrlHash(shift = false) {
  if (window.location.hash) {
    const urlParams = window.location.hash.split('#');

    if (urlParams[urlParams.length - 1]) {
      scrollTo(urlParams[urlParams.length - 1], false, shift);
    }
  };
}

export function scrollTo(id, name = false, shift) {
  const node = document.getElementById(id) || name && document.querySelector(`[name="${name}"]`);

  if (node) {
    scrollToComponent(node, {
      offset: shift || -50,
      align: 'top',
      duration: 500
    });
  }
}

export const retina = `only screen and (-o-min-device-pixel-ratio: 5/4), only screen and (-webkit-min-device-pixel-ratio: 1.25), only screen and (min-device-pixel-ratio: 1.25), only screen and (min-resolution: 1.25dppx)`;

export const noop = () => {}

export const obtainDate = (date) => {
  if (!date) return null;
  if (date.toString().length == 13) {
    return date;
  } else {
    return date * 1000;
  }
}

export const formatPrice = (number) => {
  let parts = number.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return parts.join('.');
} 

export const tToArray = (itemsObject, prefix = 'item') => {
  return typeof(itemsObject) === 'object' ? sortBy(Object.keys(itemsObject).map(key => { 
    let numberKey = key.replace(prefix, '');
    let value = (typeof(itemsObject[key]) === 'object') ? itemsObject[key] : {value: itemsObject[key]}; 
    
    return {...value, key: numberKey};
  }), item => parseInt(item.key)) : [];
}

export const disableDevTools = process.env.NODE_ENV === 'production' ? 
  `window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function(){}
  window.__MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx = function(){}
  window.__MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobxReact = function(){}
  window.__MOBX_DEVTOOLS_GLOBAL_HOOK__.inject = function(){}` : null