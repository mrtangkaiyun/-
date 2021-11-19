import axios from 'axios'
import store from '@/store'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { Modal, Message } from 'ant-design-vue'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  // baseURL: 'http://cbqio.imdo.co/admin',
  // baseURL: 'http://39.100.91.195:8000/admin',
  // baseURL: 'https://123.57.210.202:8000/admin',
  // baseURL: 'https://huiqian.shop/admin',
  // baseURL: 'http://39.99.170.112:8095/api',
  // baseURL: 'http://demofortest.natapp1.cc/api',
  timeout: 6000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    const data = error.response.data
    // 从 localstorage 获取 token
    const token = storage.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  const token = storage.get(ACCESS_TOKEN)
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (config.method === 'get') {
    config.params = {
      ...config.params,
      _t: Date.now()
    }
  }
  if (token) {
    config.headers['token'] = token
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  let { data: { code, message, status }, config } = response
  console.log(response, 123456)
  if (code && code == '200') {
    code = 0
    response.data.code = 0
  } else if (code === '0' || code === 0) {
    code = 200
    response.data.code = 200
  }
  if (code === -20 || status === -20) {
    Modal.warning({
      title: '提示',
      content: '用户信息已失效请重新登陆',
      okText: '确认',
      onOk () {
        store.dispatch('Logout', true).then(() => {
          window.location.reload(true)
        })
      }
    })
    return Promise.reject(response.data)
  } else if (code !== 0 && config.responseType !== 'blob') {
    Message.error(message || '请求错误')
  }
  return response.data
}, errorHandler)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}
