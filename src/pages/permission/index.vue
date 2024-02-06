<template>
    <div class="permission">
        <el-radio-group v-model="radio" size="large" @change="changeRadio">
            <el-radio-button label="admin" />
            <el-radio-button label="test" />
        </el-radio-group>
    </div>
</template>

<script setup lang="ts">
import { Ref } from 'vue';
import { useLoginStore } from '@/store/login';

const loginStore = useLoginStore();
const radio: Ref<string> = ref(loginStore.switchMenu);
const changeRadio = (val: string): void => {
    radio.value = val;
    loginStore.setRole(val);
    loginStore.getRouter();
};
</script>

<style lang="scss" scoped>
.permission {
    padding: 15px;
}
</style>
