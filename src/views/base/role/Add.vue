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
      width="700px"
    >
      <a-form-model ref="form" :model="formInit" loading :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
        <a-form-model-item label="角色名称" prop="roleName" :rules="rules.input">
          <a-input :disabled="isDetail" placeholder="请输入" v-model="formInit.roleName" />
        </a-form-model-item>
        <a-form-model-item label="权限勾选" prop="menus">
          <a-tree
            :disable="isDetail"
            v-model="formInit.menus"
            checkable
            :expanded-keys="expandedKeys"
            :auto-expand-parent="autoExpandParent"
            :selected-keys="selectedKeys"
            :tree-data="treeData"
            @expand="onExpand"
            @select="onSelect"
          />
          <!-- <a-input style="display: none" placeholder="请输入" v-model="formInit.menus" /> -->
          <!-- <a-button @click="clickTree()"> <a-icon type="plus" />点击勾选 </a-button> -->
        </a-form-model-item>
        <div v-if="!isDetail" class="text-center">
          <a-button @click="closeDialog"> 取消 </a-button>
          <a-button type="primary" class="margin-l-20" @click="handleSubmit" :loading="button.loading">保存</a-button>
        </div>
      </a-form-model>
      <!-- <tree-modal
        v-if="listObj.visiable"
        v-model="listObj.visiable"
        :data="listObj.data"
        @confirm="confirmTree"
      ></tree-modal> -->
    </a-modal>
  </div>
</template>

<script>
import model from '@/public/addModel.js'
import rules from '@/public/rules'
import { save } from '@/api/role'
// import TreeModal from './Tree.vue'
import { treeData } from '@/utils/auth'
export default {
  mixins: [model, rules],
  // components: { TreeModal },
  data () {
    return {
      formInit: {
        id: null,
        roleName: null,
        menu: [],
        menus: []
      },
      // listObj: {
      //   visiable: false,
      //   data: null
      // },
      treeData,
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: []
    }
  },
  computed: {
    isDetail () {
      const { type } = this.data
      return type === 'detail'
    }
  },
  created () {
    const { type } = this.data
    const title = type === 'edit' ? '修改' : '详情'
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
    if (type === 'edit' || type === 'detail') {
      this.delParentKeys()
    }
  },
  methods: {
    confirmTree (checkedKeys) {
      this.formInit.menus = this.$copy(checkedKeys)
      this.formInit.menu = this.$copy(checkedKeys).join(',')
    },
    clickTree () {
      this.$setKeyValue(this.listObj, { visiable: true, data: { type: 'tree', obj: this.formInit.menus } })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.$refs.form.validate((valid) => {
        if (valid) {
          const { type, obj } = this.data
          const params = { ...this.formInit }
          if (type === 'edit') {
            params.id = obj.id
          }
          params.menus = this.addParentKey(params.menus)
          params.menu = this.$copy(params.menus).join(',')
          this.$setKeyValue(this.button, { loading: true, text: '提交中' })
          save(params).then((result) => this.process(result))
        } else {
          this.$message.warning('请完善上面必填信息')
        }
      })
    },
    delParentKeys () {
      const { obj } = this.data
      const objA = this.$copy(obj)
      const checkedKeys = this.$copy(objA.menus || [])
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
      objA.menus = checkedKeys
      this.$setOriginalKV(this.formInit, objA)
    },
    addParentKey (keys) {
      let checkedKeys = this.$copy(keys); const eachKeys = []
      this.selectParents(this.treeData, checkedKeys, eachKeys)
      checkedKeys = checkedKeys.concat(eachKeys)
      checkedKeys = new Set(checkedKeys)
      checkedKeys = Array.from(checkedKeys)
      return checkedKeys
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
