// router/permission.ts  这个在main.ts 里引入
// 当然这个文件里的内容也可以写在router/index.ts里面
// 笔者只是把有关前置守卫的单独用一个.ts文件来装

import { router } from './index'; // = import router from '@/router/index'
import { useLoginStore } from '@/store/login';
import nprogress from 'nprogress';

const whiteList = ['/login', '/noPermission', '/404'];
let pageRefresh = true;

router.beforeEach(async (to, from) => {
    nprogress.start();
    if (whiteList.indexOf(to.path) !== -1) {
        if (to.path == '/login') {
            pageRefresh = true;
        }
        return true;
    }

    const token = localStorage.getItem('token') ? true : false;
    if (!token) {
        router.push({ name: 'login' });
    } else {
        if (!pageRefresh) {
            return true;
        } else {
            //后端获取动态路由
            await useLoginStore()
                .getRouter()
                .then((res: any) => {
                    //确保router/resolveRouter.ts文件中的_addRoutes()方法中的动态路由已经被完全加载上去，不然刷新页面可能会导致空白，因此可以判断to.matched是不是个空数组，是就再次调用该router.beforeEach方法
                    if (res && to.matched.length == 0) {
                        router.push(to.fullPath);
                    }
                });
            pageRefresh = false;
        }
    }
});

router.afterEach((to, from) => {
    nprogress.done();
});
