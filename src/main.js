import Vue from 'vue'
import App from './App.vue'
import store from "./store";
import TwoDigNum from './filters/TwoDigNum.filter'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

Vue.use(VueAxios, axios);
Vue.filter('TwoDigNum', TwoDigNum);

new Vue({
	store,
	render: h => h(App),
}).$mount('#app')
