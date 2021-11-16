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
      width="800px"
    >
      <div>
        <a-table
          :columns="columns"
          :dataSource="table.data"
          rowKey="id"
          :size="table.size"
          :loading="table.loading"
          :pagination="pagination"
          @change="handleTabChange"
          :row-selection="{ type: 'radio', selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          :scroll="{ x: 600, y: 800 }"
        >
          <template slot="index" slot-scope="index, record, i">
            {{ i + 1 }}
          </template>
        </a-table>
        <div class="text-center padding-t-50">
          <a-button @click="confirm"> 确定 </a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import model from '@/public/addModel.js'
import indexModel from '@/public/indexModel.js'
import { listColumns } from './js/index'
import { list } from '@/api/master'
export default {
  mixins: [model, indexModel],
  data () {
    return {
        columns: listColumns,
        selectedRows: []
    }
  },
  created () {
    const { obj, type } = this.data
    console.log(obj, type, 7777777)
    const title = type === 1 ? '师傅列表' : '徒弟列表'
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
    this.selectedRowKeys = obj ? [obj.id] : []
    this.selectedRows = obj ? [obj] : []
    this.fetchData()
  },
  methods: {
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    fetchData (params = {}) {
      const { type } = this.data
      if (!this.table.loading) {
        const { current, pageSize } = this.pagination
        params.pageNum = current
        params.pageSize = pageSize
        params.type = type
        this.table.loading = true
        list(params).then(({ code, data }) => {
          this.table.loading = false
          if (code === 0) {
            this.pagination.total = data.total
            this.table.data = data.rows
          }
        })
      }
    },
    confirm () {
      const { type } = this.data
      if (!this.selectedRows.length) {
        return this.$message.warning('请选择一条数据')
      }
      this.$emit('confirm', this.selectedRows[0], type)
      this.closeDialog()
    }
  }
}
</script>
<style lang="less" scoped>
</style>
