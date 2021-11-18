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
      <a-tabs default-active-key="1" v-model="active">
        <a-tab-pane key="1" tab="修改信息">
          <a-form-model ref="form" :model="formInit" loading :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
            <a-form-model-item label="（编号）账号" prop="userName">
              <a-input disabled placeholder="请输入" v-model="formInit.userName" />
            </a-form-model-item>
            <a-form-model-item label="角色" prop="authority">
              <a-select :disabled="isDetail" v-model="formInit.authority" placeholder="请选择">
                <a-select-option :value="item.roleName" :key="item.id" v-for="item in roleList">{{
                  item.roleName
                }}</a-select-option>
              </a-select>
            </a-form-model-item>
            <!-- <a-form-model-item label="密码" prop="passWord" :rules="rules.input">
              <a-input-password autocomplete="off" v-model="formInit.passWord" />
            </a-form-model-item>
            <a-form-model-item label="确认密码" prop="newPassWord" :rules="rules.input">
              <a-input-password autocomplete="off" v-model="formInit.newPassWord" />
            </a-form-model-item> -->
            <div v-if="!isDetail" class="text-center">
              <a-button @click="closeDialog"> 取消 </a-button>
              <a-button
                type="primary"
                class="margin-l-20"
                @click="handleSubmit"
                :loading="button.loading"
              >保存</a-button
              >
            </div>
          </a-form-model>
        </a-tab-pane>
      </a-tabs>
    </a-modal>
  </div>
</template>

<script>
import model from '@/public/addModel.js'
import rules from '@/public/rules'
// import { updatePwd } from '@/api/user'
import { save } from '@/api/account'
import { list } from '@/api/role'
export default {
  mixins: [model, rules],
  data () {
    return {
      formInit: {
        authority: null,
        userName: null
        // passWord: null,
        // newPassWord: null
        // id: null
      },
      active: '1',
      roleList: []
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
      this.formInit.authority = obj.roleName
      this.formInit.userName = obj.number
      this.getRoleList()
    }
  },
  methods: {
    getRoleList () {
      const params = { }
      params.pageNum = 1
      params.pageSize = 100
        list(params).then(({ code, data }) => {
          if (code === 0) {
            this.roleList = data.rows
          }
        })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.$refs.form.validate((valid) => {
        if (valid) {
          const { type, obj } = this.data
          const params = {
            ...this.formInit
          }
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
