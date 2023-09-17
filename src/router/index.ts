/*
 * @Description: 路由的目录
 * @Author: lujunan
 * @Date: 2022-06-07 10:07:02
 * @LastEditors: lujunan
 * @LastEditTime: 2023-09-17 15:50:52
 */

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: '登录',
        meta: {
            title: '登录',
            keepAlive: false,
            requireAuth: false,
            index: 1,
        },
        component: () => import('@/pages/login-page.vue'),
    },

    {
        path: '/redirect',
        component: () => import('@/pages/layout-page.vue'),
        children: [
            {
                path: '/home',
                name: '首页',
                meta: {
                    title: '首页',
                    keepAlive: false,
                    requireAuth: true,
                    index: 2,
                    icon: 'House',
                },
                component: () => import('@/pages/home-page.vue'),
            },
            {
                path: '/keep',
                name: '健身',
                meta: {
                    title: '健身',
                    keepAlive: false,
                    requireAuth: true,
                    index: 5,
                    icon: 'Basketball',
                },
                component: () => import('@/pages/keep-page.vue'),
            },
            {
                path: '/day',
                name: '生活',
                meta: {
                    title: '生活',
                    keepAlive: false,
                    requireAuth: true,
                    index: 6,
                    icon: 'Avatar',
                },
                component: () => import('@/pages/life-page.vue'),
            },
            {
                path: '/test',
                name: '测试',
                meta: {
                    title: '测试模块',
                    keepAlive: false,
                    requireAuth: true,
                    index: 7,
                    icon: 'HelpFilled',
                },
                component: () => import('@/pages/douban-page.vue'),
                children: [
                    // {
                    //     path: 'index',
                    //     name: '404特效',
                    //     meta: {
                    //         title: '404特效',
                    //         keepAlive: false,
                    //         requireAuth: true,
                    //         index: 8,
                    //         icon: 'FolderDelete',
                    //     },
                    //     component: () => import('@/pages/test-page.vue'),
                    // },
                    {
                        path: 'table',
                        name: '表格',
                        meta: {
                            title: '表格封装',
                            keepAlive: false,
                            requireAuth: true,
                            index: 9,
                            icon: 'TrendCharts',
                        },
                        component: () => import('@/pages/table-page.vue'),
                    },
                ],
            },
            {
                path: '/doc',
                name: '文档',
                meta: {
                    title: '文档',
                    keepAlive: false,
                    requireAuth: true,
                    index: 6,
                    icon: 'Document',
                },
                component: () => import('@/pages/doc-page.vue'),
            },
        ],
    },

    {
        path: '/:pathMatch(.*)',
        redirect: '/login',
    },

    {
        path: '/404',
        name: '404',
        meta: {
            title: '404',
            keepAlive: false,
            requireAuth: true,
            index: 4,
            icon: 'WarningFilled',
        },
        component: () => import('@/pages/404-page.vue'),
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 前置路由守卫
router.beforeEach((to, from) => {
    // 返回 false 以取消导航
    // return false
    // for example
    // if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
    // else next()
});
