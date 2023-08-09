<template>
    <div class="home-page-swiper">
        <div class="db__content">
            <div class="db__nav">
                <div class="nav__logo"></div>
                <div class="nav__search">
                    <el-input
                        v-model="searchCtx"
                        placeholder="搜索人物/视频"
                    ></el-input>
                </div>
            </div>
            <div class="db__wrapper"></div>
        </div>
        <div class="main-content__nav">
            <div class="swiper-control__nav">
                <span @click="nextClik()">
                    <a href="javascript:void(0)" class="btn-next" />
                </span>
                <span @click="prevClik()">
                    <a href="javascript:void(0)" class="btn-prev"></a>
                </span>
                <span class="nav-pn">
                    {{ swiperPageNum + 1 }} / {{ getNumSlides }}</span
                >
            </div>
        </div>
        <div class="main-content">
            <div style="width: 675px; height: auto">
                <div class="light-swiper">
                    <div class="swiper-wrap">
                        <div
                            v-for="(item, inx) in swiperItemsData"
                            :key="inx"
                            class="swipe-item"
                        >
                            <img
                                :src="imagesUrl"
                                :alt="item.alt"
                                width="675"
                                height="300"
                            />
                        </div>
                    </div>
                </div>
                <div class="article-content"></div>
            </div>

            <div class="aside">
                <div class="history-rank">
                    <p class="start-rank">
                        历史得分前10球星
                        <router-link :to="{ path: '/more-rank' }">
                            <span class="more-rank">更多排名</span></router-link
                        >
                    </p>
                </div>
                <ul class="rank-list">
                    <li v-for="(item, inx) in hisStarData" :key="inx">
                        <!-- 链接到纪录片 -->
                        <p @click="goRecordVideo(item.url)">
                            {{ inx + 1 }}. {{ item.name }}
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, onUnmounted, onMounted } from 'vue';
import imagesUrl from '../assets/jianglin.webp';
import Swiper from 'light-swiper';

const doubanList = [
    '豆瓣',
    '读书',
    '电影',
    '音乐',
    '同城',
    '小组',
    '阅读',
    'FM',
    '时间',
    '豆品',
];

const swiperItemsData = [
    {
        ul: '',
        alt: '降临',
    },
    {
        ul: 'https://www.bilibili.com/video/BV1TZ4y1W7TG/?spm_id_from=333.999.0.0&vd_source=7a03cc8d77e2f6176697825736b7141a',
        alt: '降临',
    },
    {
        ul: 'https://www.bilibili.com/video/BV1TZ4y1W7TG/?spm_id_from=333.999.0.0&vd_source=7a03cc8d77e2f6176697825736b7141a',
        alt: '降临',
    },
    {
        ul: 'https://www.bilibili.com/video/BV1TZ4y1W7TG/?spm_id_from=333.999.0.0&vd_source=7a03cc8d77e2f6176697825736b7141a',
        alt: '降临',
    },
];

const hisStarData = [
    {
        id: 1,
        name: '勒布朗.詹姆斯',
        url: 'https://www.bilibili.com/video/BV1TZ4y1W7TG/?spm_id_from=333.999.0.0&vd_source=7a03cc8d77e2f6176697825736b7141a',
    },
    {
        id: 2,
        name: '卡里姆.阿布杜尔-贾巴尔',
    },
    {
        id: 3,
        name: '卡尔.马龙',
    },
    {
        id: 4,
        name: '科比.布莱恩特',
    },
    {
        id: 5,
        name: '迈克尔.乔丹',
    },
    {
        id: 6,
        name: '德克.诺维斯基',
    },
    {
        id: 7,
        name: '维尔特.张伯伦',
    },
    {
        id: 8,
        name: '朱丽叶斯.欧文',
    },
    {
        id: 9,
        name: '沙奎.奥尼尔',
    },
    {
        id: 10,
        name: '摩西.马龙',
    },
];

let mySwiper = null;
const searchCtx = ref('');
const swiperPageNum = ref(0);
const getNumSlides = ref(null);
// 事件处理
const prevClik = () => {
    mySwiper.prev();
};

const nextClik = () => {
    mySwiper.next();
};

const goRecordVideo = (link) => {
    window.open(link, '_blank');
};

watch(
    () => swiperPageNum.value,
    (count, prevCount) => {
        console.log(count, prevCount, '>>>>');
    },
);

onMounted(() => {
    mySwiper = new Swiper(document.querySelector('.light-swiper'), {
        width: 675,
        offset: 0,
        startSlide: 0,
        speed: 400,
        auto: 3000,
        continuous: true,
        disableScroll: false,
        stopPropagation: false,
        transitionEnd: function (index, elem) {
            swiperPageNum.value = mySwiper.getPos();
        },
    });

    getNumSlides.value = mySwiper.getNumSlides();
});

onUnmounted(() => {
    mySwiper.kill();
});
</script>

<style scoped lang="scss">
.home-page-swiper {
    overflow-y: auto;
}
.douban__header {
    width: 100%;
    height: 30px;
    background: #545652;
    ul {
        display: flex;
        margin: 0;
        li {
            list-style: none;
            margin-right: 10px;
            line-height: 30px;
            color: #d5d5d5;
            font-size: 12px;
            cursor: pointer;
            &:hover {
                color: #fff;
            }
        }
    }
}
.db__content {
    background: #f0f3f5;
    .db__nav {
        width: 1040px;
        height: 80px;
        margin: auto;
        display: flex;
        align-items: center;
        .nav__logo {
            width: 145px;
            height: 56px;
            margin-right: 20px;
            background: url('https://img3.doubanio.com/dae/accounts/resources/3e96b44/movie/assets/lg_movie_a12_2.png')
                center/contain no-repeat;
        }
        .nav__search {
            width: 470px;
        }
        .movie__annual {
            position: absolute;
            width: 186px;
            height: 96px;
            top: 10px;
            left: 50%;
            margin-left: 200px;
            background: url('https://img3.doubanio.com/dae/accounts/resources/3e96b44/movie/assets/annual_2021.png')
                center/contain no-repeat;
        }
    }
}
.main-content {
    width: 1024px;
    height: auto;
    margin: auto;
    display: flex;
    justify-content: space-between;
    .light-swiper {
        width: 675px;
        height: 300px;
        overflow: hidden;
        .swiper-wrap {
            .swipe-item {
                height: 300px;
                object-fit: contain;
                box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
            }
        }
    }
    .article-content {
        width: 100%;
        height: 700px;
        background: yellow;
    }
    .aside {
        width: 300px;
        height: 700px;
        .history-rank {
            display: flex;
            .start-rank {
                font-size: 18px;
                font-weight: bold;
                a {
                    text-decoration: none;
                }
                .more-rank {
                    font-size: 14px;
                    font-weight: normal;
                    color: #37a;
                }
            }
        }
        .rank-list {
            padding: 0;
            li {
                list-style: none;
                font-size: 14px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                padding: 10px 0;
                border-bottom: 1px solid #eaeaea;
                p:hover {
                    cursor: pointer;
                    font-weight: bold;
                    color: #37a;
                }
            }
        }
    }
}

.main-content__nav {
    width: 1024px;
    margin: auto;
    .swiper-control__nav {
        width: 675px;
        height: 30px;
        line-height: 30px;
        display: flex;
        justify-items: center;
        flex-direction: row-reverse;
        .btn-prev {
            background-position: 0 0;
        }
        .btn-next {
            background-position: -18px 0;
        }
        .nav-pn {
            margin-right: 10px;
        }
        a {
            position: relative;
            top: 6px;
            display: block;
            width: 18px;
            height: 18px;
            margin-left: 5px;
            cursor: pointer;
            background: url('https://img1.doubanio.com/f/movie/708be21a7bb2d0f21419dc4e2e2fde8b21ad661a/pics/movie/slide_swithc_2.png')
                no-repeat;
        }
    }
}

// extra style
.light-swiper {
    overflow: hidden;
    position: relative;
}

.swiper-wrap {
    overflow: hidden;
    position: relative;
}

.swipe-item {
    float: left;
    width: 100%;
    position: relative;
}
</style>
