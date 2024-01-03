<template>
    <div class="v-dialog">
        <el-dialog
            v-bind="$attrs"
            v-model="visible"
            :append-to-body="true"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
        >
            <slot></slot>
            <template #footer>
                <div v-if="defautFooter">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="saveSubmit">
                        确 定
                    </el-button>
                </div>
                <slot v-else name="footer"></slot>
            </template>
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, useAttrs } from 'vue';
// 不让组件自动继承
// defineOptions({
//   inheritAttrs: false
// })
// 获取属性值
// const attrs = useAttrs();
// console.log(attrs, 'attrs');
const dialogVisible = ref(false);

const toggleDialogVisible = (bool: boolean) => {
    if (bool === true || bool === false) {
        dialogVisible.value = bool;
    } else {
        dialogVisible.value = !dialogVisible.value;
    }
};
withDefaults(
    defineProps<{
        defautFooter: boolean;
    }>(),
    {
        defautFooter: true,
    },
);

// 单向传递数据流
const visible = computed({
    get() {
        return dialogVisible.value;
    },
    set(val: boolean) {
        return (dialogVisible.value = val);
    },
});

// 暴露给父组件调用的属性和方法
defineExpose({
    toggleDialogVisible,
});

const emit = defineEmits(['saveSubmit']);
const saveSubmit = () => {
    emit('saveSubmit');
};
</script>
