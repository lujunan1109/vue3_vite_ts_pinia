<!--
 * @Author: lujunan
 * @Date: 2022-08-08 11:34:41
 * @LastEditors: lujunan
 * @LastEditTime: 2022-12-08 16:14:38
 * @Description: Do not edit
-->

<template>
    <div class="swiper-movie">
        <img class="s-pic" :src="coverImg" @error="() => errHandle()" />
        <p class="s-name">{{ props.text }}</p>
        <div class="s-rank">
            <el-rate
                disabled
                show-score
                text-color="#ff9900"
                score-template="{coverRate}"
            />
        </div>
        <el-button class="s-btn" type="primary">详情</el-button>
    </div>
</template>

<script lang="ts" setup>
import defaultImg from '@/assets/logo.png';

const props = defineProps({
    text: { type: String, required: true },
    rate: { type: Number, default: null },
    imgSrc: { type: String, required: true },
});

const coverImg = ref(props.imgSrc);

const errHandle = () => {
    coverImg.value = defaultImg;
};
</script>

<style scoped lang="scss">
.swiper-movie {
    width: 115px;
    height: 250px;
    display: flex;
    flex-direction: column;
    .s-pic {
        height: 162px;
        margin-bottom: 12px;
    }
    .s-name {
        height: 22px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .s-rank {
        height: 19px;
    }
    .s-btn {
        width: 90px;
        height: 24px;
        margin: auto;
    }
}
</style>
