import { App, Plugin } from 'vue';
import EVCMeasurement from './EVCMeasurement.vue';
import EVCNavigation from './EVCNavigation.vue';
import EVCSwitchMap from './EVCSwitchMap.vue';
import EVCSwitchLayer from './EVCSwitchLayer.vue';
import EvcExtend from './EVCExtend.vue';
import './index.css';

const EVCPlugin: Plugin = {
    install(app: App) {
        app.component('evc-measurement', EVCMeasurement);
        app.component('evc-navigation', EVCNavigation);
        app.component('evc-switchmap', EVCSwitchMap);
        app.component('evc-switchlayer', EVCSwitchLayer);
        
        app.component('evc-extend', EvcExtend);
    },
};

export default EVCPlugin;

export * from './types';
export { EVCMeasurement, EVCNavigation, EVCSwitchMap, EVCSwitchLayer, EvcExtend }

