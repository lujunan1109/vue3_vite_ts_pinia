<template>
    <div>
        <i>UFC287 FOR 黑龙</i>
        <div id="myscrollbox">
            <div
                v-for="(items, inx) in colorList"
                :key="inx"
                class="w-h pink"
                :style="[{ background: items.color }]"
            >
                {{ items.text }}
            </div>
            <el-button
                v-show="flyState"
                class="btn-top"
                type="danger"
                title="到达顶部"
                :icon="Top"
                circle
                @click="goTop"
            />
            <!-- 语音 -->
            <div class="radio-block">
                <el-icon @click.stop="allTextSpk"><Microphone /></el-icon>
                <el-icon @click.stop="handleStop"><Mute /></el-icon>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onUnmounted, onMounted } from 'vue';
import { Top } from '@element-plus/icons-vue';

let colorList = reactive([
    { color: '#989664', text: '嘿，静一静，我有一言请诸位静听', t: 0 },
    { color: '#999999', text: '我希望身处现场以及守在屏幕前的所有人', t: 4 },
    { color: '#339933', text: '都能体会到这种至极的喜悦 一生一次就好', t: 4 },
    { color: '#993366', text: '我希望所有人能体会到我是多么欣喜若狂 ', t: 4 },
    { color: '#FFA500', text: '但猜猜怎么着？', t: 4 },
    { color: '#FFC0CB', text: '在你自己的人生中', t: 2 },
    { color: '#FFC0CB', text: '当你被击坠于深渊', t: 2 },
    { color: '#FFC0CB', text: '当你受到周遭唾弃', t: 2 },
    { color: '#FFC0CB', text: '当你被贬得一文不值', t: 2 },
    { color: '#FFC0CB', text: '当你被命运扼住喉咙', t: 2 },
    { color: '#FFC0CB', text: '如果因此就范，便真的永无翻身之日', t: 2 },
    { color: '#FFC0CB', text: '给内心加个强化', t: 4 },
    { color: '#FFC0CB', text: '振奋起来去赢得像这样的畅快', t: 2 },
    { color: '#FFC0CB', text: '一生一次就好', t: 4 },
    { color: '#FFC0CB', text: '但我蒙受祝福', t: 2 },
    {
        color: '#FFC0CB',
        text: '得以在这辈子当中不断体会到如此跌宕的轮回',
        t: 2,
    },
]);

// 输出16进制随机的颜色
const randomColorRender = () => {
    const enumString = '0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F';
    const enumArr = enumString.split(',');

    let sixStr = '';
    for (let index = 0; index < 6; index++) {
        sixStr += enumArr[Math.floor(Math.random() * enumArr.length)];
    }
    return `#${sixStr}`;
};

console.log(randomColorRender());

// 赋值随机颜色逻辑
colorList = colorList.map((e) => {
    e.color = randomColorRender();
    return e;
});

// 飞行按钮展示状态
const flyState = ref(false);
let listenDom: null | HTMLElement = null;
const scrollFunc = function () {
    let scrollTop = listenDom.scrollTop || listenDom.scrollTop;

    if (scrollTop > 500 && !flyState.value) {
        flyState.value = true;
    } else if (flyState.value && scrollTop < 500) {
        flyState.value = false;
    }
};
const goTop = () => {
    listenDom.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
};

let spkState = false;
const synth = window.speechSynthesis; // 启用文本
const msg = new SpeechSynthesisUtterance(); // 表示一次发音请求。其中包含了将由语音服务朗读的内容，以及如何朗读它（例如：语种、音高、音量）。
// 所有文字播报
const allTextSpk = async () => {
    spkState = false;
    for (let index = 0; index < colorList.length; index++) {
        await sleep(colorList[index].t);
        handleSpeak(colorList[index].text);
        if (index === 15) {
            setTimeout(() => {
                handleStop();
            }, 4000);
        }
    }
};

// 语音播报的函数
const handleSpeak = (text) => {
    msg.text = text; // 文字内容: 测试内容
    msg.lang = 'zh-CN'; // 使用的语言:中文
    msg.volume = 1; // 声音音量：1
    msg.rate = 1; // 语速：1
    msg.pitch = 1; // 音高：1
    !spkState && synth.speak(msg); // 播放
};
// 语音停止
const handleStop = () => {
    synth.cancel(); // 取消该次播报
    spkState = true;
};

const sleep = (t) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(t);
        }, t * 1000);
    }).catch((e) => {
        console.error(e);
    });
};

// 监听逻辑
onMounted(() => {
    listenDom = document.querySelector('.common-layout-main .com-style-pub');
    listenDom.addEventListener('scroll', scrollFunc);
});

onUnmounted(() => {
    listenDom.removeEventListener('scroll', scrollFunc);
});
</script>

<style scoped lang="scss">
.w-h {
    width: 100%;
    height: 100vh;
    line-height: 100vh;
    text-align: center;
}
.btn-top {
    position: fixed;
    right: 50px;
    bottom: 100px;
}

.pink {
    filter: brightness(110%);
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #e91e63,
        0 0 35px #e91e63, 0 0 40px #e91e63, 0 0 50px #e91e63, 0 0 75px #e91e63;
    animation: pink-animation 1.5s ease-in-out infinite alternate;
}

@keyframes pink-animation {
    to {
        text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff,
            0 0 40px #e91e63, 0 0 70px #e91e63, 0 0 80px #e91e63,
            0 0 100px #e91e63, 0 0 150px #e91e63;
    }
}

.radio-block {
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5px;
    width: 50px;
    height: 30px;
    border-radius: 5px;
    background: rgba(204, 204, 204, 0.9);
    & .el-icon {
        cursor: pointer;
    }
}
</style>
