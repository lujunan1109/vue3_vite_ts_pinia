import { defineStore } from 'pinia';
import { userLogin } from '@/api';
import { routes, router } from '@/router';
import { getUserDaynamicRoute, getUserDaynamicTestRoute } from '@/api/index.ts';
import { filterAsyncRoutes, _addRoutes } from '@/router/resolveRouter';

import { captureAsyncErrors } from '@/utils';

export const useLoginStore = defineStore('login', {
    state: () => ({
        token: '',
        username: '',
        dymicRoutes: [],
        routeList: routes,
        switchMenu: 'admin',
    }),
    actions: {
        setToken(data) {
            this.token = data;
        },
        setDymicRoutes(data) {
            this.dymicRoutes = data;
        },
        setRole(data) {
            this.switchMenu = data;
        },
        async userLoginHandle(data) {
            const [isErr, result] = await captureAsyncErrors(userLogin(data));
            if (!isErr && result) {
                window.localStorage.setItem('token', result.data.token);
                this.setDymicRoutes(result.data.routes);
                return true;
            }
        },
        async getRouter() {
            const asyncApi =
                this.switchMenu === 'admin'
                    ? getUserDaynamicRoute
                    : getUserDaynamicTestRoute;
            const { code, data } = await asyncApi();
            if (code === 200) {
                // 让后端的组件路径实例化为组件
                const renderCompRouter = filterAsyncRoutes(data.routes);
                console.log(renderCompRouter, 'renderCompRouter');
                // 设置到路由状态中
                this.setDymicRoutes(renderCompRouter);
                // 添加到layout路由里面
                _addRoutes(renderCompRouter);
                console.log(router.getRoutes(), '所有路径');

                return data.routes;
            }
        },
    },
    persist: true,
});
