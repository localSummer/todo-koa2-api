const { CODE_SUCCESS, CODE_ERROR } = require('../config/constants');

const setSuccRes = (ctx, data = null, status = 200) => {
  ctx.status = status;
  ctx.body = {
    code: CODE_SUCCESS,
    data
  }
}

const setErrRes = (ctx, msg = '', status = 200) => {
  ctx.status = status;
  ctx.body = {
    code: CODE_ERROR,
    msg
  }
}

module.exports = {
  setSuccRes,
  setErrRes
}