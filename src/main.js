/*
 * @Description: 入口
 * @Author: lujunan
 * @Date: 2022-06-07 09:08:28
 * @LastEditors: lujunan
 * @LastEditTime: 2022-06-08 08:43:49
 */
import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import SvgIcon from '@/components/SvgIcon.vue';
import 'virtual:svg-icons-register'; // 注册 svg 注册脚本
import 'normalize.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
// 创建vue实例
const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.use(store).use(router).component('SvgIcon', SvgIcon).mount('#app');
