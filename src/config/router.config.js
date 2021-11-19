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
        meta: { title: '首页', keepAlive: true, icon: bxAnaalyse },
        hideChildrenInMenu: true,
        children: [
          {
            path: '/dashboard/analysis',
            name: 'Analysis',
            permission: ['Analysis'],
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '首页', keepAlive: false }
          }
        ]
      },
      {
        path: '/dashboard/monitor',
        name: 'Monitor',
        component: () => import('@/views/dashboard/Monitor'),
        meta: { title: '数据分析', icon: 'setting', permission: ['Monitor'] }
      },
      {
        path: '/master',
        name: 'Master',
        component: () => import('@/views/master/Index'),
        meta: {
          permission: ['Master'],
          title: '师傅管理',
          icon: 'setting'
        }
      },
      {
        path: '/pupil',
        name: 'Pupil',
        component: () => import('@/views/pupil/Index'),
        meta: {
          permission: ['Pupil'],
          title: '徒弟管理',
          icon: 'setting'
        }
      },
      {
        path: '/pair',
        name: 'Pair',
        component: () => import('@/views/pair/Index'),
        meta: {
          permission: ['Pair'],
          title: '配对管理',
          icon: 'setting'
        }
      },
      {
        path: '/train',
        name: 'Train',
        component: () => import('@/views/train-m/train/Index'),
        meta: {
          permission: ['Train'],
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
          permission: ['Implement', 'Train'],
          title: '师带徒管理',
          icon: 'setting'
        }
      },
      {
        path: '/task',
        name: 'Task',
        component: () => import('@/views/task/Index'),
        meta: {
          permission: ['Task'],
          title: '师徒任务',
          icon: 'setting'
        }
      },
      {
        path: '/base',
        name: 'Base',
        component: RouteView,
        meta: {
          permission: ['Base'],
          title: '系统管理',
          icon: 'setting'
        },
        children: [
          {
            path: '/base/account',
            name: 'BaseAccount',
            component: () => import('@/views/base/account/Index'),
            meta: {
              permission: ['BaseAccount'],
              title: '用户管理'
            }
          },
          {
            path: '/base/role',
            name: 'BaseRole',
            component: () => import('@/views/base/role/Index'),
            meta: {
              permission: ['BaseRole'],
              title: '角色管理'
            }
          },
          {
            path: '/base/journal',
            name: 'Journal',
            component: () => import('@/views/base/journal/Index'),
            meta: {
              // permission: ['BaseJournal'],
              title: '日志管理'
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
