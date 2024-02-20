<template>
    <div class="icon-block">
        <div class="header-left-tab">
            <el-icon
                v-show="menueWidthState"
                size="normal"
                @click="handleClick(false)"
                ><Expand
            /></el-icon>
            <el-icon
                v-show="!menueWidthState"
                size="normal"
                @click="handleClick(true)"
                ><Fold
            /></el-icon>

            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{ path: '/home' }">
                    首页
                </el-breadcrumb-item>
                <el-breadcrumb-item
                    v-if="breadMenu.path !== '/home'"
                    :to="{ path: breadMenu.path }"
                    >{{ breadMenu.label }}</el-breadcrumb-item
                >
            </el-breadcrumb>
        </div>

        <div class="header-right-tab">
            <el-icon @click="globalStore.setLoading(true)"><Search /></el-icon>
            <i class="header-right-weather">{{ nowWeather }}</i>
            <el-icon v-if="isFullscreen" @click="fullScreen"
                ><FullScreen
            /></el-icon>
            <el-icon v-else @click="fullScreen"><RefreshLeft /></el-icon>

            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <el-icon><Operation /></el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="default"
                            >默认</el-dropdown-item
                        >
                        <el-dropdown-item command="large"
                            >大型</el-dropdown-item
                        >
                        <el-dropdown-item command="small"
                            >小型</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

            <div class="picker">
                <el-color-picker v-model="defaultTheme" @change="changeTheme" />
            </div>

            <div class="picker">
                <el-switch
                    v-model="isZh"
                    inline-prompt
                    active-text="中"
                    inactive-text="英"
                />
            </div>

            <div class="user-message" @click="drawerMsg = true">
                <el-icon><BellFilled /></el-icon>
                <span>3</span>
            </div>

            <el-dropdown @command="triggerCom">
                <span class="el-dropdown-link">
                    <el-image
                        style="width: 40px; height: 40px"
                        :src="userUrl"
                        fit="fill"
                    />
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="/home"
                            >首页</el-dropdown-item
                        >
                        <el-dropdown-item command="/login"
                            >退出</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
    <div class="keep-alive-tag">
        <el-tag
            v-for="tag in menuTags"
            :key="tag.name"
            class="mx-1"
            :closable="tag.name !== '首页'"
            size="large"
            :type="tag.type"
            :effect="tag.checked"
            @click="clickHandle(tag)"
            @close="handleClose(tag)"
        >
            {{ tag.name }}
        </el-tag>
    </div>

    <el-drawer
        v-model="drawerMsg"
        title="3条消息"
        direction="rtl"
        :with-header="true"
    >
        <div class="msg-ctx">
            <div v-for="item in 3" :key="item">消息展示{{ item }}</div>
        </div>
    </el-drawer>
</template>
<script setup lang="ts">
import { ref, inject } from 'vue';
import { useMenuStore } from '@/store/menu';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { ArrowRight } from '@element-plus/icons-vue';
import { useGlobalStore } from '@/store/global';
import userUrl from '@/assets/user.gif';
import screenfull from 'screenfull';
import { getTimeWeather } from '@/api/index.ts';
import { useElementPlusTheme } from 'use-element-plus-theme';
import { useLanguageStore } from '@/store/language';
import { userLogout } from '@/api';
import { captureAsyncErrors } from '@/utils';

import { Tag, Node, Func } from './type';

// 主颜色切换
const defaultTheme = ref('#405DFF');

// 根据高德地图api获取实时天气
const nowWeather = ref('');
const { changeTheme } = useElementPlusTheme(defaultTheme.value);

onBeforeMount(async () => {
    const { lives } = await getTimeWeather();
    const { city, weather, temperature } = lives[0];
    nowWeather.value = `${city} ${weather} ${temperature} ℃ `;
});

const $router = useRouter();
const menuStore = useMenuStore();

let { menueWidthState, menuTags, breadMenu } = storeToRefs(menuStore);

const handleClick = (state: boolean) => {
    menuStore.updateMenuState(state);
};

const handleClose = (tag: Tag) => {
    menuStore.deleteMenuTags(tag);
    if (menuTags.value.length === 0) {
        $router.push({ path: '/home' });
    } else {
        const lastTag = menuTags.value.slice(-1)[0];
        $router.push({ path: lastTag.path });
    }
};

const clickHandle = (tag: Tag) => {
    // 重置选中效果
    menuStore.resetCheckedMenuTags();
    // 跳转到选中页面
    $router.push({ path: tag.path });
    // 选中效果
    menuStore.checkedMenuTags(tag);
};

// 监听router获取面包屑数据
const currentPathNode = ref<Node>({ path: '', label: '' });
watch(
    () => $router.currentRoute.value,
    (toValue) => {
        if (toValue.path !== '/home') {
            currentPathNode.value = {
                path: toValue.path,
                label: toValue.meta.title as string,
            };
        }
    },
    { immediate: true, deep: true },
);

// 设置ui尺寸
const reloadPage: Func = inject('reloadPage');
const globalStore = useGlobalStore();
const handleCommand = (data) => {
    globalStore.setUiSize(data);
    reloadPage();
};

// 用户头像点击事件
import { ElMessage, ElMessageBox } from 'element-plus';
const triggerCom = (data) => {
    if (data === '/login') {
        ElMessageBox.confirm('你确定退出吗', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }).then(async () => {
            const [isErr, result] = await captureAsyncErrors(userLogout());
            if (result && !isErr) {
                localStorage.clear();
                ElMessage({
                    type: 'success',
                    message: '退出成功',
                });
            }
            $router.push({ path: data });
        });
    } else {
        $router.push({ path: data });
    }
};

// 全屏实现
const isFullscreen = ref(true);
const fullScreen = () => {
    // 当前全屏状态
    isFullscreen.value = screenfull.isFullscreen;
    if (!screenfull.isEnabled) {
        ElMessage({
            type: 'warning',
            message: '你的浏览器不支持全屏',
        });
    }
    screenfull.toggle();
};

// 消息点击展示
const drawerMsg = ref(false);

onMounted(() => {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'F11') {
            screenfull.toggle();
            event.preventDefault();
        }
    });
});

// 语言切换
const languageStore = useLanguageStore();
const isZh = ref(languageStore.language === 'zh');
import { useI18n } from 'vue-i18n';
const { locale } = useI18n();
watchEffect(() => {
    const local = isZh.value ? 'zh' : 'en';
    // 文字切换
    locale.value = local;
    languageStore.changeLanguage(local);
});
</script>
<style scoped lang="scss">
.icon-block {
    display: flex;
    align-items: center;
    background-color: var(--el-bg-color);
    height: 45px;
    justify-content: space-between;

    & .el-icon {
        cursor: pointer;
        padding-right: 20px;
    }

    & .header-right-tab {
        display: flex;
        align-items: center;

        & .header-right-weather {
            padding-right: 20px;
            font-size: 16px;
        }
    }

    & .header-left-tab {
        display: flex;
        align-items: center;
    }
}

.keep-alive-tag {
    height: 35px;

    & .mx-1 {
        margin-right: 5px;
        cursor: pointer;
    }
}

.picker {
    margin-right: 20px;
}

.user-message {
    position: relative;
    @include useTheme('color', $title-color);
    font-size: 20px;
    cursor: pointer;

    & span {
        display: inline-block;
        width: 15px;
        height: 15px;
        border-radius: 15px;
        background: red;
        position: absolute;
        font-size: 0.8rem;
        top: -5px;
        right: 12px;
        color: #fff;
        text-align: center;
        line-height: 1.2;
    }
}

.msg-ctx {
    & > div {
        margin: 15px 0;
        color: rgb(23, 14, 196);
        padding: 5px 10px;
        border-bottom: 1px solid #ccc;
        padding-bottom: 15px;
    }
}
</style>
