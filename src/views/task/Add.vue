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
      <a-form-model ref="form" :model="formInit" loading :wrapper-col="{ span: 22 }">
        <a-row>
          <a-col :span="8">
            <a-form-model-item label="任务名称" prop="taskName">
              <a-input disabled placeholder="请输入" v-model="taskExecutorObj.taskName" />
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="任务截至日期" prop="endTime">
              <a-date-picker disabled v-model="taskExecutorObj.endTime" />
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="发布日期" prop="startTime">
              <a-date-picker disabled v-model="taskExecutorObj.startTime" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8">
            <a-form-model-item label="发布人" prop="publisher">
              <a-input style="display:none" placeholder="请输入" v-model="taskExecutorObj.publisher" />
              <a-input disabled placeholder="请输入" :value="taskExecutorObj.publisherName" />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="任务状态" prop="publisher">
              <a-input disabled placeholder="请输入" v-model="taskExecutorObj.taskStatus" />
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="任务执行人" prop="taskExecutor">
              <a-input disabled placeholder="请输入" v-model="taskExecutorObj.studentName" />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="15">
            <a-form-model-item label="任务要求" prop="taskDemand">
              <a-textarea disabled placeholder="请输入文本..." style="width:98%" v-model="taskExecutorObj.taskDemand" :autosize="{ maxRows: 5, minRows: 5 }" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="15">
            <a-form-model-item label="执行反馈说明">
              <a-textarea :disabled="isDetail" placeholder="请输入文本..." style="width:98%" v-model="formInit.feedback" :autosize="{ maxRows: 5, minRows: 5 }" />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row v-if="isEdit || isDetail">
          <a-col :span="15">
            <a-form-model-item label="结果资料">
              <div style="width:98%">
                <a-button v-show="!isDetail" @click="importFile">
                  <a-icon type="upload" />文件上传
                </a-button>
                <a-upload
                  v-show="false"
                  ref="upxlsx"
                  name="file"
                  :multiple="true"
                  :customRequest="customRequest"
                  accept="doc,.pdf,.docx,.csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                >
                  <a-button>
                    <a-icon type="upload" />文件上传
                  </a-button>
                </a-upload>
                <a-table
                  :columns="columns"
                  :dataSource="table.data"
                  rowKey="id"
                  :loading="table.loading"
                >
                  <span slot="action" slot-scope="text, record">
                    <a href="javascript:;" @click="clickDownLoad(record)">下载</a>
                    <a-divider v-if="isEdit" type="vertical" />
                    <popconfirm-button v-if="isEdit" :data="record" @click="deleteWordName"></popconfirm-button>
                  </span>
                </a-table>
              </div>
            </a-form-model-item>
          </a-col>
        </a-row>
        <div v-if="!isDetail" class="text-center">
          <a-button type="primary" class="margin-l-20" @click="handleSubmit" :loading="button.loading">保存</a-button>
          <a-button @click="closeDialog"> 关闭 </a-button>
        </div>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import model from '@/public/addModel.js'
import rules from '@/public/rules'
import indexModel from '@/public/indexModel.js'
import { pupilEdit, load, removeWordName, EditUploadExcel, downLoadFile } from '@/api/train'
import { editColumns } from './js/index'
import { downLoadExcel } from '@/utils/util'
import { issuerOptions } from '@/utils/option'
export default {
  mixins: [model, rules, indexModel],
  data () {
    return {
      taskExecutorObj: { },
      formInit: {
        // id: null,  // 任务id
        feedback: null
        // publisher: null,
        // taskExecutor: null,
        // taskName: null,
        // taskStatusVo: null
      },
      columns: editColumns,
      issuerOptions
    }
  },
  computed: {
    isDetail () {
      const { type } = this.data
      return type === 'detail'
    },
    isEdit () {
      const { type } = this.data
      return type === 'edit'
    }
  },
  created () {
    const { type } = this.data
    const title = type === 'add' ? '任务发布' : type === 'edit' ? '任务编辑' : '任务详情'
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
    if (type === 'edit' || type === 'detail') {
      this.fetchInfo()
    }
  },
  methods: {
    fetchInfo () {
      const { obj } = this.data
      load(obj.id).then(({ code, data }) => {
        if (code === 0) {
          this.table.data = data.wordNames ? data.wordNames.map((e, i) => ({ idx: i + 1, name: e })) : []
          this.taskExecutorObj = {
            studentName: data.taskExecutorName,
            studentId: data.taskExecutor,
            ...data
          }
          this.originalData = this.$copy(data)
          this.$setOriginalKV(this.formInit, data)
        }
      })
    },
    confirmSelected (selected) {
      this.taskExecutorObj = selected
      this.formInit.taskExecutor = selected.studentId
    },
    clickDownLoad (record) {
      const { obj } = this.data
      downLoadFile({ id: obj.id, row: record.idx }).then((res) => {
        if (res) {
          const fileName = record.name
          downLoadExcel(res, fileName).then(() => {})
        }
      })
    },
    deleteWordName (record) {
      const { obj } = this.data
      removeWordName({ id: obj.id, row: record.idx }).then(({ code }) => {
        if (code === 0) {
          this.$message.success('删除成功')
          this.fetchInfo()
        }
      })
    },
    importFile () {
      this.$refs['upxlsx'].$el.getElementsByTagName('input')[0].click()
    },
    customRequest (e) {
      const { obj } = this.data
      const form = new FormData()
      form.append('file', e.file)
      form.append('id', obj.id)
      EditUploadExcel(form).then(({ code, message }) => {
        if (code === 0) {
          this.fetchInfo()
          this.$message.success(message || '上传成功')
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
          this.$setKeyValue(this.button, { loading: true, text: '提交中' })
          if (type === 'edit') {
            params.id = obj.id
            pupilEdit(params).then((result) => this.process(result))
          }
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
