import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'vue-cesium/dist/index.css';

import EVCPlugin from '../packages';
import '../packages/index.css';

const app = createApp(App);
app.use(EVCPlugin);
app.mount('#app');
