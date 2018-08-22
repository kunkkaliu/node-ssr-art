/**
 * Created by liudonghui on 2018/4/25.
 */
const getParams = require('../../src/utils/params-util').default;
const koaParams = (options) => {
    return async (ctx, next) => {
        const url = ctx.originalUrl || ctx.url;
        ctx.param = getParams(url);
        await next();
    }
}

module.exports = koaParams;