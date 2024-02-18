import { createI18n } from 'vue-i18n';
//导入语言文件
import en from './en';
import zh from './zh';
const messages = { en, zh };

type LanguageType = {
    language: string;
};

//i18n实例配置
const useLanguageStore: LanguageType = JSON.parse(
    localStorage.getItem('language') || '{}',
);
const localeData = {
    globalInjection: true, //如果设置true, $t() 函数将注册到全局
    legacy: false, //如果想在composition api中使用需要设置为false
    // set locale
    // options: en | zh | es
    locale: useLanguageStore.language,
    messages, // set locale messages
};

// 提供install方法，给vue.use进行创建实例
export const setupI18n = {
    install(app) {
        const i18n = createI18n(localeData);
        app.use(i18n);
    },
};
