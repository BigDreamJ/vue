// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'
import fHeader from './components/fHeader';
import fFooter from './components/fFooter'
import Aplayer from 'vue-aplayer'
import VueAMap from 'vue-amap';
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(Element);
Vue.use(VueAMap);
Vue.component("f-header",fHeader)
Vue.component("f-footer",fFooter)
Vue.component('aplayer', Aplayer)

VueAMap.initAMapApiLoader({
  key: 'YOUR_KEY',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  v: '1.4.4'
});


/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })

/* 路由发生变化修改页面title */
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})


new Vue({
  render: h => h(App),
  store,
  router, //使用路由配置
}).$mount('#app')
