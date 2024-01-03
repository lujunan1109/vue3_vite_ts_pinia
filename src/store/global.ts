import { defineStore } from 'pinia';
export const useGlobalStore = defineStore('global', {
    state: () => ({
        size: 'default',
        theme: 'light',
    }),
    actions: {
        setUiSize(data) {
            this.size = data;
        },
        setTheme(data) {
            this.theme = data;
        },
    },
});
