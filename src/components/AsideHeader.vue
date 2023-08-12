<template>
    <el-radio-group
        v-model="isCollapse"
        style="margin-bottom: 20px"
        @change="handleChange"
    >
        <el-radio-button :label="false">expand</el-radio-button>
        <el-radio-button :label="true">collapse</el-radio-button>
    </el-radio-group>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useMenuStore } from '@/store/menu';
import { storeToRefs } from 'pinia';
const menuStore = useMenuStore();
let { menueWidthState } = storeToRefs(menuStore);
const isCollapse = ref(menueWidthState);
const handleChange = (state) => {
    menueWidthState = state;
};
</script>
<style scoped lang="scss"></style>
