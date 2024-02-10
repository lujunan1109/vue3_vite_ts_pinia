<template>
    <el-autocomplete
        v-model="state"
        :fetch-suggestions="querySearch"
        placeholder="搜索关键字"
        clearable
        class="auto-comp"
        @select="handleSelect"
    >
        <template #default="{ item }">
            <div class="value">{{ item.value }}</div>
        </template>
    </el-autocomplete>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useGlobalStore } from '@/store/global';
import { onMounted, ref } from 'vue';

interface LinkItem {
    value: string;
    link: string;
}

const state = ref('');
const links = ref<LinkItem[]>([]);
const globalStore = useGlobalStore();

const querySearch = (queryString: string, cb) => {
    const results = queryString
        ? links.value.filter(createFilter(queryString))
        : links.value;
    // call callback function to return suggestion objects
    cb(results);
};
const createFilter = (queryString) => {
    return (restaurant) => {
        return (
            restaurant.value
                .toLowerCase()
                .indexOf(queryString.toLowerCase()) === 0
        );
    };
};
const loadAll = () => {
    return [
        {
            value: '登录',
            link: '/login',
        },
        {
            value: '首页',
            link: '/home',
        },
        {
            value: '主题切换',
            link: '/theme',
        },
        {
            value: '传送门',
            link: '/teleport',
        },
        {
            value: '功能模块',
            link: '/function',
        },
        {
            value: '表格',
            link: '/table',
        },
        {
            value: '多选树',
            link: '/tree',
        },
        {
            value: '表单',
            link: '/vform',
        },
        {
            value: '组件模块',
            link: '/component',
        },
        {
            value: '用户权限',
            link: '/permisssion',
        },
        {
            value: '编辑器',
            link: '/editor',
        },
    ];
};
const $router = useRouter();
const handleSelect = (item: LinkItem) => {
    $router.push({ path: item.link });
    globalStore.setLoading(false);
};

// const handleIconClick = (ev: Event) => {
//     console.log(ev);
// };

onMounted(() => {
    links.value = loadAll();
});
</script>

<style lang="scss">
.auto-comp {
    margin: 10px 20px 5px 20px;
}
.auto-comp > .el-input {
    width: 300px;
    height: 50px;
}
</style>
