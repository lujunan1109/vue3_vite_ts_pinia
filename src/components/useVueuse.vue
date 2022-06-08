<!--
 * @Description: 使用vueuse
 * @Author: lujunan
 * @Date: 2022-06-07 10:21:58
 * @LastEditors: lujunan
 * @LastEditTime: 2022-06-07 10:24:25
-->
<template>
    <div class="vueuse">
        <h1>测试 vueUse 的鼠标坐标</h1>
        <h3>Mouse: {{ x }} x {{ y }}</h3>
    </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, ref } from 'vue';
import { useMouse } from '@vueuse/core';

export default defineComponent({
    name: 'VueUse',
    // 注册你的组件
    components: {},
    // props: {
    //   text: {
    //     type:String | Number,
    //     default: ''
    //   },
    //   is_right: Boolean,
    //   obj: {
    //     type: Object,
    //     default: ()=>{ return {xx:''} }
    //   }

    // },

    // 定义一个组件的 emitted 事件，当在 emits 选项中定义了原生事件 (如 click) 时，将使用组件中的事件替代原生事件侦听器。
    emits: {
        click: (evt: MouseEvent) => evt instanceof MouseEvent,
    },
    setup(props, { attrs, slots, emit, expose }) {
        const { x, y } = useMouse();

        return {
            x,
            y,
        };
    },

    methods: {},
});
</script>

<style lang="scss" scoped>
// @import "xxx";
// @import url(xxx);
</style>
