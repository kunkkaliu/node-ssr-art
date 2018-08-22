/**
 * Created by liudonghui on 2018/4/28.
 */
import { netApi as api } from '../../../../server/network';
import getParams from 'utils/params-util';
import listArt from './list.art';
import './list.less';

class List {
    constructor() {
        this.$container = $('.list-wrap');
        this.curPage = this.$container.attr('data-curPage');
        this.token = getParams(window.location.href, 'token');
        this.init();
    }

    init = () => {
        this.$container.delegate('li', 'click', this.toDetail);
        this.$container.find('#load-more').click(this.loadMore);
    }

    toDetail = (event) => {
        let target = $(event.target).parents('li').length ? $(event.target).parents('li') : $(event.target);
        const id = target.attr('id');
        console.log(id);
    }

    loadMore = async () => {
        this.$container.find('#load-more').text('数据加载中...');
        const res = await api.get('/list/getList', {
            headers: {
                'user-token': this.token,
            },
            params: {
                pageNumber: Number(this.curPage) + 1,
                pageSize: 3,
            },
        }).catch((err) => {});
        if (res && res.data && res.data.code === 0) {
            this.$container.find('#load-more').text('加载更多');
            const records = (res && res.data && res.data.data && res.data.data.records) || [];
            this.curPage = res.data.data && res.data.data.current_page;
            const html = listArt({
                records,
            });
            const parent = this.$container.find('.list-box');
            parent.append(html);
        } else {
            this.$container.find('#load-more').text('数据加载失败...');
            setTimeout(() => {
                this.$container.find('#load-more').text('点击刷新');
                this.$container.find('#load-more').unbind();
                this.$container.find('#load-more').click(() => {
                    window.location.reload();
                });
            }, 800);
        }
    }
}

export default List;
