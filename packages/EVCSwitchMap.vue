<template>
    <vc-layer-imagery :show="!vec">
        <vc-imagery-provider-arcgis :enablePickFeatures="false">
        </vc-imagery-provider-arcgis>
    </vc-layer-imagery>
    <vc-layer-imagery :show="vec">
        <vc-imagery-provider-baidu mapStyle="vec" :projection-transforms="{ from: 'BD09', to: 'WGS84' }">
        </vc-imagery-provider-baidu>
    </vc-layer-imagery>

    <div class="cesium-switch-map-btn" @click="changeLayer">
        <div v-show="vec">
            <img src="./assets/raster.png">
            <span>卫星影像</span>
        </div>
        <div v-show="!vec">
            <img src="./assets/vector.png">
            <span>电子地图</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VcLayerImagery, VcImageryProviderArcgis, VcImageryProviderBaidu } from 'vue-cesium';

const props = defineProps<{
    showVec?: boolean
}>();

const vec = ref(props.showVec);

function changeLayer() {
    vec.value = !vec.value;
}

</script>

<style scoped>
.cesium-switch-map-btn {
    position: absolute;
    bottom: 30px;
    right: 10px;
    color: white;
    height: 89px;
    width: 89px;
    background-color: black;
    border-radius: 8px;
    cursor: pointer;
    z-index: 10;
    overflow: hidden;
}

.cesium-switch-map-btn>div {
    height: 100%;
    width: 100%;
    display: flex;
}

.cesium-switch-map-btn>div img {
    height: 100%;
    width: 100%;
}

.cesium-switch-map-btn>div span {
    position: absolute;
    left: 0;
    bottom: 8px;
    width: 100%;
    text-align: center;
    font-weight: 500;
}

.cesium-switch-map-btn>div span:last-child {
    color: black;
}

.cesium-switch-map-btn>div span:first-child {
    color: width;
}
</style>