<!--
 * @Author: lujunan
 * @Date: 2022-07-08 15:04:37
 * @LastEditors: lujunan
 * @LastEditTime: 2022-07-08 15:32:01
 * @Description: Do not edit
-->

<template>
    <div v-for="item in props.data" :key="item.key">
        <div>{{ item.title }}</div>
        <div v-if="isArray(item.children)">
            <tree-page :data="item.children"></tree-page>
        </div>
    </div>
</template>

<script setup>
const isArray = (val) => {
    return Array.isArray(val);
};

const props = defineProps({
    data: {
        type: Array,
        default: () => [],
    },
});
</script>
