import { router } from './index';
import { h, resolveComponent } from 'vue';

export const _addRoutes = (routes: any) => {
    routes.forEach(async (route: any) => {
        if (!router.hasRoute(route.name)) {
            router.addRoute('layout', route);
        }
    });

    if (!router.hasRoute('404')) {
        router.addRoute({
            path: '/:catchAll(.*)',
            name: '404',
            component: import('@/pages/404.vue'),
        });
    }
};

//退出登录时用于清除router中的添加进的路由
export const _resetRouter = (asyncRoutes: any) => {
    asyncRoutes.forEach((route: any) => {
        if (router.hasRoute(route.name)) {
            router.removeRoute(route.name);
        }
    });
};

// 这是vite才能使用的引入方式，vue-cli的可以百度
const _modules = import.meta.glob('../pages/**/*.vue');

export const filterAsyncRoutes = (routes: any) => {
    //对后端返回的路由进行格式转换
    const asyncRoutes: Array<any> = [];
    routes.forEach((route: any) => {
        if (route.redirect) {
            if (route.redirect.indexOf('/') < 0) {
                route.redirect = { name: route.redirect };
            }
        }

        try {
            route.component = _modules['../pages' + route.component + '.vue'];
        } catch (e) {
            console.log(e);
        }
        //处理children嵌套路由
        if (route?.children?.length) {
            route.children = filterAsyncRoutes(route.children);
        }
        asyncRoutes.push(route);
    });
    return asyncRoutes;
};

const routerView = {
    render: () => h(resolveComponent('router-view')),
};
