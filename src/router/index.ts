/*
 * @Description: 路由的目录
 * @Author: lujunan
 * @Date: 2022-06-07 10:07:02
 * @LastEditors: lujunan
 * @LastEditTime: 2023-11-26 20:48:16
 */

import {
    createRouter,
    createWebHistory,
    Router,
    RouteRecordRaw,
} from 'vue-router';
import nprogress from 'nprogress';
import { useLoginStore } from '@/store/login';

let routeList = [];

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
    routes: [...routeList, ...routes],
});

// 前置路由守卫
const whiteList = ['/ecahrt', '/404', '/login'];
let hasRoles = false;
router.beforeEach((to, from, next) => {
    const hasAuth = localStorage.getItem('token') ? true : false;
    nprogress.start();
    if (hasAuth) {
        if (to.path === 'login') {
            next({ path: '/home' });
        } else {
            if (hasRoles) {
                next();
            } else {
                try {
                    const loginStore = useLoginStore();
                    const dynamicRoutes = loginStore.dymicRoutes;
                    routeList = loginStore.routeList;
                    router.addRoute(...dynamicRoutes);
                    loginStore.addRouter();
                    next({ ...to, replace: true });
                    hasRoles = true;
                } catch (error) {
                    localStorage.clear();
                    next({ name: 'Login' });
                    nprogress.done();
                }
            }
        }
    } else {
        if (whiteList.includes(to.path)) {
            next();
        } else {
            next({ name: 'Login' });
            nprogress.done();
        }
    }
    // if (to.path === '/login') {
    //     if (hasAuth()) {
    //         next({ name: 'Home' });
    //     } else {
    //         next();
    //     }
    // } else {
    //     if (hasAuth()) {
    //         const loginStore = useLoginStore();
    //         const dynamicRoutes = loginStore.dymicRoutes;
    //         if (!isAddRouter && dynamicRoutes.length > 0) {
    //             router.addRoute(...dynamicRoutes);
    //             console.log(router.getRoutes(), '新的路由');
    //             isAddRouter = true;
    //         }

    //         next();
    //     } else {
    //         next({ name: 'Login' });
    //     }
    // }
});

router.afterEach((to, from, next) => {
    nprogress.done();
});
