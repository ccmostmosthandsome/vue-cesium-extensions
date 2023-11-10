<template>
    <EVCExtend v-bind="props">
        <div class="evc-switchlayer-group" v-for="group in models">
            <div class="evc-switchlayer-group-header">
                <div :class="group.defaultCollapsed ? 'evc-switchlayer-group-header-collapse' : 'evc-switchlayer-group-header-collapse closed'"
                    v-if="group.collapse" @click="handleGroupCollapseToggle(group)">
                    <svg t="1699613994679" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="4018" data-darkreader-inline-fill="" width="20"
                        height="20">
                        <path
                            d="M778.715429 684.141714L512 417.426286l-266.715429 266.715428-51.712-51.712L512 314.002286l318.427429 318.427428z"
                            fill="#ccc" p-id="4019" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #ccc;">
                        </path>
                    </svg>
                </div>
                <div class="evc-switchlayer-group-header-title" @click="handleGroupCollapseToggle(group)">{{
                    group.name }}</div>
                <div class="evc-switchlayer-group-header-suffix" v-if="group.withAllAndClean">
                    <div @click="handleGroupAllShow(group, true)">全选</div>
                    <span>|</span>
                    <div @click="handleGroupAllShow(group, false)">清空</div>
                </div>
            </div>
            <Transition>
                <div class="evc-switchlayer-group-body" v-show="!group.collapse || group.defaultCollapsed">
                    <div class="evc-switchlayer-group-body-item" v-for="item in group.items">
                        <div>{{ item.name }}</div>
                        <EVCSwitchButton v-model:model-value="item.defaultShow"></EVCSwitchButton>
                        <VcLayerImagery v-if="item.layer.type === 'raster'" :show="item.defaultShow"
                            @ready="item.layer.ready">
                            <VcImageryProviderUrltemplate :url="item.layer.url"></VcImageryProviderUrltemplate>
                        </VcLayerImagery>
                        <VcPrimitiveTileset v-else-if="item.layer.type === '3dtiles'" :show="item.defaultShow"
                            :url="item.layer.url" @ready="item.layer.ready"></VcPrimitiveTileset>
                        <VcDatasourceGeojson v-else-if="item.layer.type === 'geojson'" :show="item.defaultShow"
                            :data="item.layer.url" :clamp-to-ground="item.layer.clampToGround" @ready="item.layer.ready">
                        </VcDatasourceGeojson>
                    </div>
                </div>
            </Transition>

        </div>
    </EVCExtend>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IAnyLayer } from './types';
import { VcLayerImagery, VcImageryProviderUrltemplate, VcPrimitiveTileset, VcDatasourceGeojson } from 'vue-cesium';
import EVCExtend, { EVCExtendProps } from './EVCExtend.vue';
import EVCSwitchButton from './EVCSwitchButton.vue';

interface ILayerItem {
    name: string,
    layer: IAnyLayer,
    defaultShow: boolean,
}

interface ILayerGroup {
    name: string,
    items: ILayerItem[],
    collapse?: boolean,
    defaultCollapsed?: boolean,
    withAllAndClean?: boolean
}

const props = withDefaults(defineProps<EVCExtendProps & {
    layerGroups: ILayerGroup[]
}>(), {
    title: "图层",
    closeable: true,
});

const models = ref(props.layerGroups);

/**
 * 折叠切换
 * @param group 
 */
function handleGroupCollapseToggle(group: ILayerGroup) {
    group.defaultCollapsed = !group.defaultCollapsed;
}

/**
 * 组内所有图层设置show属性（是否显示）
 * @param group 
 * @param value 
 */
function handleGroupAllShow(group: ILayerGroup, value: boolean) {
    group.items.forEach(item => item.defaultShow = value);
}

</script>

<style scoped>
.evc-switchlayer-group-header {
    display: flex;
}

.evc-switchlayer-group-header-collapse {
    cursor: pointer;
    line-height: 0;
}

.evc-switchlayer-group-header-collapse.closed {
    transform: rotate(180deg);
}

.evc-switchlayer-group-header-title {
    flex: 1;
    padding-left: 4px;
    cursor: pointer;
}

.evc-switchlayer-group-header-suffix {
    display: flex;
    font-size: small;
}

.evc-switchlayer-group-header-suffix>div {
    cursor: pointer;
    margin: 0 4px;
}

.evc-switchlayer-group-body {
    padding: 8px 0 0 16px;
}

.evc-switchlayer-group-body-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: small;
    margin-bottom: 8px;
}
</style>