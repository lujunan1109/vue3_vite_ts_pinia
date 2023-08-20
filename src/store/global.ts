import { defineStore } from 'pinia';
export const useGlobalStore = defineStore(
    'global',
    () => {
        const size = ref('default');
        const setUiSize = (data: string) => {
            size.value = data;
        };
        return { size, setUiSize };
    },
    {
        persist: true,
    },
);
