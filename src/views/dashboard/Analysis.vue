<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <search-bar ref="searchbar" :data="searchData" @search="clickSearch" @import="importFile" @add="clickAdd"></search-bar>
        <a-table
          :columns="columns"
          :dataSource="table.data"
          rowKey="id"
          :size="table.size"
          :loading="table.loading"
          :pagination="pagination"
          @change="handleTabChange"
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          :scroll="{ x: 900 }"
        >
          <template slot="index" slot-scope="index, record, i">
            {{ i + 1 }}
          </template>
        </a-table>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { columns, searchData } from './js/index'
import { list, remove } from '@/api/goods'
import model from '@/public/indexModel.js'
export default {
  name: 'Analysis',
  mixins: [model],
  data () {
    return {
      columns,
      searchData
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData (params = {}) {
      if (!this.table.loading) {
        const { current, pageSize } = this.pagination
        params.currentPage = current
        params.currentSize = pageSize
        this.table.loading = true
        list(params).then(({ code, data }) => {
          this.table.loading = false
          if (code === 1) {
            this.pagination.total = data.total
            this.table.data = data.records
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
