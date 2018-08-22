/**
 * Created by liudonghui on 2018/3/6.
 */
import { netApi as api } from '../network';

const startRouter = (router, koaCache) => {
    router.get('/', /*koaCache(10 * 60),*/ async (ctx, next) => {
        // 记录接口调用时间
        const token = (ctx.param && ctx.param['token']) || '';
        let startTime = new Date().getTime();
        const res = await api.get('/list/getList', {
            headers: {
                'user-token': token,
            },
            params: {
                pageNumber: 1,
                pageSize: 3,
            },
        }).catch(err => {});
        let useTime = new Date().getTime() - startTime;
        if (useTime > 500) {
            logger.warn('api', `access /list/getList use ${useTime}ms`);
        }
        logger.info('api', `access /list/getList use ${useTime}ms`);
        // 根据不同结果渲染不同页面
        if (res && res.data && res.data.code === 0) {
            const records = (res && res.data && res.data.data && res.data.data.records) || [];
            await ctx.render('list', {
                title: '订单列表',
                keywords: 'xxx',
                desc: 'xxx',
                records: records,
                current_page: res.data.data && res.data.data.current_page,
            });
        } else {
            logger.warn('api-result', `/list/getList ${res && res.data && res.data.message}`);
            await ctx.render('error500', {
                title: '错误页',
                keywords: 'xxx',
                desc: 'xxx',
            });
        }
    });
};

module.exports = startRouter;