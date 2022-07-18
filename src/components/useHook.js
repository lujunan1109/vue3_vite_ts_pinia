/*
 * @Author: lujunan
 * @Date: 2022-06-29 17:43:09
 * @LastEditors: lujunan
 * @LastEditTime: 2022-06-29 17:52:40
 * @Description: hook
 */
import { ref, watch } from 'vue';
const useAdd = ({ num1, num2 }) => {
    const addNum = ref(0);
    watch([num1, num2], ([num1, num2]) => {
        addFn(num1, num2);
    });
    const addFn = (num1, num2) => {
        addNum.value = num1 + num2;
    };
    return {
        addNum,
        addFn,
    };
};
export default useAdd;
