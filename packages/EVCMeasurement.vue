<template>
    <VcMeasurements position="top-right" :measurements="['area', 'polyline', 'vertical']" :offset="[10, 10]" :mode="0"
        :main-fab-opts="mainFabOpts" :area-measurement-opts="areaMeasurementOpts"
        :polyline-measurement-opts="polylineMeasurementOpts">
    </VcMeasurements>
</template>

<script setup lang="ts">
import { VcMeasurements, AngleUnits, DistanceUnits, MeasureUnits, VcFabProps, VolumeUnits } from 'vue-cesium';
import { VcMeasurementOpts } from 'vue-cesium/lib/utils/drawing-types';
import { VcActionTooltipProps } from 'vue-cesium/lib/utils/types';

//#region 测量改造
const areaUnitsMU = "MU";
const areaToString = MeasureUnits.areaToString;
MeasureUnits.areaToString = function (area: number, areaUnits: string, locale?, decimals?) {
    if (areaUnits === areaUnitsMU) {
        return `${(area / 666.67).toFixed(2)} 亩`;
    }

    return areaToString(area, areaUnits, locale, decimals);
}

//#endregion

const mainFabOpts: VcActionTooltipProps & VcFabProps = {
    direction: 'left',
    modelValue: false,
    tooltip: { tip: '测量' }
}

const areaMeasurementOpts: VcMeasurementOpts = {
    autoUpdateLabelPosition: false,
    showAngleLabel: false,
    measureUnits: {
        areaUnits: areaUnitsMU,
        angleUnits: AngleUnits.DEGREES,
        distanceUnits: DistanceUnits.METERS,
        volumeUnits: VolumeUnits.CUBIC_METERS,
        slopeUnits: AngleUnits.DEGREES
    }
}

const polylineMeasurementOpts: VcMeasurementOpts = {
    autoUpdateLabelPosition: false,
    showAngleLabel: false,
    measureUnits: {
        areaUnits: areaUnitsMU,
        angleUnits: AngleUnits.DEGREES,
        distanceUnits: DistanceUnits.METERS,
        volumeUnits: VolumeUnits.CUBIC_METERS,
        slopeUnits: AngleUnits.DEGREES
    }
}

</script>