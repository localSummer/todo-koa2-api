const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { setSuccRes, setErrRes } = require('../utils/responseUtil');
const validUtil = require('../utils/validUtil');
const {
  findUserByUsername,
  createUser,
  findUser,
  resetPwdService
} = require('../services/userService');
const { PRIVATE_KEY, JWT_EXPIRED } = require('../config/constants');

const register = async (ctx, next) => {
  let { username, password } = ctx.request.body;
  if (!username || !password) {
    setErrRes(ctx, '用户名或密码不能为空');
    return;
  }

  if (!validUtil.validUserName(username)) {
    setErrRes(ctx, '用户名格式不正确');
    return;
  }

  if (!validUtil.validPass(password)) {
    setErrRes(ctx, '密码格式不正确');
    return;
  }

  let user = await findUserByUsername(username);
  if (user === null) {
    password = crypto.createHash('md5').update(password).digest('hex');
    let newUser = await createUser(username, password);
    if (newUser === null) {
      setErrRes(ctx, '注册失败');
    } else {
      const token = jwt.sign(
        {
          username,
          userId: newUser.id
        },
        PRIVATE_KEY,
        {
          expiresIn: JWT_EXPIRED,
        }
      );
      setSuccRes(ctx, {
        token,
        userData: {
          id: newUser.id,
          username: newUser.username,
          nickname: newUser.nickname,
          avator: newUser.avator,
          sex: newUser.sex,
        },
      });
    }
  } else {
    setErrRes(ctx, '用户已存在');
  }
};

const login = async (ctx, next) => {
  let { username, password } = ctx.request.body;
  if (!username || !password) {
    setErrRes(ctx, '用户名或密码不能为空');
    return;
  }

  if (!validUtil.validUserName(username)) {
    setErrRes(ctx, '用户名格式不正确');
    return;
  }

  if (!validUtil.validPass(password)) {
    setErrRes(ctx, '密码格式不正确');
    return;
  }

  password = crypto.createHash('md5').update(password).digest('hex');
  let user = await findUser(username, password);
  if (user === null) {
    setErrRes(ctx, '登录失败，用户不存在');
  } else {
    const token = jwt.sign(
      {
        username,
        userId: user.id
      },
      PRIVATE_KEY,
      {
        expiresIn: JWT_EXPIRED,
      }
    );

    setSuccRes(ctx, {
      token,
      userData: {
        id: user.id,
        username: user.username,
        nickname: user.nickname,
        avator: user.avator,
        sex: user.sex,
      },
    });
  }
};

const resetPwd = async (ctx, next) => {
  let { username, oldPassword, newPassword } = ctx.request.body;
  if (!username || !oldPassword || !newPassword) {
    setErrRes(ctx, '用户名或密码字段不能为空');
    return;
  }

  if (!validUtil.validUserName(username)) {
    setErrRes(ctx, '用户名格式不正确');
    return;
  }

  if (!validUtil.validPass(oldPassword)) {
    setErrRes(ctx, '旧密码格式不正确');
    return;
  }

  if (!validUtil.validPass(newPassword)) {
    setErrRes(ctx, '新密码格式不正确');
    return;
  }

  oldPassword = crypto.createHash('md5').update(oldPassword).digest('hex');
  newPassword = crypto.createHash('md5').update(newPassword).digest('hex');
  
  let user = await findUser(username, oldPassword);
  if (user === null) {
    setErrRes(ctx, '用户名或旧密码错误');
  } else {
    let updatedUser = await resetPwdService(username, newPassword);
    if (updatedUser[0] === 0) {
      setErrRes(ctx, '重置密码失败');
    } else {
      setSuccRes(ctx);
    }
  }

};

module.exports = {
  register,
  login,
  resetPwd,
};
