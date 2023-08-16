/*
 * @Description: 入口
 * @Author: lujunan
 * @Date: 2022-06-07 09:08:28
 * @LastEditors: lujunan
 * @LastEditTime: 2023-08-16 21:06:27
 */
import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import { router } from './router';
import SvgIcon from '@/components/SvgIcon.vue';
import 'virtual:svg-icons-register'; // 注册 svg 注册脚本
import 'normalize.css';
import '@/assets/iconfont/iconfont.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import * as directives from './utils/directive.js';
// 创建vue实例
const app = createApp(App);

import zh from 'element-plus/es/locale/lang/zh-cn';

import ElementPlus from 'element-plus';
app.use(ElementPlus, {
    locale: zh,
    size: 'small',
    zIndex: 3000,
});

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

// 全局注册自定义指令
for (const [key, val] of Object.entries(directives)) {
    console.log(key, val, '>>>>>', typeof key, typeof val);
    app.directive(key, val);
}

console.log(directives, 'directives');
// 定义全局变量和函数
app.config.globalProperties.$env = 'dev';
app.config.globalProperties.$filter = {
    format<T>(str: T) {
        return `我爱前端-${str}`;
    },
};

app.use(store).use(router).component('SvgIcon', SvgIcon).mount('#app');
