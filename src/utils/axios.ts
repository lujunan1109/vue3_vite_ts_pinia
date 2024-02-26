import Request from './request';
import { AxiosResponse } from 'axios';
import { ElLoading } from 'element-plus';

import type { RequestConfig } from './request/type';

interface WeatherData {
    province: string;
    city: string;
    adcode: string;
    weather: string;
    temperature: string;
    winddirection: string;
    windpower: string;
    humidity: string;
    reporttime: string;
    temperature_float: string;
    humidity_float: string;
}

export interface YWZResponse<T> {
    code: number;
    message: string;
    data: T;
    lives?: WeatherData[];
}

// 重写返回类型
interface YWZRequestConfig<T, R> extends RequestConfig<YWZResponse<R>> {
    data?: T;
}

// 全局Loading实例
const LoadingInstance = {
    _target: null,
    _count: 0,
};

const request = new Request({
    baseURL: import.meta.env.BASE_URL,
    timeout: 1000 * 15,
    interceptors: {
        // 请求拦截器
        requestInterceptors: (config) => {
            // if (typeof window !== 'undefined') {
            //     config.headers.token = 'AUTH_TOKEN';
            // }
            LoadingInstance._count++;
            if (LoadingInstance._count === 1) {
                // 自定义加载配置
                LoadingInstance._target = ElLoading.service({
                    lock: true,
                    text: '拼命加载中...',
                    background: 'rgba(0, 0, 0, 0.7)',
                });
            }
            return config;
        },
        // 响应拦截器
        responseInterceptors: (result: AxiosResponse) => {
            if (LoadingInstance._count > 0) LoadingInstance._count--;
            if (LoadingInstance._count === 0) {
                LoadingInstance._target.close();
                LoadingInstance._target = null;
            }
            return result;
        },
        // 响应拦截器错误
        responseInterceptorsCatch: (error) => {
            LoadingInstance._target.close();
            LoadingInstance._target = null;
            return Promise.reject(error);
        },
    },
});

/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {YWZRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const ywzRequest = <D = any, T = any>(config: YWZRequestConfig<D, T>) => {
    const { method = 'GET' } = config;
    if (method === 'get' || method === 'GET') {
        config.params = config.data;
    }
    return request.request<YWZResponse<T>>(config);
};
// 取消请求
export const cancelRequest = (url: string | string[]) => {
    return request.cancelRequest(url);
};
// 取消全部请求
export const cancelAllRequest = () => {
    return request.cancelAllRequest();
};

export default ywzRequest;
