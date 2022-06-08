<!--
 * @Description: svg图片组件
 * @Author: lujunan
 * @Date: 2022-06-07 14:26:26
 * @LastEditors: lujunan
 * @LastEditTime: 2022-06-07 14:26:28
-->

<template>
    <svg
        aria-hidden="true"
        class="svg-icon"
        :width="props.size"
        :height="props.size"
    >
        <use :xlink:href="symbolId" :fill="props.color" />
    </svg>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
    prefix: {
        type: String,
        default: 'icon',
    },
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: '#333',
    },
    size: {
        type: String,
        default: '1em',
    },
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>
