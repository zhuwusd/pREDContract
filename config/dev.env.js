'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  BASE_API_URL:'"http://localhost:8000"',
  NODE_ENV: '"development"',
  WEB_ENV:false
})
