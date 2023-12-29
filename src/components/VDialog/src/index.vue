<template>
    <div class="v-dialog">
        <el-dialog
            v-bind="$attrs"
            v-model="visible"
            :append-to-body="true"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :draggable="isDraggable"
            @close="dialogClose"
        >
            <slot name="body"></slot>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button
                        v-if="dialogType != 'readonlyDialog'"
                        type="primary"
                        @click="saveSubmit"
                    >
                        确 定
                    </el-button>
                </span>
            </template>
            <slot name="footer"></slot>
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
const attrs = useAttrs();
console.log(attrs, 'attrs');
const dialogVisible = ref(false);

const dialogClose = () => {
    console.log('弹窗关闭之后的回调');
};

// 可以直接使用
defineProps({
    dialogType: { type: String, default: '' },
    isDraggable: { type: Boolean, default: false },
});

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
    dialogVisible,
    dialogClose,
});

const emit = defineEmits(['saveSubmit']);
const saveSubmit = () => {
    emit('saveSubmit');
};
</script>
