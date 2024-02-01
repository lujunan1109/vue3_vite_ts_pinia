/*
 * @Description: 路由的目录
 * @Author: lujunan
 * @Date: 2022-06-07 10:07:02
 * @LastEditors: lujunan
 * @LastEditTime: 2023-11-26 20:48:16
 */

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import nprogress from 'nprogress';

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
        path: '/redirect',
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
            {
                path: '/function',
                name: 'Function',
                meta: {
                    title: '功能模块',
                    keepAlive: false,
                    requireAuth: true,
                    index: 6,
                    icon: 'Suitcase',
                },
                component: () => import('@/pages/func/index.vue'),
                children: [
                    {
                        path: '/theme',
                        name: 'Theme',
                        meta: {
                            title: '主题切换',
                            keepAlive: false,
                            requireAuth: true,
                            index: 11,
                            icon: 'Guide',
                        },
                        component: () => import('@/pages/func/toggle.vue'),
                    },
                    {
                        path: '/teleport',
                        name: 'Teleport',
                        meta: {
                            title: '传送门',
                            keepAlive: false,
                            requireAuth: true,
                            index: 11,
                            icon: 'Bicycle',
                        },
                        component: () => import('@/pages/func/teleport.vue'),
                    },
                ],
            },
            {
                path: '/component',
                name: 'Component',
                meta: {
                    title: '组件模块',
                    keepAlive: false,
                    requireAuth: true,
                    index: 6,
                    icon: 'Box',
                },
                component: () => import('@/pages/comp/index.vue'),
                children: [
                    {
                        path: 'table',
                        name: 'Table',
                        meta: {
                            title: '表格',
                            keepAlive: false,
                            requireAuth: true,
                            index: 8,
                            icon: 'TrendCharts',
                        },
                        component: () => import('@/pages/comp/table.vue'),
                    },
                    {
                        path: '/tree',
                        name: 'Tree',
                        meta: {
                            title: '多选树',
                            keepAlive: false,
                            requireAuth: true,
                            index: 10,
                            icon: 'Checked',
                        },
                        component: () => import('@/pages/comp/tree.vue'),
                    },

                    {
                        path: '/vform',
                        name: 'Form',
                        meta: {
                            title: '表单',
                            keepAlive: false,
                            requireAuth: true,
                            index: 12,
                            icon: 'List',
                        },
                        component: () => import('@/pages/comp/vform.vue'),
                    },
                ],
            },
            {
                path: '/permisssion',
                name: 'Permisssion',
                meta: {
                    title: '用户权限',
                    keepAlive: false,
                    requireAuth: true,
                    index: 3,
                    icon: 'UserFilled',
                },
                component: () => import('@/pages/permission/index.vue'),
            },
            {
                path: '/editor',
                name: 'Editor',
                meta: {
                    title: '编辑器',
                    keepAlive: false,
                    requireAuth: true,
                    index: 3,
                    icon: 'Management',
                },
                component: () => import('@/pages/editor/index.vue'),
            },
        ],
    },

    {
        path: '/:pathMatch(.*)',
        redirect: '/404',
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
        component: () => import('@/pages/404.vue'),
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 前置路由守卫
router.beforeEach((to, from, next) => {
    // 返回 false 以取消导航
    // return false
    // for example
    // if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
    // else next()
    nprogress.start();
    if (to.path === '/login') {
        if (hasAuth()) {
            next({ name: 'Home' });
        } else {
            next();
        }
    } else {
        if (hasAuth()) {
            next();
        } else {
            next({ name: 'Login' });
        }
    }
});

router.afterEach((to, from, next) => {
    nprogress.done();
});

const hasAuth = () => {
    return localStorage.getItem('token') ? true : false;
};
