// 引用 Mock

import Mock from 'mockjs';

export const userData = Mock.mock('/data/list', 'get', {
    // 属性 list 的值是一个数组，随机生成 1 到 10 个元素
    'data|10': [
        {
            // 随机生成1-10个★
            'string|1': '★',
            name: '@cname',
            address: '@county(true)',
            'age|18-60': 1,
            'sex|1': ['男', '女'],
            email: '@email',
            date: '@datetime()',
        },
    ],
    code: 200,
    message: 'ok',
});

// 定义树节点数据的规则
export const authTreeData = Mock.mock('/data/tree', 'get', {
    data: [
        {
            'id|+1': 1,
            label: '@ctitle(3, 5)',
            'children|0-3': [
                {
                    'id|+1': 1,
                    label: '@ctitle(3, 5)',
                    'children|0-2': [
                        {
                            'id|+1': 1,
                            label: '@ctitle(3, 5)',
                            'children|0-1': [],
                        },
                    ],
                },
            ],
        },
    ],
});

// 登录接口
export const login = Mock.mock('/login', 'post', {
    code: 200,
    message: 'ok',
    data: {
        token: 'admin',
        routes: [
            {
                path: '/function',
                name: 'Function',
                meta: {
                    title: '功能模块',
                    keepAlive: false,
                    requireAuth: true,
                    index: 6,
                    icon: 'Suitcase',
                },
                component: '/main',
                children: [
                    {
                        path: '/theme',
                        name: 'Theme',
                        meta: {
                            title: '主题切换',
                            keepAlive: false,
                            requireAuth: true,
                            index: 11,
                            icon: 'Guide',
                        },
                        component: '/func/toggle',
                    },
                    {
                        path: '/teleport',
                        name: 'Teleport',
                        meta: {
                            title: '传送门',
                            keepAlive: false,
                            requireAuth: true,
                            index: 11,
                            icon: 'Bicycle',
                        },
                        component: '/func/teleport',
                    },
                ],
            },
            {
                path: '/component',
                name: 'Component',
                meta: {
                    title: '组件模块',
                    keepAlive: false,
                    requireAuth: true,
                    index: 6,
                    icon: 'Box',
                },
                component: '/main',
                children: [
                    {
                        path: '/table',
                        name: 'Table',
                        meta: {
                            title: '表格',
                            keepAlive: false,
                            requireAuth: true,
                            index: 8,
                            icon: 'TrendCharts',
                        },
                        component: '/comp/table',
                    },
                    {
                        path: '/tree',
                        name: 'Tree',
                        meta: {
                            title: '多选树',
                            keepAlive: false,
                            requireAuth: true,
                            index: 10,
                            icon: 'Checked',
                        },
                        component: '/comp/tree',
                    },

                    {
                        path: '/vform',
                        name: 'Form',
                        meta: {
                            title: '表单',
                            keepAlive: false,
                            requireAuth: true,
                            index: 12,
                            icon: 'List',
                        },
                        component: '/comp/vform',
                    },
                ],
            },
            {
                path: '/permission',
                name: 'Permission',
                meta: {
                    title: '用户权限',
                    keepAlive: false,
                    requireAuth: true,
                    index: 3,
                    icon: 'UserFilled',
                },
                component: '/permission/index',
            },
            {
                path: '/editor',
                name: 'Editor',
                meta: {
                    title: '编辑器',
                    keepAlive: false,
                    requireAuth: true,
                    index: 3,
                    icon: 'Management',
                },
                component: '/editor/index',
            },
        ],
    },
});

// 退出登录
export const logout = Mock.mock('/logout', 'post', {
    code: 200,
    message: 'ok',
    data: {},
});

// 返回admin异步路由
export const asyncRoutes = Mock.mock('/router', 'post', {
    code: 200,
    message: 'ok',
    data: {
        routes: [
            {
                path: '/function',
                name: 'Function',
                meta: {
                    title: '功能模块',
                    keepAlive: false,
                    requireAuth: true,
                    index: 6,
                    icon: 'Suitcase',
                },
                component: '/main',
                children: [
                    {
                        path: '/theme',
                        name: 'Theme',
                        meta: {
                            title: '主题切换',
                            keepAlive: false,
                            requireAuth: true,
                            index: 11,
                            icon: 'Guide',
                        },
                        component: '/func/toggle',
                    },
                    {
                        path: '/teleport',
                        name: 'Teleport',
                        meta: {
                            title: '传送门',
                            keepAlive: false,
                            requireAuth: true,
                            index: 11,
                            icon: 'Bicycle',
                        },
                        component: '/func/teleport',
                    },
                ],
            },
            {
                path: '/component',
                name: 'Component',
                meta: {
                    title: '组件模块',
                    keepAlive: false,
                    requireAuth: true,
                    index: 6,
                    icon: 'Box',
                },
                component: '/main',
                children: [
                    {
                        path: '/table',
                        name: 'Table',
                        meta: {
                            title: '表格',
                            keepAlive: false,
                            requireAuth: true,
                            index: 8,
                            icon: 'TrendCharts',
                        },
                        component: '/comp/table',
                    },
                    {
                        path: '/tree',
                        name: 'Tree',
                        meta: {
                            title: '多选树',
                            keepAlive: false,
                            requireAuth: true,
                            index: 10,
                            icon: 'Checked',
                        },
                        component: '/comp/tree',
                    },

                    {
                        path: '/vform',
                        name: 'Form',
                        meta: {
                            title: '表单',
                            keepAlive: false,
                            requireAuth: true,
                            index: 12,
                            icon: 'List',
                        },
                        component: '/comp/vform',
                    },

                    {
                        path: '/upload',
                        name: 'Upload',
                        meta: {
                            title: '上传',
                            keepAlive: false,
                            requireAuth: true,
                            index: 12,
                            icon: 'Upload',
                        },
                        component: '/comp/upload',
                    },
                ],
            },
            {
                path: '/permission',
                name: 'Permission',
                meta: {
                    title: '用户权限',
                    keepAlive: false,
                    requireAuth: true,
                    index: 3,
                    icon: 'UserFilled',
                },
                component: '/permission/index',
            },
            {
                path: '/editor',
                name: 'Editor',
                meta: {
                    title: '编辑器',
                    keepAlive: false,
                    requireAuth: true,
                    index: 3,
                    icon: 'Management',
                },
                component: '/editor/index',
            },
        ],
    },
});

// 返回test异步路由
export const asyncTestRoutes = Mock.mock('/router/test', 'post', {
    code: 200,
    message: 'ok',
    data: {
        routes: [
            {
                path: '/component',
                name: 'Component',
                meta: {
                    title: '组件模块',
                    keepAlive: false,
                    requireAuth: true,
                    index: 6,
                    icon: 'Box',
                },
                component: '/main',
                children: [
                    {
                        path: '/table',
                        name: 'Table',
                        meta: {
                            title: '表格',
                            keepAlive: false,
                            requireAuth: true,
                            index: 8,
                            icon: 'TrendCharts',
                        },
                        component: '/comp/table',
                    },
                    {
                        path: '/tree',
                        name: 'Tree',
                        meta: {
                            title: '多选树',
                            keepAlive: false,
                            requireAuth: true,
                            index: 10,
                            icon: 'Checked',
                        },
                        component: '/comp/tree',
                    },

                    {
                        path: '/vform',
                        name: 'Form',
                        meta: {
                            title: '表单',
                            keepAlive: false,
                            requireAuth: true,
                            index: 12,
                            icon: 'List',
                        },
                        component: '/comp/vform',
                    },
                ],
            },
            {
                path: '/permission',
                name: 'Permission',
                meta: {
                    title: '用户权限',
                    keepAlive: false,
                    requireAuth: true,
                    index: 3,
                    icon: 'UserFilled',
                },
                component: '/permission/index',
            },
            {
                path: '/editor',
                name: 'Editor',
                meta: {
                    title: '编辑器',
                    keepAlive: false,
                    requireAuth: true,
                    index: 3,
                    icon: 'Management',
                },
                component: '/editor/index',
            },
        ],
    },
});
