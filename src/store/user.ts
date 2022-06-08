/*
 * @Description: 定义state
 * @Author: lujunan
 * @Date: 2022-06-07 09:57:57
 * @LastEditors: lujunan
 * @LastEditTime: 2022-06-08 08:59:01
 */

import { defineStore } from 'pinia';

export const useUserStore = defineStore({
    id: 'user', // id必填，而且需要唯一
    state: () => {
        return {
            name: '卢俊安',
        };
    },
    actions: {
        updateName(name: string) {
            this.name = name;
        },
    },
});
