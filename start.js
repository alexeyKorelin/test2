require('@babel/register')({
  presets: [
    'next/babel',
    '@babel/preset-env'
  ]
})

module.exports = require('./server');
