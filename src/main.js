import Vue from 'vue';
import App from './App.vue';
/* import 'fontsource-inter/latin.css'; */
import './styles/base.pcss';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
