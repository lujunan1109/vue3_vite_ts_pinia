/*
 * @Description: 路由的目录
 * @Author: lujunan
 * @Date: 2022-06-07 10:07:02
 * @LastEditors: lujunan
 * @LastEditTime: 2023-08-13 00:42:43
 */

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login',
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
                name: 'Index',
                meta: {
                    title: '首页',
                    keepAlive: false,
                    requireAuth: true,
                    index: 2,
                },
                component: () => import('@/pages/home-page.vue'),
            },
            {
                path: '/404',
                name: '404',
                meta: {
                    title: '404',
                    keepAlive: false,
                    requireAuth: true,
                    index: 4,
                },
                component: () => import('@/pages/404-page.vue'),
            },
            {
                path: '/keep',
                name: 'Keep',
                meta: {
                    title: 'keep',
                    keepAlive: false,
                    requireAuth: true,
                    index: 5,
                },
                component: () => import('@/pages/keep-home.vue'),
            },
            {
                path: '/life',
                name: 'Life',
                meta: {
                    title: 'life',
                    keepAlive: false,
                    requireAuth: true,
                    index: 6,
                },
                component: () => import('@/pages/life-page.vue'),
            },
            {
                path: '/douban',
                name: 'Douban',
                meta: {
                    title: '豆瓣',
                    keepAlive: false,
                    requireAuth: true,
                    index: 7,
                },
                component: () => import('@/pages/douban-page.vue'),
            },
        ],
    },

    {
        path: '/:pathMatch(.*)',
        redirect: '/login',
    },
];

const router = createRouter({
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

export default router;
