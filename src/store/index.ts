/*
 * @Description: pinia 状态管理
 * @Author: lujunan
 * @Date: 2022-06-07 09:53:51
 * @LastEditors: lujunan
 * @LastEditTime: 2023-08-20 17:16:41
 */
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const store = createPinia();
store.use(piniaPluginPersistedstate);

export default store;
