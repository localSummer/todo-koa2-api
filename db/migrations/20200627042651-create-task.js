'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        comment: '任务名称'
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: '',
        comment: '任务内容'
      },
      gmt_expire: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        comment: '截止日期'
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
        comment: '0: 代办，1: 完成，2: 删除'
      },
      is_major: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
        comment: '0: 不重要，1: 重要'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tasks');
  }
};