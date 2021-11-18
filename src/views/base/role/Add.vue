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
          <!-- <a-input style="display: none" placeholder="请输入" v-model="formInit.menus" /> -->
          <a-button @click="clickTree()"> <a-icon type="plus" />点击勾选 </a-button>
        </a-form-model-item>
        <div v-if="!isDetail" class="text-center">
          <a-button @click="closeDialog"> 取消 </a-button>
          <a-button type="primary" class="margin-l-20" @click="handleSubmit" :loading="button.loading">保存</a-button>
        </div>
      </a-form-model>
      <tree-modal
        v-if="listObj.visiable"
        v-model="listObj.visiable"
        :data="listObj.data"
        @confirm="confirmTree"
      ></tree-modal>
    </a-modal>
  </div>
</template>

<script>
import model from '@/public/addModel.js'
import rules from '@/public/rules'
import { save } from '@/api/role'
import TreeModal from './Tree.vue'
export default {
  mixins: [model, rules],
  components: { TreeModal },
  data () {
    return {
      formInit: {
        id: null,
        roleName: null,
        menu: [],
        menus: []
      },
      listObj: {
        visiable: false,
        data: null
      }
    }
  },
  computed: {
    isDetail () {
      const { type } = this.data
      return type === 'detail'
    }
  },
  created () {
    const { type, obj } = this.data
    const title = type === 'edit' ? '修改' : '详情'
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
    if (type === 'edit' || type === 'detail') {
      this.$setOriginalKV(this.formInit, obj)
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
          this.$setKeyValue(this.button, { loading: true, text: '提交中' })
          save(params).then((result) => this.process(result))
        } else {
          this.$message.warning('请完善上面必填信息')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
