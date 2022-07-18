/*
 * @Description: axios请求基础版本
 * @Author: lujunan
 * @Date: 2022-06-07 10:28:35
 * @LastEditors: lujunan
 * @LastEditTime: 2022-07-12 18:07:24
 */

import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

const service = axios.create();

// Request interceptors
service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // do something
        return config;
    },
    (error: any) => {
        Promise.reject(error);
    },
);

// Response interceptors
service.interceptors.response.use(
    async (response: AxiosResponse) => {
        // do something
    },
    (error: any) => {
        // do something
        return Promise.reject(error);
    },
);

export default service;
