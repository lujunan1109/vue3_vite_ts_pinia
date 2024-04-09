/*
 * @Author: lujunan
 * @Date: 2022-07-14 11:11:52
 * @LastEditors: lujunan
 * @LastEditTime: 2024-04-08 17:42:04
 * @Description: 参考链接https://www.jb51.net/article/251168.htm
 */
import { ElMessage } from 'element-plus';
/**
 * @description: 防抖
 * @return {*}
 */
export const debounce = {
    mounted(el, binding) {
        // 至少需要回调函数以及监听事件类型
        if (typeof binding.value.fn !== 'function' || !binding.value.event)
            return;
        let delay = 200; // 默认延迟时间
        el.timer = null;
        el.handler = function () {
            if (el.timer) {
                clearTimeout(el.timer);
                el.timer = null;
            }
            el.timer = setTimeout(() => {
                binding.value.fn.apply(this, arguments);
                el.timer = null;
            }, binding.value.delay || delay);
        };
        el.addEventListener(binding.value.event, el.handler);
    },
    // 元素卸载前也记得清理定时器并且移除监听事件
    beforeMount(el, binding) {
        if (el.timer) {
            clearTimeout(el.timer);
            el.timer = null;
        }
        el.removeEventListener(binding.value.event, el.handler);
    },
};

/**
 * @description: 聚焦
 * @param {*} directive
 * @param {*} el
 * @return {*}
 */
export const focus = {
    mounted(el) {
        el.focus();
    },
};

/**
 * @description: 节流
 * @return {*}
 */
export const throttle = {
    mounted(el, binding) {
        // 至少需要回调函数以及监听事件类型
        if (typeof binding.value.fn !== 'function' || !binding.value.event)
            return;
        let delay = 200;
        el.timer = null;
        el.handler = function () {
            if (el.timer) return;
            el.timer = setTimeout(() => {
                binding.value.fn.apply(this, arguments);
                el.timer = null;
            }, binding.value.delay || delay);
        };
        el.addEventListener(binding.value.event, el.handler);
    },
    // 元素卸载前也记得清理定时器并且移除监听事件
    beforeUnmount(el, binding) {
        if (el.timer) {
            clearTimeout(el.timer);
            el.timer = null;
        }
        el.removeEventListener(binding.value.event, el.handler);
    },
};

/**
 * @description: 隐藏弹窗
 * @return {*}
 */
export const hideDialog = {
    mounted(el, binding) {
        el.handler = function (e) {
            // 如果点击范围在绑定的元素范围内，那么将不执行指令操作，而是执行原点击事件
            if (el.contains(e.target)) return;
            if (typeof binding.value.fn === 'function') {
                // 绑定给指令的如果是一个函数，那么将回调并指定this
                binding.value.fn.apply(this, arguments);
                // 并不推荐使用style的方式来隐藏元素，这样的话控制弹窗的变量就无法改变，所以推荐使用回调函数
                // el.style.display = 'none';
                // 解除事件绑定
                document.removeEventListener('click', el.handler);
            }
        };
        // 监听全局的点击事件
        document.addEventListener('click', el.handler);
        // 如果同步绑定全局事件不生效，可以采用异步的方式
        // setTimeout(() => {
        //   document.addEventListener('click', el.handler)
        // }, 0);
    },
    // 解除事件绑定
    beforeUnmount(el) {
        document.removeEventListener('click', el.handler);
    },
};

/**
 * 复制文本
 */
export const copyText = {
    mounted(el, binding) {
        el.handler = () => {
            const text = binding.value;
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            textarea.remove();
            ElMessage.success('复制成功');
        };
        el.addEventListener('click', el.handler);
    },
    beforeUnmount(el) {
        // 解除事件绑定
        document.removeEventListener('click', el.handler);
    },
};
