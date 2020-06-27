'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.changeColumn('Tasks', 'gmt_expire', {
      type: Sequelize.DATE,
      defaultValue: Date.now,
      allowNull: false,
      comment: '截止日期'
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.changeColumn('Tasks', 'gmt_expire', {
      type: Sequelize.STRING,
      defaultValue: '',
      allowNull: false,
      comment: '截止日期'
    });
  }
};
