/*
 * @Author: lujunan
 * @Date: 2022-06-27 14:53:16
 * @LastEditors: lujunan
 * @LastEditTime: 2024-02-06 22:00:03
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
            localStorage.setItem(key, newValue as string);
            return value.value;
        },
    });
}

/**
 * @description: 时间戳转换成时分秒的函数
 * @return {*}
 */
export const timeFormatter = (val: number): string | number => {
    if (val < 60) {
        return zeroNum(val);
    } else if (val >= 60 && val <= 60 * 60) {
        const min: number = Math.floor((val % (60 * 60)) / 60);
        const second = (val % (60 * 60)) % 60;
        return `${zeroNum(min)}-${zeroNum(second)}`;
    } else {
        const hour = Math.floor(val / (60 * 60));
        const min = Math.floor((val % (60 * 60)) / 60);
        const second = (val % (60 * 60)) % 60;

        return `${zeroNum(hour)} - ${zeroNum(min)}-${zeroNum(second)}`;
    }
};

/**
 * @description: 12345678.789->123,456,78.789
 * @param {string} s
 * @return {string} result
 */
export const equalAmount = function (s: string) {
    // 前置判断
    if (typeof s === 'number') s = s + '';
    if (typeof s !== 'string') {
        return new Error('请输入字符串类型数据');
    }
    const splitArray = s.includes('.') ? s.split('.') : ['', '']; // 修复无小数判断
    const reverseArr = s.includes('.')
        ? splitArray[0].split('').reverse()
        : s.split('').reverse();
    let concatStr = '';
    let result = '';
    for (let index = 0; index < reverseArr.length; index++) {
        if (index % 3 === 0 && index !== 0 && index !== reverseArr.length - 1) {
            concatStr += ',' + reverseArr[index];
        } else {
            concatStr += reverseArr[index];
        }
    }
    result = splitArray[1]
        ? concatStr.split('').reverse().join('') + '.' + splitArray[1]
        : concatStr.split('').reverse().join('');
    return result;
};

/**
 *
 * @param asyncFunction 异步函数
 * @returns
 */
export async function captureAsyncErrors<T>(
    asyncFunction: Promise<T>,
): Promise<[Error | null, T | null]> {
    try {
        const result = await asyncFunction;
        return [null, result];
    } catch (error) {
        return [error, null];
    }
}

/**
 * Sleeps for a given amount of time.
 *
 * @param {number} t - The amount of time to sleep in seconds.
 * @return {Promise<number>} A promise that resolves with the amount of time slept.
 */
export const sleep = (time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(time);
        }, time);
    });
};

export const useThemeCahenge = (theme: string) => {
    document.querySelector('html').setAttribute('class', theme);
    document.querySelector('html').setAttribute('data-theme', theme);
};
