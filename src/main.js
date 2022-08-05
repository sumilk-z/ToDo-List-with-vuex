import Vue from 'vue'
import App from './App.vue'
import store from './store'

// 1、导入ant-design-vue 组件库
import Antd from 'ant-design-vue'

// 2、导入组件库的样式表
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false
// 3、安装组件库
Vue.use(Antd)

new Vue({
  render: (h) => h(App),
  store
}).$mount('#app')
