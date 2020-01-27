/**
 * Created by liudonghui on 2018/5/1.
 */
const koaUA = options => async (ctx, next) => {
    const userAgent = ctx.header['user-agent'] || '';
    ctx.isApp = /ios|android/i.test(userAgent);
    await next();
};

module.exports = koaUA;
