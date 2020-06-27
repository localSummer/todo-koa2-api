'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      comment: '任务名称'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
      comment: '任务内容'
    },
    gmt_expire: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now,
      comment: '截止日期'
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: '0: 代办，1: 完成，2: 删除'
    },
    is_major: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: '0: 不重要，1: 重要'
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Task',
    comment: '任务表',
    underscored: true
  });
  return Task;
};