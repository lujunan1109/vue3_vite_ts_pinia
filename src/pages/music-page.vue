<template>
    <div class="music-wrapper__inner">
        <div class="wave-container">
            <div
                v-for="(dItem, inx) in waveData"
                :key="inx"
                :class="`wave-${dItem}`"
            ></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
const waveData = reactive([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
</script>

<style lang="scss" scoped>
@function random-number($min, $max) {
    @return floor(random() * ($max - $min + 1)) + $min;
}

.music-wrapper__inner {
    width: 100%;
    height: 100%;
}

.wave-container {
    display: flex;
    justify-content: space-around;
    margin: auto;
    width: 800px;
    height: 400px;
    transform: rotate(180deg);
}

@for $i from 1 through 10 {
    $startHeightrandom: random-number(50, 150);
    $endHeightrandom: random-number(150, 250);
    .wave-#{$i} {
        position: relative;
        width: 40px;
        @include useTheme('background-color', $subtitle-color);
        overflow: hidden;
        animation: wave-animation-#{$i} 2s ease-in-out infinite;
    }

    @keyframes wave-animation-#{$i} {
        0% {
            height: #{$startHeightrandom}px;
        }

        50% {
            height: #{$endHeightrandom}px;
        }

        100% {
            height: #{$startHeightrandom}px;
        }
    }
}
</style>
