<template>
    <div class="home-container">
        <div class="flex-layout m-10">
            <div
                v-for="(item, index) in getHeaderData"
                :key="index"
                class="top-content box-shadow-bg"
            >
                <div class="avatar-data">
                    <el-avatar
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                    />
                </div>
                <div class="data-info">
                    <div>{{ item.num }}</div>
                    <div class="data-title">{{ item.name }}</div>
                </div>
                <span class="data-num">+2.5%</span>
            </div>
        </div>

        <div id="line" class="mid-content box-shadow-bg"></div>

        <div class="flex-layout m-10">
            <div
                v-for="item in 3"
                :id="`bg${item}`"
                :key="item"
                class="footer-content box-shadow-bg"
            ></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import * as echarts from 'echarts';
import { useMenuStore } from '@/store/menu';
import { storeToRefs } from 'pinia';
import {
    hisOption,
    hisOptionDark,
    pieOption,
    pieOptionDark,
    lineOption,
    lineOptionDark,
    barOption,
    barOptionDark,
} from '@/assets/config.js';
import { useGlobalStore } from '@/store/global';
const globalStore = useGlobalStore();
const { proxy } = getCurrentInstance();

const getHeaderData = [
    {
        name: '访问数',
        num: 2134,
    },
    {
        name: '下载量',
        num: 1234,
    },
    {
        name: '销售额',
        num: 2324,
    },
    {
        name: '新用户数',
        num: 264,
    },
];
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
    proxy.$message({
        message: textInner(),
        type: 'success',
    });

    init('line', globalStore.theme === 'light' ? hisOption : hisOptionDark);
    init('bg1', globalStore.theme === 'light' ? pieOption : pieOptionDark);
    init('bg2', globalStore.theme === 'light' ? lineOption : lineOptionDark);
    init('bg3', globalStore.theme === 'light' ? barOption : barOptionDark);
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

.flex-layout {
    display: flex;
    justify-content: space-between;
}

.m-10 {
    margin: 0 -10px;
}

.top-content {
    position: relative;
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
    & .data-num {
        position: absolute;
        right: 20px;
        bottom: 20px;
        font-size: 12px;
        font-weight: 300;
        color: #f56c6c;
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
    margin: 10px 0;
}

.footer-content {
    width: 33%;
    height: 300px;
    padding: 20px;
    margin: 0 10px;
}

.mouse-hand {
    cursor: pointer;
}
</style>
