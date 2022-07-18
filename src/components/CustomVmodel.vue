<!--
 * @Author: lujunan
 * @Date: 2022-07-13 09:19:33
 * @LastEditors: lujunan
 * @LastEditTime: 2022-07-13 10:58:44
 * @Description: v-model的自定义修饰符
-->
<template>
    <button v-if="type === 'customize'" @click="changTitle">
        修改标题为大写
    </button>
    <input
        v-if="type === 'default'"
        v-model="props.modelValue"
        @input="changInput"
    />
</template>
<script lang="ts" setup>
interface Props {
    type: string;
    title?: string;
    titleModifiers?: { toupper: boolean };
    // 如果父组件简写成v-model 则props能收到以下参数
    modelValue?: string;
    modelModifiers?: { slice: boolean };
}
const props = defineProps<Props>();
const emit = defineEmits(['update:title', 'update:modelValue']);
const changTitle = () => {
    if (props.titleModifiers?.toupper) {
        emit('update:title', props?.title?.toUpperCase());
    }
};

const changInput = () => {
    if (props.modelModifiers?.slice) {
        emit('update:modelValue', callBackFunc());
    }
};

const callBackFunc = () => {
    return (
        props.modelValue?.charAt(0)?.toUpperCase() + props.modelValue?.slice(1)
    );
};
</script>
