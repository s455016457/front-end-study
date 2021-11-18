import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// import 'ag-grid-enterprise'
createApp(App).use(store).use(router).use(ElementPlus).mount('#app');
console.log(process.env.VUE_APP_SECRET);
//# sourceMappingURL=main.js.map