<template>
    <div v-show="data.modelValue">我是子组件的头部{{ data.modelValue }}</div>
    <button @click="change">点击我可以让头部消失{{ data.isShow }}</button>
    <p>{{ data.modelValue }}</p>
</template>

<script setup lang="ts">
type Props = {
    modelValue: string;
    isShow?: boolean;
    show?: boolean;
    modelValueModifiers?: {
        isBt: boolean;
    };
};

const data = defineProps<Props>();
console.log(data, '?');
const emit = defineEmits(['update:modelValue']);

const change = () => {
    emit(
        'update:modelValue',
        data?.modelValueModifiers?.isBt ? '小满是变态' : false,
    );
};
</script>
