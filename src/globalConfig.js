/**
 * Created by liudonghui on 2018/5/2.
 */
let apiHost = '//xx.dev.com';
let apiServerHost = 'http://xx.dev.com';

if (process.env.CODE_ENV === 'qa') {
    apiHost = '//xx.qa.com';
    apiServerHost = 'http://xx.qa.com';
} else if (process.env.CODE_ENV === 'online') {
    apiHost = '//xx.online.com';
    apiServerHost = 'http://xx.online.com';
}

export default {
    apiHost,
    apiServerHost,
};
