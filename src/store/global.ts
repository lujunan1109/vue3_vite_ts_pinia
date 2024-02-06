import { defineStore } from 'pinia';
export const useGlobalStore = defineStore('global', {
    state: () => ({
        size: 'default',
        theme: 'light',
    }),
    actions: {
        setUiSize(data: string) {
            this.size = data;
        },
        setTheme(data: string) {
            this.theme = data;
        },
    },
    persist: true,
});
