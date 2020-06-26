'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: '',
        comment: '登录账号，手机号或邮箱'
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        comment: '登录密码'
      },
      nickname: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: '',
        comment: '昵称'
      },
      avator: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: '',
        comment: '用户头像'
      },
      sex: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: '',
        comment: '性别：u:未知,  m:男,  w:女'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};