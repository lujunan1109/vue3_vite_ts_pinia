<template>
    <div>
        <h3>wangeditor 编辑器示例</h3>
        <div style="border: 1px solid #ccc">
            <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editorRef"
                :default-config="toolbarConfig"
                mode="default"
            />
            <Editor
                v-model="valueHtml"
                style="height: 500px; overflow-y: hidden"
                :default-config="editorConfig"
                mode="default"
                @on-created="handleCreated"
                @on-change="onChange"
            />
        </div>
        <div>内容展示：</div>
        <div v-html="getHtml"></div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { IToolbarConfig } from '@wangeditor/editor';
import '@wangeditor/editor/dist/css/style.css';

// 工具栏配置
const toolbarConfig: Partial<IToolbarConfig> = {};

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref('<p>hello</p>');

// 模拟 ajax 异步获取内容
onMounted(() => {
    setTimeout(() => {
        valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>';
    }, 1500);
});

const editorConfig = { placeholder: '请输入内容...' };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
});

const getHtml = ref('');
const handleCreated = (editor) => {
    editorRef.value = editor; // 记录 editor 实例，重要！
};

const onChange = (editor) => {
    getHtml.value = editor.getHtml();
};
</script>
