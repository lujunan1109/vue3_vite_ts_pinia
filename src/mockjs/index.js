// 引用 Mock

import Mock from 'mockjs';

export const userData = Mock.mock('/data/list', 'get', {
    // 属性 list 的值是一个数组，随机生成 1 到 10 个元素
    'data|1-10': [
        {
            // 随机生成1-10个★
            'string|1-10': '★',
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
    },
});

// 退出登录
export const logout = Mock.mock('/logout', 'post', {
    code: 200,
    message: 'ok',
    data: {},
});
