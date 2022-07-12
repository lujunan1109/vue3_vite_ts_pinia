/* eslint-disable vue/require-explicit-emits */
<!--
 * @Author: lujunan
 * @Date: 2022-07-12 11:19:54
 * @LastEditors: lujunan
 * @LastEditTime: 2022-07-12 11:39:17
 * @Description: Do not edit
-->

<script>
import { defineComponent, h } from 'vue';

export default defineComponent({
    name: 'MyButton',
    render() {
        return h(
            'button',
            {
                ...this.$attrs,
                onClick: () => this.$emit('custom-click'),
            },
            this.$slots.default?.(),
        );
    },
    // setup(props, { emit }) {
    //     return () =>
    //         h(
    //             'button',
    //             {
    //                 disabled: props.disabled,
    //                 onClick: () => emit('customClick'),
    //             },
    //             slots.default(),
    //         );
    // },
});
</script>
