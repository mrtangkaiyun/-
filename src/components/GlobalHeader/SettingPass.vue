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
        <a-form-model-item label="（编号）账号" prop="userName">
          <a-input disabled placeholder="请输入" v-model="formInit.userName" />
        </a-form-model-item>
        <a-form-model-item label="原密码" prop="passWord" :rules="rules.input">
          <a-input-password autocomplete="off" v-model="formInit.passWord" />
        </a-form-model-item>
        <a-form-model-item label="新密码" prop="newPassWord" :rules="rules.input">
          <a-input-password autocomplete="off" v-model="formInit.newPassWord" />
        </a-form-model-item>
        <div class="text-center">
          <a-button @click="closeDialog"> 取消 </a-button>
          <a-button type="primary" class="margin-l-20" @click="handleSubmit" :loading="button.loading">保存</a-button>
        </div>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import model from '@/public/addModel.js'
import rules from '@/public/rules'
import { updatePwd, getInfo } from '@/api/user'
export default {
  mixins: [model, rules],
  data () {
    return {
      formInit: {
        id: null,
        userName: null,
        newPassWord: null,
        passWord: null
      }
    }
  },
  computed: {},
  created () {
    const title = '修改密码'
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
    this.fetchData()
  },
  methods: {
    fetchData () {
      getInfo().then(({ code, data }) => {
        if (code === 0) {
          this.formInit.id = data.id
          this.formInit.userName = data.username
          // this.$setOriginalKV(this.formInit, data)
        }
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = {
            ...this.formInit
          }
          this.$setKeyValue(this.button, { loading: true, text: '提交中' })
          updatePwd(params).then((result) => this.process(result))
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
