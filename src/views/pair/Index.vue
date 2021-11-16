<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <search-bar ref="searchbar" :data="searchData" @search="clickSearch" @pair="pair"></search-bar>
        <div class="delete-box">
          <popconfirm-button custom :data="record" @click="clickDeleteSelect">
            <a-button :disabled="!selectedRowKeys || selectedRowKeys.length === 0" type="danger">
              删除
            </a-button>
          </popconfirm-button>
        </div>
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
          <span slot="action" slot-scope="text, record">
            <popconfirm-button custom :data="record" @click="clickDelete">
              <a-button type="danger" shape="circle" icon="delete"/>
            </popconfirm-button>
          </span>
        </a-table>
      </div>
    </a-card>
    <add v-if="add.visiable" v-model="add.visiable" :data="add.data" @add="refresh" @edit="fetchData"></add>
  </page-header-wrapper>
</template>

<script>
import { columns, searchData } from './js/index'
import { list, remove } from '@/api/goods'
import model from '@/public/indexModel.js'
import Add from './Add'
export default {
  name: 'Pair',
  mixins: [model],
  components: {
    Add
  },
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
    pair () {
      if (!this.selectedRowKeys || this.selectedRowKeys.length === 0) {
        this.clickAdd()
      } else if (this.selectedRowKeys.length === 1) {
        this.clickUpdate({ })
      } else {
        this.$message.warning('请选择一条数据进行师徒匹配')
      }
    },
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
    },
    clickDeleteSelect () {
      const { selectedRowKeys } = this
    },
    clickDelete (record) {
      remove(record.id).then(({ code }) => {
        if (code === 1) {
          this.$message.success('删除成功')
          this.conditionPage()
          this.fetchData(this.params)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
