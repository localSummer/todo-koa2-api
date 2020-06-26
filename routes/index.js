const Router = require("koa-router");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { setSuccRes, setErrRes } = require("../utils/responseUtil");
const { findUser, createUser } = require("../services/userService");
const { PRIVATE_KEY, JWT_EXPIRED } = require("../config/constants");

const router = new Router();

router.prefix("/api");

router.get("/register", async (ctx, next) => {
  ctx.body = "test";
});

router.post("/register", async (ctx, next) => {
  let { username, password } = ctx.request.body;
  if (!username || !password) {
    setErrRes(ctx, "用户名或密码不能为空");
  }

  let user = await findUser(username);
  if (user === null) {
    password = crypto.createHash("md5").update(password).digest("hex");
    let newUser = await createUser(username, password);
    if (newUser === null) {
      setErrRes(ctx, "注册失败");
    } else {
      const token = jwt.sign(
        {
          username,
        },
        PRIVATE_KEY,
        {
          expiresIn: JWT_EXPIRED,
        }
      );
      setSuccRes(ctx, {
        token,
        userData: {
          id: newUser.id,
          username: newUser.username,
          nickname: newUser.nickname,
          avator: newUser.avator,
          sex: newUser.sex,
        },
      });
    }
  } else {
    setErrRes(ctx, "用户已存在");
  }
});

module.exports = router;
