const db = require('../models');

const findTaskByTitle = async (userId, title) => {
  return await db.Task.findOne({
    where: {
      user_id: userId,
      title,
    },
    attributes: ['id', 'title'],
  });
};

const findTaskByTaskId = async (taskId) => {
  return await db.Task.findOne({
    where: {
      id: taskId,
    },
    attributes: ['id', 'title'],
  });
};

const createTask = async (userId, title, content, gmt_expire) => {
  return await db.Task.create({
    user_id: userId,
    title,
    content,
    gmt_expire,
  });
};

const updateTask = async (taskId, title, content, gmt_expire) => {
  return await db.Task.update(
    {
      title,
      content,
      gmt_expire,
    },
    {
      where: {
        id: taskId,
      },
    }
  );
};

const updateTaskStatusService = async (taskId, status) => {
  return db.Task.update(
    {
      status,
    },
    {
      where: {
        id: taskId,
      },
    }
  );
};

const updateMarkService = async (taskId, is_major) => {
  return db.Task.update(
    {
      is_major,
    },
    {
      where: {
        id: taskId,
      },
    }
  );
};

const getTaskListService = async (userId) => {
  return db.Task.findAndCountAll({
    where: {
      user_id: userId,
    },
    order: [['created_at', 'DESC']],
    attributes: [
      'id',
      'title',
      'content',
      'status',
      'is_major',
      'created_at',
      'gmt_expire',
    ],
  });
};

module.exports = {
  findTaskByTitle,
  findTaskByTaskId,
  createTask,
  getTaskListService,
  updateTask,
  updateTaskStatusService,
  updateMarkService
};
