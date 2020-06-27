const db = require('../models');

const findUserByUsername = async (username) => {
  let user = await db.User.findOne({
    where: {
      username,
    },
    attributes: ['id', 'username'],
  });
  return user;
};

const createUser = async (username, password) => {
  return await db.User.create({
    username,
    password,
  });
};

const findUser = async (username, password) => {
  return await db.User.findOne({
    where: {
      username,
      password,
    },
  });
};

const resetPwdService = async (username, newPassword) => {
  return await db.User.update(
    {
      password: newPassword,
    },
    {
      where: {
        username,
      },
    }
  );
};

module.exports = {
  findUserByUsername,
  createUser,
  findUser,
  resetPwdService
};
