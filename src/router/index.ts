/*
 * @Description: 路由的目录
 * @Author: lujunan
 * @Date: 2022-06-07 10:07:02
 * @LastEditors: lujunan
 * @LastEditTime: 2024-02-05 15:16:13
 */

import {
    createRouter,
    createWebHistory,
    Router,
    RouteRecordRaw,
} from 'vue-router';

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
            keepAlive: false,
            requireAuth: false,
            index: 1,
        },
        component: () => import('@/pages/login.vue'),
    },

    {
        path: '/echart',
        name: 'Echart',
        meta: {
            title: '图表',
            keepAlive: false,
            requireAuth: false,
            index: 1,
        },
        component: () => import('@/pages/echart.vue'),
    },

    {
        path: '/layout',
        name: 'layout',
        component: () => import('@/pages/layout.vue'),
        children: [
            {
                path: '/home',
                name: 'Home',
                meta: {
                    title: '首页',
                    keepAlive: false,
                    requireAuth: true,
                    index: 2,
                    icon: 'HomeFilled',
                },
                component: () => import('@/pages/home.vue'),
            },
        ],
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
