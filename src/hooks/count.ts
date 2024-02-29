import { ref, Ref, onMounted, onUnmounted } from 'vue';
const count: Ref<number> = ref(0);

onMounted(() => {
    document.title = `You clicked ${count.value} times`;
});

onUnmounted(() => {
    document.title = `STUDY VUE3`;
});

export function useCount() {
    return {
        count,
        increment: (): number => count.value++,
        decrement: (): number => count.value--,
    };
}
