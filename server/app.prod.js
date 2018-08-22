/**
 * Created by liudonghui on 2018/3/5.
 */
// require('babel-polyfill');
const path = require('path');
const Koa = require('koa');
const koaStatic = require('koa-static-cache');
const koaCompress = require('koa-compress');
const koaRender = require('koa-art-template');
const router = require('./routes/index');
const koaUA = require('./middlewares/koa-ua');
const koaParams = require('./middlewares/koa-params');
const Logger = require('./middlewares/logger');
const koaLogger = require('./middlewares/koa-logger');
const routeNotFound = require('./middlewares/route-notfound');

global.logger = Logger({
    formatter(level, group, message) {
        const date = new Date();
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} [${level}] ${group}: ${message}`
    }
});

const app = new Koa();
koaRender(app, {
    root: path.join(__dirname, '../dist/client/views'),
    extname: '.html',
    debug: false,
});
app.use(koaCompress({
    filter: function (content_type) {
        return /text|javascript/i.test(content_type)
    },
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
}));
app.use(koaStatic(path.join(__dirname, '../dist/client')), {
    maxAge: 365 * 24 * 60 * 60
});
app.use(koaUA());
app.use(koaParams());
app.use(koaLogger());
app.use(router.routes()).use(router.allowedMethods());
app.use(routeNotFound({
    redirect: '/'
}));

app.listen(8088, _ => {
    logger.success('server', 'App (pro) is going to be running on port 8088.');
});
