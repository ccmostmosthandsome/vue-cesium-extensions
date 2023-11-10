<script setup lang="ts">
import { VcViewer, VcConfigProvider } from 'vue-cesium';
import { VcReadyObject } from 'vue-cesium/es/utils/types';
import geojson_village_range from './assets/villageRange.geojson?url';

const layerGroups = [
  {
    name: "xxx",
    collapse: true,
    defaultCollapsed: true,
    withAllAndClean: true,
    items: [{
      name: "geojson",
      defaultShow: false,
      layer: {
        type: "geojson",
        url: geojson_village_range
      }
    }, {
      name: "正射影像",
      defaultShow: false,
      layer: {
        type: "raster",
        url: "https://www.szshsurvey.com/tiles/qgc/zhengshe23/{z}/{x}/{y}.png"
      }
    }, {
      name: "三维",
      defaultShow: false,
      layer: {
        type: "3dtiles",
        url: "https://szshsurvey.com/tiles/lzdq/smc/moxing/tileset.json"
      }
    }]
  }
];

function onViewerReady(v: VcReadyObject) {
  v.viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(120.77934935604571, 31.259486920959162, 2000),
    duration: 0
  });

}
</script>

<template>
  <VcConfigProvider>
    <vc-viewer :showCredit="false" @ready="onViewerReady">
      <evc-navigation></evc-navigation>
      <evc-measurement></evc-measurement>
      <evc-switchmap></evc-switchmap>
      <evc-extend title="测试" :offset="[100, 10]">
        <div>
          这是一个扩展组件
        </div>
      </evc-extend>
      <evc-switchlayer :defaultOpen="true" :offset="[150, 10]" :layerGroups="layerGroups"></evc-switchlayer>
    </vc-viewer>
  </VcConfigProvider>
</template>

<style scoped></style>
