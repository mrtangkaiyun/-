<template>
  <div>
    <a-modal
      class="page-modal"
      v-model="dialog.visiable"
      :afterClose="closeDialog"
      :title="dialog.title"
      :footer="null"
      :keyboard="false"
      :maskClosable="false"
      width="500px"
    >
      <br />
      <a-tree
        v-model="checkedKeys"
        checkable
        :expanded-keys="expandedKeys"
        :auto-expand-parent="autoExpandParent"
        :selected-keys="selectedKeys"
        :tree-data="treeData"
        @expand="onExpand"
        @select="onSelect"
      />
      <div class="text-center">
        <a-button @click="closeDialog"> 取消 </a-button>
        <a-button type="primary" class="margin-l-20" @click="handleSubmit" :loading="button.loading">确定</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
import model from '@/public/addModel.js'
import { treeData } from '@/utils/auth'
export default {
  mixins: [model],
  data () {
    return {
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
      treeData
    }
  },
  created () {
    const title = '勾选权限'
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
    this.init()
  },
  methods: {
    init () {
      const { obj } = this.data; const checkedKeys = this.$copy(obj)
      const p = []
      this.selectParents(this.treeData, checkedKeys, p)
      for (let i = 0; i < checkedKeys.length; i++) {
        const bool = p.some(e => (e === checkedKeys[i]))
        if (bool) {
          checkedKeys.splice(i, 1)
          i--
        }
      }
      this.checkedKeys = checkedKeys
      console.log(this.checkedKeys, '去掉父级 selectedKeys')
    },
    selectParents (menus, keys, arr = []) {
      let bool = false
      for (let i = 0; i < menus.length; i++) {
        if (!bool) {
           bool = keys.some(e => (e === menus[i].key))
        }
        if (menus[i].children) {
         const b = this.selectParents(menus[i].children, keys, arr)
         if (b) {
           bool = b
           arr.push(menus[i].key)
         }
        }
      }
      return bool
    },
    handleSubmit () {
      let checkedKeys = this.$copy(this.checkedKeys); const eachKeys = []
      this.selectParents(this.treeData, checkedKeys, eachKeys)
      checkedKeys = checkedKeys.concat(eachKeys)
      checkedKeys = new Set(checkedKeys)
      checkedKeys = Array.from(checkedKeys)
      console.log('选择 key', checkedKeys)
      this.$emit('confirm', checkedKeys)
      this.closeDialog()
    },
    onExpand (expandedKeys) {
      console.log('onExpand', expandedKeys)
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onCheck (checkedKeys) {
      console.log('onCheck', checkedKeys)
      this.checkedKeys = checkedKeys
    },
    onSelect (selectedKeys, info) {
      console.log('onSelect', info)
      this.selectedKeys = selectedKeys
    }
  }
}
</script>
<style lang="less" scoped>
</style>
