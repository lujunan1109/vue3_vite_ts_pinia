/*
 * @Description: 入口
 * @Author: lujunan
 * @Date: 2022-06-07 09:08:28
 * @LastEditors: lujunan
 * @LastEditTime: 2023-12-03 21:38:17
 */
import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import { router } from './router';
import SvgIcon from '@/components/SvgIcon/index.vue';
import 'virtual:svg-icons-register'; // 注册 svg 注册脚本
import 'normalize.css';
import '@/assets/iconfont/iconfont.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import * as directives from './utils/directive.js';
import 'element-plus/theme-chalk/dark/css-vars.css';
import 'default-passive-events'; //添加事件管理者'passive'，来阻止'touchstart'事件，让页面更加流畅
import '@/mockjs/index.ts';
import 'nprogress/nprogress.css';
// 文件上传
import uploader from 'vue-simple-uploader';
import 'vue-simple-uploader/dist/style.css';

// 创建vue实例
export const app = createApp(App);

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
import { ElMessage } from 'element-plus';
app.config.globalProperties.$message = ElMessage;

app.use(store)
    .use(router)
    .component('SvgIcon', SvgIcon)
    .use(uploader)
    .mount('#app');
