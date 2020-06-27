const Router = require("koa-router");
const userRouter = require('./user');

const router = new Router();

router.prefix("/api");

router.use(['/register', '/login', 'resetPwd'], userRouter.routes(), userRouter.allowedMethods())

module.exports = router;
