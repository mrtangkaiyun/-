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
      width="1000px"
    >
      <a-form-model ref="form" :model="formInit" loading :wrapper-col="{ span: 21 }">
        <a-row>
          <a-col :span="6">
            <a-form-model-item label="选择师傅" prop="a" :rules="rules.select">
              <a-input style="display:none" placeholder="请输入" v-model="formInit.a" />
              <a-button @click="clickListModal(1)">
                <a-icon type="plus" />点击选择师傅
              </a-button>
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="选择徒弟" prop="b" :rules="rules.select">
              <a-input style="display:none" placeholder="请输入" v-model="formInit.b" />
              <a-button @click="clickListModal(2)">
                <a-icon type="plus" />点击选择徒弟
              </a-button>
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="出生日期" prop="c" :rules="rules.select">
              <a-date-picker v-model="formInit.c" />
            </a-form-model-item>
          </a-col>
        </a-row>

        <div class="text-center padding-t-50">
          <a-button @click="closeDialog"> 取消 </a-button>
          <a-button type="primary" class="margin-l-20" @click="handleSubmit" :loading="button.loading">保存</a-button>
        </div>
      </a-form-model>
      <list-modal v-if="listObj.visiable" v-model="listObj.visiable" :data="listObj.data" @confirm="confirmSelectedRowKeys"></list-modal>
    </a-modal>
  </div>
</template>

<script>
import model from '@/public/addModel.js'
import rules from '@/public/rules'
import ListModal from './ListModal'
import { save, load } from '@/api/goods'
export default {
  mixins: [model, rules],
  components: { ListModal },
  data () {
    return {
      classOptions: [],
      formInit: { a: [], b: [] },
      listObj: {
        visiable: false,
        data: null
      }
    }
  },
  created () {
    const { type } = this.data
    const title = type === 'add' ? '师徒配对' : '师徒配对'
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
    if (type === 'edit') {
      // this.fetchInfo()
    }
  },
  methods: {
    clickListModal (type) {
      this.$setKeyValue(this.listObj, { visiable: true, data: { type, obj: type === 1 ? this.formInit.a : this.formInit.b } })
    },
    confirmSelectedRowKeys (selectedRowKeys, type) {
      if (type === 1) {
        this.formInit.a = selectedRowKeys
      } else {
        this.formInit.b = selectedRowKeys
      }
    },
    fetchInfo () {
      const { obj } = this.data
      load(obj.id).then(({ code, data }) => {
        if (code === 1) {
          data.imgDtos = data.imgDtos.map((e) => e.imgPath)
          this.originalData = this.$copy(data)
          this.$setOriginalKV(this.formInit, data)
        }
      })
    },
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
