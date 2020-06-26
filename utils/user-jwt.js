const jwt = require('jsonwebtoken');
const koaJwt = require('koa-jwt');
const { PRIVATE_KEY } = require('../config/constants');

const jwtAuth = koaJwt({
  secret: PRIVATE_KEY,
  getToken(ctx) {
    if (ctx.headers.authorization) {
      return ctx.headers.authorization;
    } else if (ctx.query && ctx.query.token) {
      return ctx.query.token;
    }
  }
}).unless({
  path: [
    '/',
    '/api/login',
    '/api/register',
    '/api/resetPwd'
  ]
})

module.exports = jwtAuth;
