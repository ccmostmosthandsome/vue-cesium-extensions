<template>
    <vc-navigation :compassOpts="(false as any)" :locationOpts="(false as any)" :printOpts="printOpts" :position="position"
        :offset="offset"></vc-navigation>
</template>

<script setup lang="ts">
import { VcNavigation } from 'vue-cesium'
import { VcPrintProps } from 'vue-cesium/es/components/controls/print';
import { Position } from './types';

withDefaults(defineProps<{
    offset?: [number, number],
    position?: Position
}>(), {
    offset: () => [10, 195],
    position: 'bottom-right'
})

const printOpts: false | VcPrintProps = {
    downloadAutomatically: true,
    showPrintView: false,
    background: '#3f4854',
    color: '#fff',
    size: '26px'
}
</script>

<style scoped></style>