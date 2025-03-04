import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'

/* Layout */
import Layout from '@/layout/index.vue'

Vue.use(Router)

/*
  Note: sub-menu only appear when children.length>=1
  Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
*/

/*
  name:'router-name'             the name field is required when using <keep-alive>, it should also match its component's name property
                                 detail see : https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    roles: ['admin', 'editor']   will control the page roles (allow setting multiple roles)
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    hidden: true                 if true, this route will not show in the sidebar (default is false)
    alwaysShow: true             if true, will always show the root menu (default is false)
                                 if false, hide the root menu when has less or equal than one children route
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    noCache: true                if true, the page will not be cached (default is false)
    affix: true                  if true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
*/

/**
 ConstantRoutes
 a base page that does not have permission requirements
 all roles can be accessed
 */
export const constantRoutes: RouteConfig[] = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: { hidden: true, needPerms: false }
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/error-page/404.vue'),
    meta: { hidden: true, needPerms: false }
  },
  {
    path: '/401',
    component: () => import(/* webpackChunkName: "401" */ '@/views/error-page/401.vue'),
    meta: { hidden: true, needPerms: false }
  },
  {
    path: '/',
    component: () => import(/* webpackChunkName: "home" */ '@/views/home/home.vue'),
    meta: { hidden: true, showErrorMsg: false, needPerms: false }
  },
  {
    path: '/deliver',
    name: 'deliver',
    component: () => import(/* webpackChunkName: "deliver" */ '@/views/home/deliver.vue'),
    meta: { hidden: true, showErrorMsg: false, needPerms: false }
  },
  {
    path: '/deliver-info',
    name: 'deliver-info',
    component: () => import(/* webpackChunkName: "deliver-info" */ '@/views/home/deliver-info.vue'),
    meta: { hidden: true, showErrorMsg: false, needPerms: false }
  },
  {
    path: '/finish-deliver',
    name: 'finish-deliver',
    component: () => import(/* webpackChunkName: "finish-deilver" */ '@/views/home/finish-deliver.vue'),
    meta: { hidden: true, showErrorMsg: false, needPerms: false }
  },
  {
    path: '/dashboard',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          affix: true
        }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    meta: { hidden: true },
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "profile" */ '@/views/profile/index.vue'),
        name: 'Profile',
        meta: {
          title: 'profile',
          icon: 'user',
          noCache: true
        }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes: RouteConfig[] = [
  /** when your routing map is too long, you can split it into small modules **/
  {
    path: '/card',
    component: Layout,
    redirect: '/card/list',
    meta: {
      title: 'cardManagement',
      icon: 'example'
    },
    children: [
      {
        path: 'list',
        component: () => import(/* webpackChunkName: "card-list" */ '@/views/card/card-list.vue'),
        name: 'CardList',
        meta: {
          title: 'cardList',
          icon: 'table'
        }
      },
      {
        path: 'import',
        component: () => import(/* webpackChunkName: "card-import" */ '@/views/card/card-import.vue'),
        name: 'CardImport',
        meta: {
          title: 'cardImport',
          icon: 'link'
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    meta: { hidden: true }
  }
]

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher // reset router
}

export default router
