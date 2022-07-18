<!--
 * @Description: 首页
 * @Author: lujunan
 * @Date: 2022-06-07 10:14:22
 * @LastEditors: lujunan
 * @LastEditTime: 2022-07-18 17:43:41
-->

<template>
    <div ref="domRef">首页</div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
const domRef = ref(null);
nextTick(() => {
    console.log(domRef.value);
});
</script>

<style lang="scss" scoped>
// @import "xxx";
// @import url(xxx);
.home {
    width: 200px;
    height: 200px;
    border: 1px solid #ddd;
    cursor: pointer;
}

.style {
    margin: auto;
    width: 120px;
    display: flex;
    justify-content: space-between;
    i {
        font-size: 30px;
        display: block;
        // color: #00aeec;
        color: #61666d;
    }
}

.color {
    i {
        color: #00aeec;
    }
    transition: color 0.5s cubic-bezier(0.86, 0, 0.07, 1);
}
</style>
