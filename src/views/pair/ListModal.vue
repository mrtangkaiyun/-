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
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
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
import { load } from '@/api/goods'
export default {
  mixins: [model, indexModel],
  data () {
    return {
        columns: listColumns
    }
  },
  created () {
    console.log(1234561111)
    const { obj, type } = this.data
    const title = type === 1 ? '师傅列表' : '徒弟列表'
    console.log(type, 1234561111)
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
    this.selectedRowKeys = obj
    if (type === 1) {
      // this.fetchData()
    } else {
      // this.fetchData()
    }
  },
  methods: {
    fetchData (params = {}) {
      if (!this.table.loading) {
        const { current, pageSize } = this.pagination
        params.currentPage = current
        params.currentSize = pageSize
        this.table.loading = true
        load(params).then(({ code, data }) => {
          this.table.loading = false
          if (code === 1) {
            this.pagination.total = data.total
            this.table.data = data.records
          }
        })
      }
    },
    confirm () {
       const { type } = this.data
      this.$emit('confirm', this.selectedRowKeys, type)
      this.closeDialog()
    }
  }
}
</script>
<style lang="less" scoped>
</style>
