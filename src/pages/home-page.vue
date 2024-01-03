<template>
    <div class="home-container">
        <div class="top-content box-shadow-bg">
            <div class="avatar-data">
                <el-avatar
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                />管理员{{ textInner() }}
            </div>
            <el-tag class="mouse-hand" @click="goGithub">github地址 </el-tag>
        </div>

        <div id="bg" class="mid-content box-shadow-bg">图表$曲线图</div>

        <div id="line" class="footer-content box-shadow-bg">底部三个图</div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import * as echarts from 'echarts';
import { useMenuStore } from '@/store/menu';
import { useGlobalStore } from '@/store/global';
import { storeToRefs } from 'pinia';
import { option, hisOption2, hisOption } from '@/assets/config.js';

const globalStore = useGlobalStore();
const { theme } = storeToRefs(globalStore);

// 设置主题的opt
const setThemeOpt = {
    line: option,
    bg: theme.value === 'light' ? hisOption : hisOption2,
};
// 初始化
const initEcharts = () => {
    const echartsList = ['line', 'bg'];
    echartsList.forEach((id) => {
        const opt = setThemeOpt[id];
        const chartDom = document.getElementById(id);
        const myChart = echarts.init(chartDom);
        myChart.setOption(opt);
        ecahrtGrounp.push({ myChart, opt });
    });
};

// 重绘图标
const redraw = () => {
    ecahrtGrounp.forEach((cfg) => {
        const { myChart, opt } = cfg;
        myChart.clear();
        myChart.resize();
        opt && myChart.setOption(opt);
    });
};

// 切换菜单宽度时候重置echart
const menuStore = useMenuStore();
let { menueWidthState } = storeToRefs(menuStore);

watch(menueWidthState, (nv) => {
    // 由于切换菜单有性能问题，div宽度变化在echart渲染之后导致的bug
    const t = setTimeout(() => {
        redraw();
        clearTimeout(t);
    }, 500);
});

// 实例收集
let ecahrtGrounp = [];
onMounted(() => {
    initEcharts();
    window.addEventListener('resize', redraw, false);
});

onUnmounted(() => {
    window.removeEventListener('resize', redraw, false);
});

const goGithub = () => {
    window.open('https://github.com/lujunan1109/vue3_vite_ts_pinia', '_blank');
};

const textInner = () => {
    const d = new Date();
    const hours = d.getHours();
    if (18 <= hours && hours <= 24) return '晚上好';
    if (12 <= hours && hours <= 18) return '中午好';
    if (6 <= hours && hours <= 12) return '早上好';
    if (0 <= hours && hours <= 6) return '凌晨好';
};
</script>

<style scoped lang="scss">
$el-text-color-regular: #606266;
$el-bg-color-overlay: #1d1d1d;
$el-border-color: #dcdfe6;
$el-box-shadow-dark: 0px 16px 48px 16px rgba(0, 0, 0, 0.08),
    0px 12px 32px rgba(0, 0, 0, 0.12), 0px 8px 16px -8px rgba(0, 0, 0, 0.16);

.home-container {
    padding: 10px;
}

.box-shadow-bg {
    font-weight: 700;
    color: --el-text-color-regular;
    border-color: $el-border-color;
    box-shadow: $el-box-shadow-dark;
    @include useTheme('background-color', $bg-color);
}

.top-content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20px;
    height: 40px;
    & .avatar-data {
        display: flex;
        align-items: center;
        color: --el-text-color-regular;
    }
}

.mid-content {
    height: 300px;
    padding: 20px;
    margin: 20px 0;
}

.footer-content {
    height: 300px;
    padding: 20px;
}

.mouse-hand {
    cursor: pointer;
}
</style>
