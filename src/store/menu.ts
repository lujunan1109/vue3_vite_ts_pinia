/*
 * @Description: 定义state
 * @Author: lujunan
 * @Date: 2022-06-07 09:57:57
 * @LastEditors: lujunan
 * @LastEditTime: 2023-08-13 00:50:02
 */

import { defineStore } from 'pinia';

export const useMenuStore = defineStore({
    id: 'global', // id必填，而且需要唯一
    state: () => {
        return {
            menueWidthState: true,
        };
    },
    actions: {
        updateName(state: string) {
            this.menueWidthState = state;
        },
    },
});
