const db = require('../models');

const findUser = async (username) => {
  let user = await db.User.findOne({
    where: {
      username
    },
    attributes: ['id', 'username']
  })
  return user;
}

const createUser = async (username, password) => {
  return await db.User.create({
    username,
    password
  });
}

module.exports = {
  findUser,
  createUser
}
