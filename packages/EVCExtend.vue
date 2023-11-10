<template>
    <div class="extend" :style="{ flexDirection: direction, top, bottom, left, right, alignItems }">
        <Transition>
            <div class="extend-container" v-show="open">
                <div v-if="title || closeable" class="extend-container-header">
                    <div class="extend-container-header-title">{{ title }}</div>
                    <svg v-if="closeable" @click="handleExtendToggle" class="extend-container-header-close"
                        viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" p-id="4022"
                        data-darkreader-inline-fill="" width="20" height="20">
                        <path
                            d="M597.795527 511.488347 813.564755 295.718095c23.833825-23.833825 23.833825-62.47489 0.001023-86.307691-23.832801-23.832801-62.47489-23.833825-86.307691 0L511.487835 425.180656 295.717583 209.410404c-23.833825-23.833825-62.475913-23.833825-86.307691 0-23.832801 23.832801-23.833825 62.47489 0 86.308715l215.769228 215.769228L209.410915 727.258599c-23.833825 23.833825-23.833825 62.47489 0 86.307691 23.832801 23.833825 62.473867 23.833825 86.307691 0l215.768205-215.768205 215.769228 215.769228c23.834848 23.833825 62.475913 23.832801 86.308715 0 23.833825-23.833825 23.833825-62.47489 0-86.307691L597.795527 511.488347z"
                            fill="#ccc" p-id="4023" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #ccc;">
                        </path>
                    </svg>
                </div>
                <div class="extend-container-body">
                    <slot></slot>
                </div>
            </div>
        </Transition>

        <div class="extend-toggle" @click="handleExtendToggle">
            <template v-show="open">
                <slot name="toggle-close"></slot>
            </template>

            <template v-show="!open">
                <slot name="toggle-open"></slot>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Position } from './types';
import { computed } from 'vue';

export interface EVCExtendProps {
    title?: string,
    defaultOpen?: boolean
    closeable?: boolean,
    position?: Position,
    offset?: [number, number],
    onToggle?(open: boolean): void,

}

const props = withDefaults(defineProps<EVCExtendProps>(), {
    closeable: true,
    position: 'top-right',
    offset: () => [0, 0],
});

const top = computed(() => props.position.includes("top") ? `${props.offset[0]}px` : undefined);

const bottom = computed(() => props.position.includes("bottom") ? `${props.offset[0]}px` : undefined);

const right = computed(() => props.position.includes("right") ? `${props.offset[1]}px` : undefined);

const left = computed(() => props.position.includes("left") ? `${props.offset[1]}px` : undefined);

const direction = computed(() => props.position.includes("right") ? 'row' : 'row-reverse');
const alignItems = computed(() => props.position.includes("bottom") ? 'flex-end' : undefined);

const open = ref(props.defaultOpen);
function handleExtendToggle() {
    open.value = !open.value;
    props.onToggle?.(open.value);
}
</script>

<style scoped>
.extend {
    position: absolute;
    z-index: 9999;
    color: white;

    display: flex;
    gap: 8px;
}

.extend-toggle {
    cursor: pointer;
    height: 29px;
    width: 29px;
    border-radius: 4px;
    background-color: var(--vc-primary);
}

.extend-container {
    min-width: 300px;
    background-color: var(--vc-primary);
    border-radius: 8px;
}

.extend-container-header {
    display: flex;
    justify-content: space-between;
    padding: 8px 12px;
}

.extend-container-header-title {
    font-weight: 500;
}

.extend-container-header-close {
    cursor: pointer;
}

.extend-container-body {
    max-height: 300px;
    margin: 8px 12px;
    overflow-y: auto;
}
</style>