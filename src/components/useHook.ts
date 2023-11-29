/*
 * @Author: lujunan
 * @Date: 2022-06-29 17:43:09
 * @LastEditors: lujunan
 * @LastEditTime: 2023-11-26 23:34:19
 * @Description: hook
 */
// import type { App } from 'vue';
import { onMounted, ref, watch } from 'vue';
export const useAdd = ({ num1, num2 }) => {
    const addNum = ref(0);
    watch([num1, num2], ([num1, num2]) => {
        addFn(num1, num2);
    });
    const addFn = (num1, num2) => {
        addNum.value = num1 + num2;
    };
    return {
        addNum,
        addFn,
    };
};

type Options = {
    el: string;
};

/**
 * img url transform base64
 * @param options
 */
export const toBase64 = function (
    options: Options,
): Promise<{ baseUrl: string }> {
    return new Promise((resolve) => {
        onMounted(() => {
            const img: HTMLImageElement = document.querySelector(
                options.el,
            ) as HTMLImageElement;
            img.onload = () => {
                resolve({
                    baseUrl: transBase64(img),
                });
            };
            const transBase64 = (el: HTMLImageElement) => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = el.width;
                canvas.height = el.height;
                ctx?.drawImage(el, 0, 0, canvas.width, canvas.height);
                const suffix = getImgSuffix(el);
                return canvas.toDataURL(`image/${suffix}`);
            };

            const getImgSuffix = (el: HTMLImageElement): string => {
                const url = el.src;
                const regex = /\.[^.]+$/;
                const suffix = url.match(regex)[0].substring(1);
                return suffix;
            };
        });
    });
};

type Func = (...args: DOMRectReadOnly[]) => void;

// 自定义指令结合hooks
export const useResize = (el: HTMLElement, callback: Func) => {
    // 监听元素宽高变化api
    const resize = new ResizeObserver((entries) => {
        // 返回变化之后宽高的属性数据
        callback(entries[0].contentRect);
    });
    resize.observe(el);
};

const install = (app) => {
    app.directive('resize', {
        mounted(el, binding) {
            useResize(el, binding.value);
        },
    });
};

useResize.install = install;
