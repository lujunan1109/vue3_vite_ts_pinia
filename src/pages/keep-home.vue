<!--
 * @Author: lujunan
 * @Date: 2022-08-08 11:34:41
 * @LastEditors: lujunan
 * @LastEditTime: 2022-12-06 10:47:26
 * @Description: Do not edit
-->

<template>
    <div id="myscrollbox" ref="el">
        <div
            v-for="(items, inx) in colorList"
            :key="inx"
            class="w-h"
            :style="[{ background: items.color }]"
        ></div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onUnmounted, onMounted } from 'vue';

const colorList = reactive([
    { color: 'red' },
    { color: 'yellow' },
    { color: '#eee' },
    { color: 'blue' },
    { color: 'green' },
    { color: 'white' },
]);

// 循环输出list里面的数据
const looperFunc = (delay) => {
    let i = 0;
    setInterval(() => {
        if (i === colorList.length) {
            i = 0;
        }
        console.log(colorList[i].color);
        i++;
    }, delay);
};

const scrollFunc = function () {
    let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
    console.log(scrollTop, '滚动距离');

    if (scrollTop > 500) {
        // 展示top飛行頂部的按鈕
    }
};
const el = ref(null);

onMounted(() => {
    window.addEventListener('scroll', scrollFunc);
});

onUnmounted(() => {
    window.removeEventListener('scroll', scrollFunc);
});
</script>

<style scoped lang="scss">
.w-h {
    width: 100%;
    height: 100vh;
}
</style>
