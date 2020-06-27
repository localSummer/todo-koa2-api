const Router = require('koa-router');
const userController = require('../controllers/userController');
const taskController = require('../controllers/taskController');

const router = new Router();

router.prefix('/api');

router.post('/register', userController.register);

router.post('/login', userController.login);

router.post('/resetPwd', userController.resetPwd);

router.post('/addTask', taskController.addTask);

router.get('/queryTaskList', taskController.getTaskList);

router.put('/editTask', taskController.editTask);

router.put('/updateTaskStatus', taskController.updateTaskStatus);

router.put('/updateMark', taskController.updateMark);

router.delete('/deleteTask', taskController.deleteTask);

module.exports = router;
