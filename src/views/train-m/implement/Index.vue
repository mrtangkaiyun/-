<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <search-bar ref="searchbar" :data="searchData" @search="clickSearch" @taskStart="taskStartAndEnd(1)" @taskEnd="taskStartAndEnd(2)"></search-bar>
        <!-- <div class="delete-box">
          <popconfirm-button custom :data="record" @click="clickDeleteSelect">
            <a-button :disabled="!selectedRowKeys || selectedRowKeys.length === 0" type="danger">
              删除
            </a-button>
          </popconfirm-button>
        </div> -->
        <a-table
          :columns="columns"
          :dataSource="table.data"
          rowKey="id"
          :size="table.size"
          :loading="table.loading"
          :pagination="pagination"
          @change="handleTabChange"
          :row-selection="{ type: 'radio', selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          :scroll="{ x: 900 }"
        >
          <template slot="index" slot-scope="index, record, i">
            {{ i + 1 }}
          </template>
          <span slot="action" slot-scope="text, record">
            <a-button type="primary" shape="circle" icon="form" @click="clickUpdate(record)"/>
            <a-divider type="vertical" />
            <a-button type="primary" shape="circle" icon="info" @click="clickDetail(record)"/>
            <a-divider type="vertical" />
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
import { taskList, levelRemove, startAndEndTask } from '@/api/train'
import model from '@/public/indexModel.js'
import Add from '../Add.vue'
export default {
  name: 'Implement',
  mixins: [model],
  components: {
    Add
  },
  data () {
    return {
      id: null,
      columns,
      searchData,
      listObj: {
        visiable: false,
        data: null
      }
    }
  },
  created () {
    this.id = this.$route.query.id
    this.fetchData()
  },
  methods: {
    taskStartAndEnd (v) {
      if (this.selectedRowKeys && this.selectedRowKeys.length >= 1) {
        const id = this.selectedRowKeys[0]
        const row = this.table.data.find(e => (e.id === id))
        startAndEndTask({ id, state: row.taskState || row.state }).then(({ code, message }) => {
          if (code === 0) {
            this.$message.success(message || '操作成功')
            this.conditionPage()
            this.fetchData(this.params)
            this.selectedRowKeys = []
          }
        })
      } else {
        this.$message.warning('请选择一条数据')
      }
    },
    fetchData (params = {}) {
      if (!this.table.loading) {
        const { current, pageSize } = this.pagination
        params.pageNum = current
        params.pageSize = pageSize
        params.id = this.id
        this.table.loading = true
        taskList(params).then(({ code, data }) => {
          this.table.loading = false
          if (code === 0) {
            this.pagination.total = data.total
            this.table.data = data.rows
          }
        })
      }
    },
    // clickDeleteSelect () {
    //   const { selectedRowKeys } = this
    // },
    clickDelete (record) {
      levelRemove({id: record.id}).then(({ code }) => {
        if (code === 0) {
          this.$message.success('删除成功')
          this.conditionPage()
          this.fetchData(this.params)
        }
      })
    },
    clickDetail (record) {
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'detail', obj: record } })
    },
    clickListRecord (record) {
      this.$setKeyValue(this.listObj, { visiable: true, data: { type: 'list', obj: record } })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
