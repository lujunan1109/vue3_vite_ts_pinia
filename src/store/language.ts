import { defineStore } from 'pinia';

export const useLanguage = defineStore({
    id: 'language',
    state: () => {
        return {
            language: 'zh-cn',
        };
    },
    actions: {
        changeLanguage(language: string) {
            this.language = language;
        },
    },
});
