import Vue from 'vue'
import VueRouter from 'vue-router'
import Customer from '../components/Customer.vue'
Vue.use(VueRouter)

// 配置路由
const routes = [
  {
    path: '/',
    name: 'Customer',
    component: Customer
  }
]

const router = new VueRouter({
  routes
})

export default router
