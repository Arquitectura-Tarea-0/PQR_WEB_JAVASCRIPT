import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../components/SignUp.vue'
import SignIn from '../components/SignIn.vue'
import Admin from '../views/Admin.vue'
import AdminListPQR from '../components/AdminListPQR.vue'
import User from '../views/User.vue'
import UserNewPQR from '../components/UserNewPQR.vue'
import UserListPQR from '../components/UserListPQR.vue'
import UserSelectPQR from '../components/UserSelectPQR.vue'

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
  },
  {
    path: '/user',
    component: User,
    children: [
      {
        path: '',
        component: UserNewPQR
      },
      {
        path: 'list',
        component: UserListPQR
      },
      {
        path: 'show',
        name: 'ShowUserPQR',
        component: UserSelectPQR,
        props: (route) => ({
          ...route.params
        })
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
