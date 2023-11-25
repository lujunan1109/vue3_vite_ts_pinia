<template>
    <el-button type="info" @click="handleClick">
        <slot></slot>
    </el-button>
    <el-button type="success" @click="customClick"
        >点击触发自定义事件
    </el-button>
    <el-dialog v-model="visible" :title="title"> </el-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// const props = defineProps({
//     modelValue: {
//         type: Boolean,
//         default: false,
//     },
//     title: {
//         type: String,
//         default: '弹窗标题',
//     },
// });

// ts way
const props = withDefaults(
    defineProps<{
        modelValue: boolean;
        title: string;
    }>(),
    {
        modelValue: false,
        title: '弹窗标题',
    },
);

const emits = defineEmits(['update:modelValue', 'setTitle']);
const visible = computed({
    get: () => props.modelValue,
    set: (val) => {
        emits('update:modelValue', val);
    },
});
const handleClick = () => {
    emits('update:modelValue', !props.modelValue);
};

const customClick = () => {
    emits('setTitle');
};
</script>
