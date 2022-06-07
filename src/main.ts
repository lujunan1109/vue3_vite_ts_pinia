/*
 * @Description: 入口
 * @Author: lujunan
 * @Date: 2022-06-07 09:08:28
 * @LastEditors: lujunan
 * @LastEditTime: 2022-06-07 10:17:53
 */
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

// 创建vue实例
const app = createApp(App)

// 挂载pinia
app.use(store)
// 挂载router
app.use(router)

app.mount("#app")


app.mount('#app')
