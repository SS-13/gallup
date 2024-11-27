import Vue from 'vue';
// import ElementUI from 'element-ui';
// import { Row, Col } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';
import './elementUI';

Vue.config.productionTip = false;
// Vue.use(ElementUI);
// Vue.use(Row);
// Vue.use(Col);

window.$VM_GALLUP = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
