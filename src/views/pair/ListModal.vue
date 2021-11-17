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
        <search-bar ref="searchbar" :data="searchData" @search="clickSearch"></search-bar>
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
          <template slot="state" slot-scope="state, record">
            {{ data.type === 1 ? state : record.status }}
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
import { listColumns, listSearchData } from './js/index'
import { list } from '@/api/master'
import { valueToLabelOption } from '@/utils/option'
export default {
  mixins: [model, indexModel],
  data () {
    return {
        searchData: listSearchData,
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
    valueToLabelOption,
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
        params.isType = type === 1 ? '师傅' : '徒弟'
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
