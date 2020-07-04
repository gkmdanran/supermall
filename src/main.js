import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/fonts/iconfont.css'
import './assets/css/base.css'
import 'lib-flexible'
import Vant from 'vant';
import 'vant/lib/index.css';
import store from './store/store'
import toast from './components/toast/toast'
import fastclick from 'fastclick';
import VueLazyload from 'vue-lazyload'
Vue.use( VueLazyload)
fastclick.attach(document.body);
Vue.use(Vant);
Vue.use(toast)
Vue.config.productionTip = false

Vue.prototype.$bus=new Vue()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
