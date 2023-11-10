<template>
    <div class="d-switch" :class="{ 'is-checked': modelValue }">
        <input class="d-switch__input" ref="input" type="checkbox" :checked="modelValue" @change="handleInput" />
        <span class="d-switch_action"></span>
    </div>
</template>

<script setup lang="ts">

const props = withDefaults(defineProps<{
    modelValue?: boolean,
    activeColor?: string,
    width?: string
}>(), {
    modelValue: false,
    activeColor: "#409EFF",
    width: '42px'
});

const emits = defineEmits<{ (e: "update:modelValue", value: boolean): void, (e: "change", value: boolean): void }>();

//input事件 获取当前input事件
const handleInput = () => {
    emits('update:modelValue', !props.modelValue);
    emits("change", !props.modelValue); //给组件增加change 事件
};

</script>

<style scoped>
.d-switch {
    position: relative;
    height: 22px;
    transition: background 0.2s;
    width: v-bind(width);
    background: rgb(117, 117, 117);
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
}

.d-switch__input {
    position: relative;
    z-index: 1;
    margin: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
}

.d-switch_action {
    position: absolute;
    transition: 0.2s;
    left: 2px;
    top: 1px;
    z-index: 0;
    height: 20px;
    width: 20px;
    background: #fff;
    border-radius: 50%;
}

.is-checked {
    background: v-bind(activeColor);

    .d-switch_action {
        left: 100%;
        background: #fff;
        margin-left: -22px;
    }
}
</style>