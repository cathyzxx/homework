import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
import 'normalize.css/normalize.css' 
import "./assets/css/index.css"
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import "./assets/icon/iconfont.css"
//import "@/permission"
Vue.config.productionTip = false


Vue.use(ElementUI);
Vue.use(VueResource)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
