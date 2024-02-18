import { defineStore } from 'pinia';

export const useLanguageStore = defineStore({
    id: 'language',
    state: () => {
        return {
            language: 'zh',
        };
    },
    actions: {
        changeLanguage(language: string) {
            this.language = language;
        },
    },
    persist: true,
});
