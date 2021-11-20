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
              <a-input placeholder="请输入" v-model="formInit.taskName" />
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="任务截至日期" prop="endTime">
              <a-date-picker v-model="formInit.endTime" />
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="发布日期" prop="startTime">
              <a-date-picker v-model="formInit.startTime" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8">
            <a-form-model-item label="发布人" prop="publisher">
              <a-input style="display:none" placeholder="请输入" v-model="formInit.publisher" />
              <a-input disabled placeholder="请输入" :value="publisherName" />
              <!-- <a-select v-model="formInit.sex" placeholder="请选择">
                <a-select-option v-for="item in issuerOptions" :key="item.value" :value="item.value">
                  {{ item.label }}
                </a-select-option>
              </a-select> -->
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="任务执行人" prop="taskExecutor">
              <a-input style="display: none" placeholder="请输入" v-model="formInit.taskExecutor" />
              <a-radio-group v-if="formInit.taskExecutor" button-style="solid">
                <a-radio-button disabled style="margin: 15px" :value="formInit.taskExecutor">
                  {{ taskExecutorObj.studentName }}
                </a-radio-button>
              </a-radio-group>
              <a-button v-if="!isDetail && !isEdit" @click="clickListModal()">
                <a-icon type="plus" />点击选择
              </a-button>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="15">
            <a-form-model-item label="任务要求" prop="taskDemand">
              <a-textarea placeholder="请输入文本..." style="width:98%" v-model="formInit.taskDemand" :autosize="{ maxRows: 5, minRows: 5 }" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row v-if="isEdit || isDetail">
          <a-col :span="15">
            <a-form-model-item label="执行反馈说明">
              <a-textarea disabled placeholder="请输入文本..." style="width:98%" v-model="formInitInfo.feedback" :autosize="{ maxRows: 5, minRows: 5 }" />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row v-if="isEdit || isDetail">
          <a-col :span="15">
            <a-form-model-item label="结果资料">
              <div style="width:98%">
                <a-table
                  :columns="columns"
                  :dataSource="table.data"
                  rowKey="id"
                  :loading="table.loading"
                >
                  <template slot="index" slot-scope="index, record, i">
                    {{ i + 1 }}
                  </template>
                  <span slot="action" slot-scope="text, record">
                    <a href="javascript:;" @click="clickDownLoad(record)">下载</a>
                  </span>
                </a-table>
              </div>
            </a-form-model-item>
          </a-col>
        </a-row>

        <div v-if="!isDetail" class="text-center">
          <a-button @click="closeDialog"> 取消 </a-button>
          <a-button type="primary" class="margin-l-20" @click="handleSubmit" :loading="button.loading">保存</a-button>
        </div>
      </a-form-model>
      <list-modal v-if="listObj.visiable" v-model="listObj.visiable" :data="listObj.data" @confirm="confirmSelected"></list-modal>
    </a-modal>
  </div>
</template>

<script>
import moment from 'moment'
import model from '@/public/addModel.js'
import rules from '@/public/rules'
import indexModel from '@/public/indexModel.js'
import { saveAdd, saveEdit, load, downLoadFile } from '@/api/train'
import { editColumns } from './js/index'
import { downLoadExcel } from '@/utils/util'
import { issuerOptions } from '@/utils/option'
import ListModal from './ListModal.vue'
export default {
  mixins: [model, rules, indexModel],
  components: { ListModal },
  data () {
    return {
      taskExecutorObj: { },
      publisherName: null,
      formInit: {
        // rspId: null,  // 一级页面id 新增关联
        // id: null,  // 修改任务id
        taskName: null,
        endTime: null,
        publisher: null, // 发布人id
        startTime: null,
        taskExecutor: null,
        taskDemand: null
      },
      formInitInfo: {

      },
      columns: editColumns,
      issuerOptions,
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
    },
    isEdit () {
      const { type } = this.data
      return type === 'edit'
    }
  },
  created () {
    const { type, obj } = this.data
    const title = type === 'add' ? '任务发布' : type === 'edit' ? '任务编辑' : '任务详情'
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
    if (type === 'edit' || type === 'detail') {
      this.fetchInfo()
    } else {
      if (obj) {
        this.publisherName = obj.masterName
        this.formInit.publisher = obj.masterId
      }
    }
  },
  methods: {
    fetchInfo () {
      const { obj } = this.data
      load(obj.id).then(({ code, data }) => {
        if (code === 0) {
          this.table.data = data.wordNames ? data.wordNames.map((e, i) => ({ idx: i + 1, name: e })) : []
          this.taskExecutorObj = {
            studentName: data.taskExecutorName || obj.studentName,
            studentId: data.taskExecutor || obj.studentId
          }
          if(!data.taskExecutor) {
            data.taskExecutor = obj.studentId
          }
          this.originalData = this.$copy(data)
          this.formInitInfo = this.$copy(data)
          this.$setOriginalKV(this.formInit, data)
        }
      })
    },
    clickListModal () {
      const { obj } = this.data
      const maaId = obj ? obj.masterId : null
      let rowobj = null
      if (this.formInit.taskExecutor) {
        rowobj = this.$copy(this.taskExecutorObj)
      }
      this.$setKeyValue(this.listObj, { visiable: true, data: { type: 'select', maaId, obj: rowobj } })
    },
    confirmSelected (selected) {
      this.taskExecutorObj = selected
      this.formInit.taskExecutor = selected.studentId
    },
    clickDownLoad (record) {
      const { obj } = this.data
      downLoadFile({ id: obj.id, row: record.idx }).then((res) => {
        if (res) {
          const fileName = `结果资料`
          downLoadExcel(res, fileName).then(() => {})
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
          params.startTime = moment(params.startTime).format('YYYY-MM-DD')
          params.endTime = moment(params.endTime).format('YYYY-MM-DD')
          this.$setKeyValue(this.button, { loading: true, text: '提交中' })
          if (type === 'edit') {
            params.id = obj.id
            saveEdit(params).then((result) => this.process(result))
          } else {
            params.rspId = obj.id
            saveAdd(params).then((result) => this.process(result))
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
