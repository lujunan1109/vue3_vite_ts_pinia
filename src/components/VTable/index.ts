import VTable from './src/index.vue';

// 一定要先给name赋值，这样后面的局部install和全局install方法才能读到同一个name
VTable.name = 'v-table';

// 为组件添加 install 方法，用于按需引入
// 如果想通过CDN方式引入，需要编写install函数
VTable.install = function (Vue: any) {
    // 注册组件
    Vue.component('VTable', VTable);
};
export default VTable;
