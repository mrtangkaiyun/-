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
            <a-form-model-item label="任务名称">
              <a-input disabled placeholder="请输入" v-model="formInit.a" />
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="任务截至日期">
              <a-date-picker disabled v-model="formInit.date" />
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="发布日期">
              <a-date-picker disabled v-model="formInit.date" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8">
            <a-form-model-item label="发布人">
              <a-select disabled v-model="formInit.sex" placeholder="请选择">
                <a-select-option v-for="item in issuerOptions" :key="item.value" :value="item.value">
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="任务执行人">
              <a-input disabled placeholder="请输入" v-model="formInit.b" />
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="任务状态">
              <a-input disabled placeholder="请输入" v-model="formInit.c" />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="15">
            <a-form-model-item label="任务要求">
              <a-textarea disabled placeholder="请输入文本..." style="width:98%" v-model="formInit.d" :autosize="{ maxRows: 5, minRows: 5 }" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="15">
            <a-form-model-item label="执行反馈说明">
              <a-textarea placeholder="请输入文本..." style="width:98%" v-model="formInit.d" :autosize="{ maxRows: 5, minRows: 5 }" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="15">
            <a-form-model-item label="结果资料">
              <div style="width:98%">
                <a-upload
                  ref="upxlsx"
                  name="file"
                  :multiple="true"
                  :customRequest="customRequest"
                  accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
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
                  <template slot="index" slot-scope="index, record, i">
                    {{ i + 1 }}
                  </template>
                  <span slot="action" slot-scope="text, record">
                    <a href="javascript:;" @click="clickDownLoad(record)">下载</a>
                    <a-divider type="vertical" />
                    <popconfirm-button :data="record" @click="clickDelete"></popconfirm-button>
                  </span>
                </a-table>
              </div>
            </a-form-model-item>
          </a-col>
        </a-row>

        <!-- <div class="text-center">
          <a-button @click="closeDialog"> 取消 </a-button>
          <a-button type="primary" class="margin-l-20" @click="handleSubmit" :loading="button.loading">保存</a-button>
        </div> -->
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import model from '@/public/addModel.js'
import rules from '@/public/rules'
import indexModel from '@/public/indexModel.js'
import { save, load } from '@/api/goods'
import { editColumns } from './js/index'
import { downLoadExcel } from '@/utils/util'
import { issuerOptions } from '@/utils/option'
export default {
  mixins: [model, rules, indexModel],
  data () {
    return {
      formInit: { a: null, b: null, c: null, d: null, e: null, f: null, g: null },
      columns: editColumns,
      issuerOptions
    }
  },
  created () {
    const { type } = this.data
    const title = type === 'add' ? '任务跟进' : '任务详情'
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
    if (type === 'edit') {
      this.fetchInfo()
    }
  },
  methods: {
    clickDownLoad () {
      remove({ type: 1, operationType: 2 }).then((res) => {
        if (res) {
          const fileName = `账号导入模板`
          downLoadExcel(res, fileName).then(() => {})
        }
      })
    },
    clickDelete (record) {
      remove(record.id).then(({ code }) => {
        if (code === 1) {
          this.$message.success('删除成功')
          this.conditionPage()
          this.fetchData(this.params)
        }
      })
    },
    customRequest (e) {
      const form = new FormData()
      form.append('file', e.file)
      remove(form).then(({ code, message }) => {
        if (code === 0) {
          this.$refs.table.refresh()
          this.$message.success(message || '导入成功')
        } else {
          this.$message.error(message || 'Error')
        }
      })
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
