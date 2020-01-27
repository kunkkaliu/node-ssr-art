/**
 * Created by liudonghui on 2018/4/15.
 */
const path = require('path');
const template = require('art-template');

const koaRender = (app, options) => {
    if (app.context.render) return;

    const { basePath, devMiddleWare } = options;
    app.context.render = function (templateName, initialState) {
        const ctx = this;
        const filePath = path.join(basePath, `${templateName}.html`);
        ctx.type = 'text/html';
        const mfs = devMiddleWare.fileSystem;
        return new Promise((resolve) => {
            devMiddleWare.waitUntilValid(function () {
                const htmlStream = mfs.readFileSync(filePath);
                const html = template.render(htmlStream.toString(), initialState);
                ctx.body = html;
                resolve(html);
            });
        });
    };
};

module.exports = koaRender;
