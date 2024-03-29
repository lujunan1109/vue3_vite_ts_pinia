/*
 * @Description: eslint配置
 * @Author: lujunan
 * @Date: 2022-06-07 09:46:51
 * @LastEditors: lujunan
 * @LastEditTime: 2022-06-07 09:51:38
 */
module.exports = {
    parser: 'vue-eslint-parser',

    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },

    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:prettier/recommended',
    ],

    rules: {
        // override/add rules settings here, such as:
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // 关闭组件命名规则
        'vue/multi-word-component-names': 'off',
    },
};
