import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/reset.scss'
import './style/element-ui.scss'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueContextMenu from 'vue-contextmenu';
import FullCalendar from 'vue-full-calendar' //全局
// import "../public/css/common.css"
Vue.use(FullCalendar)

import './assets/el-tree-icon/iconfont.css'


Vue.use(VueContextMenu);

Vue.directive('watermark', (el, binding) => {
  function addWaterMarker(str, parentNode, font, textColor) {
    var can = document.createElement('canvas')
    parentNode.appendChild(can)
    can.width = 1720
    can.height = 1480
    can.style.display = 'none'
    var cans = can.getContext('2d')
    cans.rotate(-20 * Math.PI / 180)
    cans.font = font || '16px Microsoft JhengHei'
    cans.fillStyle = textColor || 'rgba(180, 180, 180, 0.3)'
    cans.textAlign = 'center'
    cans.textBaseline = 'Middle'
    cans.fillText(str, can.width / 3, can.height / 2)
    parentNode.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')'
  }
  addWaterMarker(binding.value.text, el, binding.value.font, binding.value.textColor)
})
Vue.directive('watermark1', (el, binding) => {
  function addWaterMarker(str, parentNode, font, textColor) {
    var can = document.createElement('canvas')
    parentNode.appendChild(can)
    can.width = 200
    can.height = 200
    can.style.display = 'none'
    var cans = can.getContext('2d')
    cans.rotate(-20 * Math.PI / 180)
    cans.font = font || '16px Microsoft JhengHei'
    cans.fillStyle = textColor || 'rgba(180, 180, 180, 0.3)'
    cans.textAlign = 'center'
    cans.textBaseline = 'Middle'
    cans.fillText(str, can.width / 3, can.height / 2)
    parentNode.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')'
  }
  addWaterMarker(binding.value.text, el, binding.value.font, binding.value.textColor)
})
// import './assets/js/twaver.js'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
