import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import axios from "axios"


export function request(config) {
  const instance = axios.create({
    // 后端接口基准地址
    baseURL: 'http://127.0.0.1:8888/api/customer',

    // 转换数据的方法
    transformRequest: [
      function (data) {
        let ret = ''
        for (const it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        // console.log(ret)
        return ret
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  instance.interceptors.request.use(config => {
    // console.log(config)
    return config
  }, err => {
    console.log(err)
    return err
  })
  return instance(config)
}

Vue.prototype.$http = request

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
