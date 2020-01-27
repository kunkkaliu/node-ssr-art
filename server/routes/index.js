/**
 * Created by liudonghui on 2018/3/6.
 */
const Router = require('koa-router');
const koaCache = require('../middlewares/koa-cache');

const router = new Router();
const listRouter = require('./list');

listRouter(router, koaCache);

module.exports = router;
