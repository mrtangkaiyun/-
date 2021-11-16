<template>
  <div>
    <a-modal
      v-model="dialog.visiable"
      :afterClose="closeDialog"
      :title="dialog.title"
      :footer="null"
      :keyboard="false"
      :maskClosable="false"
      width="600px"
    >
      <a-form-model ref="form" :model="formInit" loading :label-col="{ span: 4 }" :wrapper-col="{ span: 19 }">
        <a-form-model-item label="分类名称" prop="classifyName" :rules="rules.input">
          <a-input placeholder="请输入分类名称" v-model="formInit.classifyName" />
        </a-form-model-item>
      </a-form-model>
      <a-form-model-item v-bind="buttonLayout">
        <a-button type="primary" @click="handleSubmit" html-type="submit" :loading="button.loading">{{
          button.text
        }}</a-button>
      </a-form-model-item>
    </a-modal>
  </div>
</template>

<script>
import model from '@/public/addModel.js'
import rules from '@/public/rules'
import { save } from '@/api/classify'
export default {
  mixins: [model, rules],
  data () {
    return {
      formInit: {
        classifyName: null
      }
    }
  },
  created () {
    const { type, obj } = this.data
    const title = type === 'add' ? '新增' : '修改'
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
    if (type === 'edit') {
      this.originalData = this.$copy(obj)
      this.$setOriginalKV(this.formInit, obj)
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.$refs.form.validate((valid) => {
        if (valid) {
          const { type, obj } = this.data
          const params = { ...this.formInit }
          if (type === 'edit' && this.$compareObjValue(this.originalData, params)) {
            this.$message.warning('数据没有任何修改')
            return
          }
          if (type === 'edit') {
            params.id = obj.id
          }
          this.$setKeyValue(this.button, { loading: true, text: '提交中' })
          save(params).then((result) => this.process(result))
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.e-row {
  padding: 20px 0;
  border: 1px dashed #c7c7c7;
  border-radius: 6px;
  margin-bottom: 26px;
  .title {
    font-weight: bold;
    font-size: 20px;
    text-indent: 80px;
    text-align: right;
    position: relative;
    top: -38px;
    right: 10px;
  }
  .icon {
    font-size: 26px;
    cursor: pointer;
    color: #1890ff;
    position: relative;
    top: 3px;
    margin-right: 10px;
  }
  .margin20 {
    margin-right: 30px;
  }
}
</style>
