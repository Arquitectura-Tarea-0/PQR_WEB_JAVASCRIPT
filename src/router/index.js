import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../components/SignUp.vue'
import SignIn from '../components/SignIn.vue'
import Admin from '../views/Admin.vue'
import AdminListPQR from '../components/AdminListPQR.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        component: SignIn
      },
      {
        path: 'register',
        component: SignUp
      }
    ]
  },
  {
    path: '/admin',
    component: Admin,
    children: [
      {
        path: '',
        component: AdminListPQR
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
