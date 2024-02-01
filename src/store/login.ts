import { defineStore } from 'pinia';
import { userLogin } from '@/api';
import { routes } from '@/router';

import { captureAsyncErrors } from '@/utils';
type ResponseDataType = ReturnType<typeof userLogin>;

export const useLoginStore = defineStore('login', {
    state: () => ({
        token: '',
        username: '',
        dymicRoutes: [],
        routeList: routes,
    }),
    actions: {
        setToken(data) {
            this.token = data;
        },
        setDymicRoutes(data) {
            this.dymicRoutes = data;
        },
        async userLoginHandle(data) {
            const [isErr, result]: ResponseDataType = await captureAsyncErrors(
                userLogin(data),
            );
            if (!isErr && result) {
                window.localStorage.setItem('token', result.data.token);
                this.setDymicRoutes(result.data.routes);
                return true;
            }
        },
        addRouter() {
            this.routeList[1].children.push(...this.dymicRoutes);
        },
    },
});
