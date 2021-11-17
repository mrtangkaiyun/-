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
            <a-form-model-item label="选择师傅" prop="masterId" :rules="rules.select">
              <a-input style="display: none" placeholder="请输入" v-model="formInit.masterId" />
              <a-radio-group v-if="formInit.masterId" button-style="solid">
                <a-radio-button style="margin: 15px" :value="formInit.masterId">
                  {{ formInit.masterName }}
                </a-radio-button>
              </a-radio-group>
              <a-button @click="clickListModal(1)"> <a-icon type="plus" />点击选择师傅 </a-button>
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="选择徒弟" prop="studentId" :rules="rules.select">
              <a-input style="display: none" placeholder="请输入" v-model="formInit.studentId" />
              <a-radio-group v-if="formInit.studentId" button-style="solid">
                <a-radio-button style="margin: 15px" :value="formInit.studentId">
                  {{ formInit.studentName }}
                </a-radio-button>
              </a-radio-group>
              <a-button @click="clickListModal(2)"> <a-icon type="plus" />点击选择徒弟 </a-button>
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="出生日期" prop="foundTime" :rules="rules.select">
              <a-date-picker v-model="formInit.foundTime" />
            </a-form-model-item>
          </a-col>
        </a-row>

        <div class="text-center padding-t-50">
          <a-button @click="closeDialog"> 取消 </a-button>
          <a-button type="primary" class="margin-l-20" @click="handleSubmit" :loading="button.loading">保存</a-button>
        </div>
      </a-form-model>
      <list-modal
        v-if="listObj.visiable"
        v-model="listObj.visiable"
        :data="listObj.data"
        @confirm="confirmSelectedRow"
      ></list-modal>
    </a-modal>
  </div>
</template>

<script>
import moment from 'moment'
import model from '@/public/addModel.js'
import rules from '@/public/rules'
import ListModal from './ListModal'
import { add } from '@/api/pair'
export default {
  mixins: [model, rules],
  components: { ListModal },
  data () {
    return {
      classOptions: [],
      formInit: {
        foundTime: null,
        masterId: null,
        masterName: null,
        studentId: null,
        studentName: null
      },
      listObj: {
        visiable: false,
        data: null
      }
    }
  },
  created () {
    const { type, obj } = this.data
    const title = type === 'add' ? '师徒配对' : '师徒配对'
    if (obj && obj.masterId) {
      this.formInit.masterId = obj.masterId
      this.formInit.masterName = obj.masterName
    }
    if (obj && obj.studentId) {
      this.formInit.studentId = obj.studentId
      this.formInit.studentName = obj.studentName
    }
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
  },
  methods: {
    clickListModal (type) {
      let obj = null
      if (type === 1) {
        obj = {
          name: this.formInit.masterName,
          id: this.formInit.masterId
        }
      } else {
        obj = {
          name: this.formInit.studentName,
          id: this.formInit.studentId
        }
      }
      this.$setKeyValue(this.listObj, {
        visiable: true,
        data: { type, obj }
      })
    },
    confirmSelectedRow (selectedRow, type) {
      if (type === 1) {
        this.formInit.masterId = selectedRow.id
        this.formInit.masterName = selectedRow.name
      } else {
        this.formInit.studentId = selectedRow.id
        this.formInit.studentName = selectedRow.name
      }
    },
    handleSubmit (e) {
      e.preventDefault()
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = { ...this.formInit }
          params.foundTime = moment(params.foundTime).format('YYYY-MM-DD')
          this.$setKeyValue(this.button, { loading: true, text: '提交中' })
          add(params).then((result) => this.process(result))
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
