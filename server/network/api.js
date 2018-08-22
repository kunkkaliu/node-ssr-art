/**
 * Created by liudonghui on 2017/11/4.
 * api配置和全局拦截.
 */
import globalConfig from '../../src/globalConfig';

export const config = {
    baseURL: globalConfig.apiServerHost,
    withCredentials: false,
    timeout: 10000,
};

export function useInterceptors(netApi) {
    // 统一处理所有http请求和响应, 在请求发出与返回时进行拦截, 在这里可以做loading页面的展示与隐藏, token失效是否跳转到登录页等事情;
    netApi.interceptors.request.use(request => request, error => Promise.reject(error));

    netApi.interceptors.response.use(response => ({
        data: response.data,
    }), error => Promise.reject(error.response && error.response.data));
}
