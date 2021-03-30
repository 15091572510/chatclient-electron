import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import ServiceIndex from "../views/ServiceIndex";

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/serviceIndex',
    name: 'ServiceIndex',
    component: ServiceIndex
  }
]

const router = new VueRouter({
  routes
})

export default router
