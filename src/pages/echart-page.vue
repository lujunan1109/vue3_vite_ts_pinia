<!--
 * @Description: 
 * @Author: lujunan
 * @Date: 2024-01-21 21:06:19
 * @LastEditors: lujunan
 * @LastEditTime: 2024-01-27 21:17:34
-->
<template>
    <div class="big-screen">
        <header class="header-nav"></header>
        <div class="container">
            <div class="left-content">
                <div id="line"></div>
                <div id="bg"></div>
            </div>
            <div id="waveOption" class="mid-content"></div>
            <div class="right-content">
                <div id="line2"></div>
                <div id="bg2"></div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { option, hisOption, waveOption } from '@/assets/config.js';
import * as echarts from 'echarts';
import autofit from 'autofit.js';
import { onMounted } from 'vue';

// 重置echart图表
let resetEcahrts = [];
const init = (id: string, opt, once = true) => {
    const chartDom = document.getElementById(id);
    const myChart = echarts.init(chartDom);
    opt && myChart.setOption(opt);
    // 只收集一次依赖
    if (once) {
        resetEcahrts.push({
            type: id,
            dom: myChart,
            opt,
        });
    }
};

// 重绘图标
const redraw = () => {
    resetEcahrts.forEach((cfg) => {
        const { dom: myChart, type, opt: option } = cfg;
        myChart.clear();
        myChart.resize();
        init(type, option, false);
        // reloadPage();
    });
};

const reloadPage = () => {
    window.location.reload();
};

onMounted(() => {
    init('bg', option);
    init('line', hisOption);
    init('bg2', option);
    init('line2', hisOption);
    init('waveOption', waveOption);
    window.addEventListener('resize', redraw, false);
    autofit.init({
        el: '#app',
        dh: 1080,
        dw: 1920,
        resize: true,
        ignore: [],
        transition: 0,
        delay: 0,
    });
});

onUnmounted(() => {
    window.removeEventListener('resize', redraw, false);
});
</script>
<style scoped lang="scss">
.big-screen {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    .header-nav {
        width: 100%;
        height: 80px;
        background-color: aqua;
    }
    .container {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .left-content,
        .right-content {
            display: flex;
            flex-direction: column;
            #line,
            #bg,
            #line2,
            #bg2 {
                width: 600px;
                height: 500px;
            }
        }
        .mid-content {
            width: 720px;
            height: 1000px;
        }
    }
}
</style>
