'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ROOT: '"http://123.57.2.92:88/"'
  // API_ROOT: '"http://121.40.174.120:90/"'
  API_ROOT: '"http://excalibur.gaiyadata.com/"'
  // API_ROOT: '"https://developer.normcore.com"'
  // API_ROOT: '"http://excalibur.normcore.com/"'

})
