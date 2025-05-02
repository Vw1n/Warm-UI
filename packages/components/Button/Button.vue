<script setup lang="ts">
import { computed, ref } from 'vue';
import type { ButtonProps, ButtonEmits, ButtonInstance } from './types';
import { throttle } from 'lodash-es';
import  WarmIcon  from '../Icon/Icon.vue';

defineOptions({
    name: 'WarmButton',
});
const props = withDefaults(defineProps<ButtonProps>(), {
    tag: "button",
    nativeType: "button",
    useThrottle: true,
    throttleDuration: 500
})

const emits = defineEmits<ButtonEmits>();
const slots = defineSlots();
const _ref = ref<HTMLButtonElement>();

const handleBtnClick = (e: MouseEvent) => emits("click", e);
const handleBtnClickThrottle = throttle(handleBtnClick, props.throttleDuration);
defineExpose<ButtonInstance>({
    ref: _ref,
})

const iconStyle = computed(() => ({ magrinRight: slots.default ? "6px" : '0px' }))
</script>

<template>
    <component :is="tag" ref="_ref" class="er-button" :autofocus="autofocus"
        :type="tag === 'button' ? nativeType : void 0" :disabled="disabled || loading ? true : void 0" :class="{
            [`er-button--${type}`]: type,
            [`er-button--${size}`]: size,
            'is-plain': plain,
            'is-round': round,
            'is-circle': circle,
            'is-disabled': disabled,
            'is-loading': loading,
        }" @click="(e: MouseEvent) => useThrottle ? handleBtnClickThrottle(e) : handleBtnClick(e)">
        <template v-if="loading">
            <slot name="loading">
                <warm-icon class="loading-icon" :icon="loadingIcon ?? 'spinner'" :style="iconStyle" spin />
            </slot>
        </template>
        <slot></slot>
    </component>
</template>

<style scoped>
@import './style.css'
</style>