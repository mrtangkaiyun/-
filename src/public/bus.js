/*
 * @desc: 兄弟组件、递归组件的通信方式。事件名称不能重复
 */

// import bus from '@/public/bus'
// bus.$on('eventName', function cb () {}) // 接收者
// bus.$emit('eventName', 123) // 发送者

// 已经绑定的事件名：
// organization-tree, role-dialog

import Vue from 'vue'

export default new Vue()
