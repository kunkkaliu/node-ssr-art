/**
 * Created by liudonghui on 2018/5/6.
 */
// import 'babel-polyfill';

import 'common/less/base.less';
import './error500.less';
import FastClick from 'fastclick';

class Error500 {
    constructor() {
        this.init();
    }

    init = () => {
        FastClick.attach(document.body);
    }
}

new Error500();
