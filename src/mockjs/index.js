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
