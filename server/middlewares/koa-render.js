/**
 * Created by liudonghui on 2018/4/15.
 */
const path = require('path');
const template = require('art-template');

const koaRender = (basePath, devMiddleWare) => {
    return async (ctx, next) => {
        ctx.render = (templateName, initialState) => {
            const filePath = path.join(basePath, `${templateName}.html`);
            ctx.type = 'text/html';
            const mfs = devMiddleWare.fileSystem;
                return new Promise((resolve) => {
                    devMiddleWare.waitUntilValid(function () {
                        const htmlStream = mfs.readFileSync(filePath);
                        const html = template.render(htmlStream.toString(), initialState);
                        ctx.body = html;
                        resolve(html);
                    })
                })
        };
        await next();
    }
};

module.exports = koaRender;