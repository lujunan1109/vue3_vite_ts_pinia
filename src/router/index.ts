/*
 * @Description: 路由的目录
 * @Author: lujunan
 * @Date: 2022-06-07 10:07:02
 * @LastEditors: lujunan
 * @LastEditTime: 2022-07-12 18:07:18
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
        path: '/tree',
        name: 'Tree',
        meta: {
            title: '树',
            keepAlive: false,
            requireAuth: true,
            index: 4,
        },
        component: () => import('@/pages/tree-page.vue'),
    },
    {
        path: '/404',
        name: '404',
        meta: {
            title: '404',
            keepAlive: false,
            requireAuth: false,
            index: 3,
        },
        component: () => import('@/pages/404-page.vue'),
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
