/*
 * @Description: 定义state
 * @Author: lujunan
 * @Date: 2022-06-07 09:57:57
 * @LastEditors: lujunan
 * @LastEditTime: 2023-08-16 21:33:03
 */

import { defineStore } from 'pinia';
import { RouteRecordName } from 'vue-router';

export const useMenuStore = defineStore({
    id: 'menu', // id必填，而且需要唯一
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
        updateMenuState(state: boolean) {
            this.menueWidthState = state;
        },
        updateBreadMenu(path: string, label: RouteRecordName) {
            this.breadMenu.path = path;
            this.breadMenu.label = label;
        },
        deleteMenuTags(tag) {
            this.menuTags.splice(this.menuTags.indexOf(tag), 1);
        },
        // 重置选中的菜单
        resetCheckedMenuTags() {
            this.menuTags = this.menuTags.map((t) => {
                t.checked = 'plain';
                return t;
            });
        },
        // 选中效果
        checkedMenuTags(tag) {
            const inx = this.menuTags.findIndex((t) => t.name === tag.name);
            this.menuTags[inx].checked = 'dark';
        },
    },
});
