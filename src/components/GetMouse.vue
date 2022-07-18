<!--
 * @Author: lujunan
 * @Date: 2022-07-13 12:20:27
 * @LastEditors: lujunan
 * @LastEditTime: 2022-07-13 12:31:54
 * @Description: Do not edit
-->
<script setup>
import { onMounted, onUnmounted, reactive, toRefs } from 'vue';
// Implement ...
function useEventListener(target, event, callback) {
    onMounted(() => target.addEventListener(event, callback));
    onUnmounted(() => target.removeEventListener(event, callback));
}

// Implement ...
function useMouse() {
    let p = reactive({ x: 0, y: 0 });
    useEventListener(window, 'mousemove', (e) => {
        p.x = e?.pageX;
        p.y = e?.pageY;
    });
    return toRefs(p);
}
const { x, y } = useMouse();
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
