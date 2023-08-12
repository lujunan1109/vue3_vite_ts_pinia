<!--
 * @Author: lujunan
 * @Date: 2022-06-27 09:58:13
 * @LastEditors: lujunan
 * @LastEditTime: 2023-08-10 22:46:08
 * @Description: Do not edit
-->
<template>
    <div>
        404页面
        <router-link :to="{ path: '/home', query: { t: new Date() } }"
            >Go to HOME</router-link
        >
        <router-link :to="{ path: '/404', query: { t: new Date() } }"
            >Go to 404</router-link
        >
        <HelloWorld :msg="msgProps" />
        <button @click="num1++">num1+1</button>
        <span>展示相加之后的数据{{ addNum }}</span>
        <img src="@/assets/404.png" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
// import { onBeforeRouteLeave } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import { useAdd } from '../components/useHook';
// import notFoundImg from '@/assets/404.png';

const msgProps = ref('子组件');
const num1 = ref(1);
const num2 = ref(2);
const { addNum, addFn } = useAdd({ num1, num2 });
addFn(num1.value, num2.value);
console.log(addNum, '返回数据');
// onBeforeRouteLeave((to, from) => {
//     const answer = window.confirm(
//         'Do you really want to leave? you have unsaved changes!',
//     );
//     // 取消导航并停留在同一页面上
//     if (!answer) return false;
// });
</script>

<style scoped></style>
