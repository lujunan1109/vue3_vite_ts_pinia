/*
 * @Description: 定义state
 * @Author: lujunan
 * @Date: 2022-06-07 09:57:57
 * @LastEditors: lujunan
 * @LastEditTime: 2023-08-16 21:33:03
 */

import { defineStore } from 'pinia';

export const useMenuStore = defineStore({
    id: 'global', // id必填，而且需要唯一
    state: () => {
        return {
            // 菜单伸缩状态
            menueWidthState: false,
            // 路由跳转记录
            menuTags: [],
            // 菜单面包屑展示
            breadMenu: { path: '', label: '' },
        };
    },
    actions: {
        updateMenuState(state: string) {
            this.menueWidthState = state;
        },
    },
});
