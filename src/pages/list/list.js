/**
 * Created by liudonghui on 2018/3/7.
 */
// import 'babel-polyfill';
import 'common/less/base.less';
import './list.less';
import 'components/list/header/header';
import List from 'components/list/list/list';
import 'components/common/bottom_space/bottom_space';
import FastClick from 'fastclick';

class Start {
    constructor() {
        this.init();
    }

    init = () => {
        FastClick.attach(document.body);
        new List();
    }
}

new Start();

if (module.hot) {
    module.hot.accept();
}
