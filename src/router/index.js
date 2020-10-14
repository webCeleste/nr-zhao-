import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About/index.vue')
  },
  {
    path: '/opticla',
    name: 'opticla',
    component: () => import('@/views/opticalcable/index.vue')
  }, 
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "about" */ '../views/search/index.vue')
  }, 
  {
    path: '/table',
    name: 'table',
    component: () => import(/* webpackChunkName: "about" */ '../views/table.vue')
  },
  {
    path: '/beonduty',
    name: 'beonduty',
    redirect: '/beonduty/configuration',
    component: () => import(/* webpackChunkName: "about" */ '../views/beonduty/index.vue'),
    children:[
      {
        path: 'configuration',
        name: 'configuration',
        component: () => import(/* webpackChunkName: "about" */ '../views/beonduty/configuration.vue')
      }, 
      {
        path: 'information',
        name: 'information',
        component: () => import(/* webpackChunkName: "about" */ '../views/beonduty/information.vue')
      }, {
        path: 'management',
        name: 'management',
        component: () => import(/* webpackChunkName: "about" */ '../views/beonduty/management.vue')
      }, {
        path: 'workbench',
        name: 'workbench',
        component: () => import(/* webpackChunkName: "about" */ '../views/beonduty/workbench.vue')
      }, 
	  {
	    path: 'querylist',
	    name: 'querylist',
	    component: () => import(/* webpackChunkName: "about" */ '../views/beonduty/queryList.vue')
	  },
    ]
  },
  {
    path: '/overhaul',
    name: 'overhaul',
    redirect: '/overhaul/plan',
    component: () => import(/* webpackChunkName: "about" */ '../views/overhaul/index.vue'),
    children:[
      {
        path: 'plan',
        name: 'plan',
        component: () => import(/* webpackChunkName: "about" */ '../views/overhaul/plan.vue')
      }, 
      {
        path: 'administration',
        name: 'administration',
        component: () => import(/* webpackChunkName: "about" */ '../views/overhaul/administration.vue')
      },
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
