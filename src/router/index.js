import Vue from 'vue'
import VueRouter from 'vue-router'
import TestView from '../views/TestView.vue'
import LoginView from '../views/LoginView.vue'
import ClassView from '../views/ClassView.vue'
import CreateClassroomView from '../views/CreateClassroomView.vue'
import ClassroomView from '../views/ClassroomView.vue'
import ClassroomDetailView from '../views/ClassroomDetailView.vue'
import TestDetailView from '../views/TestDetailView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/class',
    name: 'class',
    component: ClassView
  },
  {
    path: '/test',
    name: 'test',
    component: TestView
  },
  {
    path: '/checkTest',
    name: 'TestDetail',
    component: TestDetailView
  },
  {
    path: '/createClassroom',
    name: 'createClassroom',
    component: CreateClassroomView
  },
  {
    path: '/checkClassroom',
    name: 'classroomDetail',
    component: ClassroomDetailView
  },
  {
    path: '/classroom',
    name: 'classroom',
    component: ClassroomView
  },
  {
    path: '/main',
    name: 'main',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MainView.vue')
  }, 
  {
    path: '/settings',
    name: 'settings',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/SettingView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
