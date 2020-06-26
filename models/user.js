'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: '',
      comment: '登录账号，手机号或邮箱'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      comment: '登录密码'
    },
    nickname: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: '',
      comment: '昵称'
    },
    avator: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      comment: '用户头像'
    },
    sex: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: '',
      comment: '性别：u:未知,  m:男,  w:女'
    },
  }, {
    sequelize,
    modelName: 'User',
    comment: '用户表'
  });
  return User;
};