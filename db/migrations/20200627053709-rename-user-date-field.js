'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.renameColumn('Users', 'createdAt', 'created_at');
    queryInterface.renameColumn('Users', 'updatedAt', 'updated_at');
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.renameColumn('Users', 'created_at', 'createdAt');
    queryInterface.renameColumn('Users', 'updated_at', 'updatedAt');
  }
};
