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
                name: 'Home',
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
                name: 'Keep',
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
                name: 'Life',
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
                path: '/music',
                name: 'Music',
                meta: {
                    title: '音乐',
                    keepAlive: false,
                    requireAuth: true,
                    index: 6,
                    icon: 'Headset',
                },
                component: () => import('@/pages/music-page.vue'),
            },
            {
                path: '/test',
                name: 'Test',
                meta: {
                    title: '测试模块',
                    keepAlive: false,
                    requireAuth: true,
                    index: 7,
                    icon: 'HelpFilled',
                },
                component: () => import('@/pages/test/test-page.vue'),
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
                        component: () => import('@/pages/test/table-page.vue'),
                    },
                    {
                        path: 'teleport',
                        name: 'Teleport',
                        meta: {
                            title: '传送门',
                            keepAlive: false,
                            requireAuth: true,
                            index: 9,
                            icon: 'Bicycle',
                        },
                        component: () =>
                            import('@/pages/test/teleport-page.vue'),
                    },
                    {
                        path: '/tree',
                        name: 'Tree',
                        meta: {
                            title: '多选树',
                            keepAlive: false,
                            requireAuth: true,
                            index: 10,
                            icon: 'Document',
                        },
                        component: () => import('@/pages/test/tree-page.vue'),
                    },
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
                        component: () =>
                            import('@/pages/test/toggle-theme.vue'),
                    },
                    {
                        path: '/vform',
                        name: 'Form',
                        meta: {
                            title: '表单',
                            keepAlive: false,
                            requireAuth: true,
                            index: 12,
                            icon: 'Document',
                        },
                        component: () => import('@/pages/test/vform-page.vue'),
                    },
                ],
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
