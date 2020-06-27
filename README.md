### todo-koa2-api

> 技术栈: `koa2`、`sequelize`、`sequelize-cli`、`mysql`

#### Clone 到本地
> git clone git@github.com:localSummer/todo-koa2-api.git && cd todo-koa2-api && npm i

#### 创建数据库
> npx sequelize db:create --charset "utf8mb4" --collate "utf8mb4_general_ci"

#### 创建表
> npx sequelize db:migrate

#### 启动项目
> npm run dev

#### 前端项目
> 借用了 `jackchen0120` `https://github.com/jackchen0120/todo-vue-admin`，作者基于 `express` 实现了 后端 api
