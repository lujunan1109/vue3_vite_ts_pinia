/*
 * @Author: lujunan
 * @Date: 2022-06-27 14:53:16
 * @LastEditors: lujunan
 * @LastEditTime: 2022-07-12 17:39:06
 * @Description: 工具函数
 */

import { ref, computed } from 'vue';

/**
 * @description: 返回当前时间
 * @return {*}
 */
export function getNowTime() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const date = new Date().getDate();
    return `${zeroNum(year)}-${zeroNum(month)}-${zeroNum(date)}`;
}

/**
 * @description: 小于10加0
 * @param {*} val
 * @return {*}
 */
export function zeroNum(val: number) {
    if (val >= 10) return val;
    return `0${val}`;
}

/**
 * @description: 获取任意数据的类型
 * @param {*} o
 * @return {*}
 */
export function getAnyObjectType(o: any) {
    const s: any = Object.prototype.toString.call(o);
    return s.match(/\[object (.*?)\]/)[1].toLowerCase();
}

/**
 * @description: 存取localStorage
 * @param {*} key
 * @param {*} initialValue
 * @return {*}
 */
export function useLocalStorage(key: string, initialValue: any) {
    const value = ref(initialValue);
    return computed({
        get() {
            if (localStorage.getItem(key)) {
                return value.value;
            } else {
                localStorage.setItem(key, value.value);
                return undefined;
            }
        },
        set(newValue) {
            value.value = newValue;
            localStorage.setItem(key, newValue);
            return value.value;
        },
    });
}
