<!--
 * @Author: lujunan
 * @Date: 2022-07-12 18:03:34
 * @LastEditors: lujunan
 * @LastEditTime: 2022-08-08 14:30:06
 * @Description: 放大镜
-->
<script lang="ts" setup name="GoodsImage">
import { ref } from 'vue';
import { useMouseInElement, useLocalStorage } from '@vueuse/core';
import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';
const target = ref(null);
// isOutside是否进入指定区域 进入区域为false离开为false
// elementX 鼠标X位置
// elementY 鼠标Y位置
const { isOutside, elementX, elementY } = useMouseInElement(target); // useMouseInElement(指定的区域)鼠标进入的位置

useLocalStorage('key', 'value');

const $router = useRouter();
const images = ref(
    'https://images.mepai.me/app/works/178221/2022-07-14/w_62d01aa163e45/062d01aa163f41.jpg!1200w.jpg',
);
const position = computed(() => {
    // 根据鼠标的位置控制遮罩层的位置移动范围
    let x = elementX.value - 100;
    let y = elementY.value - 100;
    x = x < 0 ? 0 : x;
    y = y < 0 ? 0 : y;
    x = x > 200 ? 200 : x;
    y = y > 200 ? 200 : y;
    return {
        x,
        y,
    };
});

// 处理初始化出现移动遮罩和放大区域的问题
let i = ref(0);
let flag = ref(false);

watch(isOutside, (pre, cur) => {
    console.log(pre, cur, '监听', isOutside.value);
    if (i.value === 0) {
        flag.value = false;
        i.value++;
    } else {
        flag.value = cur;
    }
});
</script>

<template>
    <!-- {{isOutside}}
   X: {{elementX}}
   Y: {{elementY}} -->
    <div class="goods-image">
        <!-- 显示在右侧的放大之后的区域 -->
        <div
            v-show="flag"
            ref="largeRef"
            class="large"
            :style="[
                {
                    backgroundImage: 'url(' + images + ')',
                    backgroundPosition: `-${position.x * 2}px -${
                        position.y * 2
                    }px`,
                },
            ]"
        ></div>

        <div ref="target" class="middle">
            <img
                :src="images"
                alt=""
                @error="() => require('@assets/logo.png')"
            />
            <!-- 移动遮罩 -->
            <div
                v-show="flag"
                ref="layerRef"
                class="layer"
                :style="{ left: position.x + 'px', top: position.y + 'px' }"
            ></div>
        </div>
        <el-button
            @click="
                () =>
                    $router.push({
                        name: 'keep',
                        params: { username: 'eduardo' },
                    })
            "
        ></el-button>
    </div>
</template>

<style scoped lang="scss">
.goods-image {
    width: 480px;
    height: 400px;
    position: relative;
    display: flex;
    z-index: 500;
    .large {
        position: absolute;
        top: 0;
        left: 412px;
        width: 400px;
        height: 400px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        background-repeat: no-repeat;
        // 放大一倍
        background-size: 800px 800px;
        background-color: #f8f8f8;
    }
    .middle {
        // 初始化不让放大镜出现
        width: -400px;
        height: -400px;
        background: #f5f5f5;
        position: relative;
        cursor: move;
        img {
            width: 400px;
            height: 400px;
        }
        .layer {
            width: 200px;
            height: 200px;
            background: rgba(0, 0, 0, 0.2);
            left: 0;
            top: 0;
            // 可以移动
            position: absolute;
        }
    }
    .small {
        width: 80px;
        li {
            width: 68px;
            height: 68px;
            margin-left: 12px;
            margin-bottom: 15px;
            cursor: pointer;
            &:hover,
            &.active {
                border: 2px solid red;
            }
        }
    }
}
</style>
