<template>
    <div class="home-container">
        <div class="flex-layout">
            <div
                v-for="item in 4"
                :key="item"
                class="top-content box-shadow-bg"
            >
                <div class="avatar-data">
                    <el-avatar
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                    />
                </div>
                <div class="data-info">
                    <div>233</div>
                    <div class="data-title">访问数</div>
                </div>
            </div>
        </div>

        <div id="line" class="mid-content box-shadow-bg">图表$曲线图</div>

        <div id="bg" class="footer-content box-shadow-bg">底部三个图</div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import * as echarts from 'echarts';
import { useMenuStore } from '@/store/menu';
import { storeToRefs } from 'pinia';
import { option, hisOption } from '@/assets/config.js';

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
    });
};

// 切换菜单宽度时候重置echart
const menuStore = useMenuStore();
let { menueWidthState } = storeToRefs(menuStore);

watch(menueWidthState, (nv) => {
    console.log('切换的时候出发', nv);
    // 由于切换菜单有性能问题，div宽度变化在echart渲染之后导致的bug
    const t = setTimeout(() => {
        redraw();
        clearTimeout(t);
    }, 500);
});

onMounted(() => {
    textInner();
    init('bg', option);
    init('line', hisOption);
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
@import '@/assets/theme.scss'; // 主题样式

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

.flex-layout {
    display: flex;
    justify-content: space-between;
    margin: 0 -10px;
}

.top-content {
    width: 25%;
    display: flex;
    align-items: center;
    padding: 20px;
    margin: 0 10px;
    height: 60px;
    border-radius: 5px;
    transition: transform 0.3s;
    &:hover {
        transform: scaleX(1.05) scaleY(1.05);
    }
    & .avatar-data {
        width: 50px;
        height: 50px;
        shape-outside: circle(50%);
    }

    & .data-info {
        font-weight: 600;
        font-size: 1.5rem;
        line-height: 2rem;
        & .data-title {
            font-size: 0.8rem;
            font-weight: 400;
            color: #606266;
            line-height: 1.5;
        }
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
