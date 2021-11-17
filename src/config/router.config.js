// eslint-disable-next-line
import { UserLayout, BasicLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/dashboard/analysis',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/analysis',
        component: RouteView,
        meta: { title: '数据分析', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
        hideChildrenInMenu: true,
        children: [
          {
            path: '/dashboard/analysis',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '数据分析', keepAlive: false, permission: ['dashboard'] }
          }
        ]
      },
      // {
      //   path: '/classify',
      //   name: 'Classify',
      //   component: RouteView,
      //   // permission: ['Classify'],
      //   meta: {
      //     title: '分类管理',
      //     icon: 'setting'
      //   },
      //   children: [
      //     {
      //       name: 'ClassifyList',
      //       path: '/classify/list',
      //       // permission: ['GoodsList'],
      //       component: () => import('@/views/classify/Index'),
      //       meta: {
      //         title: '分类列表',
      //         icon: 'setting'
      //       }
      //     }
      //   ]
      // },
      // {
      //   path: '/goods',
      //   name: 'Goods',
      //   component: RouteView,
      //   // permission: ['Goods'],
      //   meta: {
      //     title: '商品管理',
      //     icon: 'setting'
      //   },
      //   children: [
      //     {
      //       name: 'GoodsList',
      //       path: '/good/list',
      //       // permission: ['GoodsList'],
      //       component: () => import('@/views/goods/Index'),
      //       meta: {
      //         title: '商品列表',
      //         icon: 'setting'
      //       }
      //     },
      //     {
      //       name: 'GoodsBanner',
      //       path: '/good/banner',
      //       // permission: ['GoodsBanner'],
      //       component: () => import('@/views/banner/Index'),
      //       meta: {
      //         title: '首页轮播图',
      //         icon: 'setting'
      //       }
      //     }
      //   ]
      // },
      // {
      //   path: '/order',
      //   name: 'Order',
      //   component: RouteView,
      //   // permission: ['Order'],
      //   meta: {
      //     title: '订单管理',
      //     icon: 'setting'
      //   },
      //   children: [
      //     {
      //       name: 'OrderList',
      //       path: '/order/list',
      //       // permission: ['OrderList'],
      //       component: () => import('@/views/order/Index'),
      //       meta: {
      //         title: '订单列表',
      //         icon: 'setting'
      //       }
      //     }
      //   ]
      // },
      {
        path: '/master',
        name: 'Master',
        component: () => import('@/views/master/Index'),
        // permission: ['Goods'],
        meta: {
          title: '师傅管理',
          icon: 'setting'
        }
      },
      {
        path: '/pupil',
        name: 'Pupil',
        component: () => import('@/views/pupil/Index'),
        meta: {
          title: '徒弟管理',
          icon: 'setting'
        }
      },
      {
        path: '/pair',
        name: 'Pair',
        component: () => import('@/views/pair/Index'),
        meta: {
          title: '配对管理',
          icon: 'setting'
        }
      },
      {
        path: '/train',
        name: 'Train',
        component: () => import('@/views/train-m/train/Index'),
        meta: {
          title: '师带徒管理',
          icon: 'setting'
        }
      },
      {
        path: '/implement',
        name: 'Implement',
        hidden: true,
        component: () => import('@/views/train-m/implement/Index'),
        meta: {
          title: '师带徒管理',
          icon: 'setting'
        }
      },
      {
        path: '/task',
        name: 'Task',
        component: () => import('@/views/task/Index'),
        meta: {
          title: '师徒任务',
          icon: 'setting'
        }
      },
      {
        path: '/base',
        name: 'Base',
        component: RouteView,
        // permission: ['Base'],
        meta: {
          title: '系统管理',
          icon: 'setting'
        },
        children: [
          {
            path: '/base/account',
            name: 'BaseAccount',
            component: () => import('@/views/base/account/Index'),
            // permission: ['BaseAccount'],
            meta: {
              title: '用户管理'
            }
          },
          {
            path: '/base/role',
            name: 'BaseRole',
            component: () => import('@/views/base/role/Index'),
            // permission: ['BaseRole'],
            meta: {
              title: '角色管理'
            }
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
