const Router = require('koa-router');
const userController = require('../controllers/userController');

let router = new Router();

router.post("/register", userController);

module.exports = router;

