const { setSuccRes, setErrRes } = require('../utils/responseUtil');
const {
  findTaskByTitle,
  createTask,
  getTaskListService,
  findTaskByTaskId,
  updateTask,
  updateTaskStatusService,
  updateMarkService,
} = require('../services/taskService');

const addTask = async (ctx, next) => {
  let { title, content, gmt_expire } = ctx.request.body;
  if (!title || !content || !gmt_expire) {
    setErrRes(ctx, '请将必填字段填写完整');
    return;
  }

  let task = await findTaskByTitle(ctx.state.user.userId, title);
  if (task !== null) {
    setErrRes(ctx, '任务名称不能重复');
  } else {
    let newTask = await createTask(
      ctx.state.user.userId,
      title,
      content,
      gmt_expire
    );
    if (newTask === null) {
      setErrRes(ctx, '添加任务失败');
    } else {
      setSuccRes(ctx);
    }
  }
};

const getTaskList = async (ctx, next) => {
  let { pageSize = 10, pageNo = 1, status = null } = ctx.query;
  pageSize = parseInt(pageSize);
  pageNo = parseInt(pageNo);
  status = status ? parseInt(status) : null;

  let { count, rows } = await getTaskListService(ctx.state.user.userId);
  if (count === 0) {
    setSuccRes(ctx);
    return;
  }

  let total = count;
  let offset = (pageNo - 1) * pageSize;

  if (status === null) {
    // 查询全部
    let data = rows.filter((item, index) => {
      return index >= offset && index < offset + pageSize;
    });
    if (data.length === 0) {
      setSuccRes(ctx);
      return;
    }
    setSuccRes(ctx, {
      rows: data,
      total,
      pageNo: parseInt(pageNo),
      pageSize: parseInt(pageSize),
    });
  } else {
    // 根据任务状态查询
    let totalData = rows.filter((item) => item.status === status);
    if (totalData.length === 0) {
      setSuccRes(ctx);
      return;
    }
    let data = totalData.filter((item, index) => {
      return index >= offset && index < offset + pageSize;
    });
    if (data.length === 0) {
      setSuccRes(ctx);
      return;
    }
    setSuccRes(ctx, {
      rows: data,
      total: data.length,
      pageNo: parseInt(pageNo),
      pageSize: parseInt(pageSize),
    });
  }
};

const editTask = async (ctx, next) => {
  let { id, title, content, gmt_expire } = ctx.request.body;
  if (!title || !content || !gmt_expire) {
    setErrRes(ctx, '请将必填字段填写完整');
    return;
  }
  let task = await findTaskByTaskId(id);
  if (task === null) {
    setErrRes(ctx, '参数错误或数据不存在');
  } else if (task.status === 2) {
    setErrRes(ctx, '任务已删除，不可编辑');
  } else {
    task = await findTaskByTitle(ctx.state.user.userId, title);
    if (task !== null && task.id !== id) {
      setErrRes(ctx, '任务名称不能重复');
    } else {
      let updatedTask = await updateTask(id, title, content, gmt_expire);
      if (updatedTask[0] === 0) {
        setErrRes(ctx, '更新数据失败');
      } else {
        setSuccRes(ctx);
      }
    }
  }
};

const updateTaskStatus = async (ctx, next) => {
  let { id, status } = ctx.request.body;
  if (!id || ![0, 1].includes(status)) {
    setErrRes(ctx, '参数不正确');
    return;
  }

  let task = await findTaskByTaskId(id);
  if (task === null) {
    setErrRes(ctx, '参数错误或着任务不存在');
  } else if (task.status === 2) {
    setErrRes(ctx, '任务已删除，不可编辑');
  } else {
    let updatedTask = await updateTaskStatusService(id, status);
    if (updatedTask[0] === 0) {
      setErrRes(ctx, '更新任务状态失败');
    } else {
      setSuccRes(ctx);
    }
  }
};

const updateMark = async (ctx, next) => {
  let { id, is_major } = ctx.request.body;
  if (!id || ![0, 1].includes(is_major)) {
    setErrRes(ctx, '参数不正确');
    return;
  }

  let task = await findTaskByTaskId(id);
  if (task === null) {
    setErrRes(ctx, '参数错误或着任务不存在');
  } else if (task.status === 2) {
    setErrRes(ctx, '任务已删除，不可编辑');
  } else {
    let updatedTask = await updateMarkService(id, is_major);
    if (updatedTask[0] === 0) {
      setErrRes(ctx, '更新任务标记失败');
    } else {
      setSuccRes(ctx);
    }
  }
};

const deleteTask = async (ctx, next) => {
  let { id, status } = ctx.request.body;
  if (!id || status !== 2) {
    setErrRes(ctx, '参数不正确');
    return;
  }
  let task = await findTaskByTaskId(id);
  if (task === null) {
    setErrRes(ctx, '参数错误或着任务不存在');
  } else if (task.status === 2) {
    setErrRes(ctx, '任务已删除，不可编辑');
  } else {
    let updatedTask = await updateTaskStatusService(id, status);
    if (updatedTask[0] === 0) {
      setErrRes(ctx, '删除数据失败');
    } else {
      setSuccRes(ctx);
    }
  }
};

module.exports = {
  addTask,
  getTaskList,
  editTask,
  updateTaskStatus,
  updateMark,
  deleteTask,
};
