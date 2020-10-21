import Vue from 'vue';
import App from './App.vue';
import 'fontsource-inter/latin.css';
import './styles/base.pcss';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
