import { defineStore } from 'pinia';
import { useThemeCahenge } from '@/utils';
export const useGlobalStore = defineStore('global', {
    state: () => ({
        size: 'default',
        theme: 'light',
        load: false,
    }),
    actions: {
        setUiSize(data: string) {
            this.size = data;
        },
        setTheme(data: string) {
            this.theme = data;
            useThemeCahenge(data);
        },
        setLoading(data: boolean) {
            this.load = data;
        },
    },
    persist: true,
});
