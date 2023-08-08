<template>
    <div>
        <!--表单框架：model就是传入的表单对象，rules就是传入的验证对象 -->
        <el-form
            v-bind="$attrs"
            ref="form"
            :validate-on-rule-change="false"
            :model="model"
            :rules="rules"
        >
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, ref } from 'vue';

export default defineComponent({
    name: 'LibForm',
    // 注册你的组件
    components: {},
    props: {
        model: {
            type: Object,
            default: () => {
                return {
                    test: 2,
                };
            },
        },
        rules: {
            type: Object,
            default: () => {
                return { test: 1 };
            },
        },
    },

    // 定义一个组件的 emitted 事件，当在 emits 选项中定义了原生事件 (如 click) 时，将使用组件中的事件替代原生事件侦听器。
    emits: {
        click: (evt: MouseEvent) => evt instanceof MouseEvent,
    },
    setup(props, { attrs, slots, emit, expose }) {
        const { proxy } = getCurrentInstance() as any; // 全局变量代理，用于使用 app.config.globalProperties.xxx 挂载的参数，也可以不用断言用`.?`
        let datas = (props as any).datas; // 父组件数据

        return {
            proxy,
            attrs, // Attribute (非响应式对象，等同于 attrs)，有状态，会随组件本身的更新而更新
            slots, // 插槽 (非响应式对象，等同于 slots)，有状态，会随组件本身的更新而更新
            emit, // 触发事件 (方法，等同于 emit)
            expose, // 暴露公共 property (函数)
        };
    },
});
</script>

<style lang="scss" scoped>
// @import "xxx";
// @import url(xxx);
</style>
