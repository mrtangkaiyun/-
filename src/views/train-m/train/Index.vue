<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <search-bar ref="searchbar" :data="searchData" @search="clickSearch" @graduation="graduation" @task="task"></search-bar>
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
          <template slot="isGraduation" slot-scope="isGraduation">
            {{ isGraduation == 1 ? '已出师' : '未出师' }}
          </template>
          <template slot="action" slot-scope="text, record">
            <!-- {{ rr }} 1  -->
            <a-button type="primary" size="small" shape="circle" icon="menu" @click="clickListRecord(record)"/>
          </template>
          <!-- <span slot="action" slot-scope="text, record">
            <a-button type="primary" shape="circle" icon="form" @click="clickUpdate(record)"/>
            <a-divider type="vertical" />
            <a-button type="primary" shape="circle" icon="menu" @click="clickListRecord(record)"/>
            <a-divider type="vertical" />
            <popconfirm-button custom :data="record" @click="clickDelete">
               <a-button type="danger" shape="circle" icon="delete"/>
            </popconfirm-button>
          </span> -->
        </a-table>
      </div>
    </a-card>
    <add v-if="add.visiable" v-model="add.visiable" :data="add.data" @add="refresh" @edit="fetchData"></add>
    <list-modal v-if="listObj.visiable" v-model="listObj.visiable" :data="listObj.data" @add="refresh" @edit="fetchData"></list-modal>
  </page-header-wrapper>
</template>

<script>
import { columns, searchData } from './js/index'
import { list, updateById } from '@/api/pair'
import model from '@/public/indexModel.js'
import ListModal from '../ListModal'
import Add from '../Add'
export default {
  name: 'Master',
  mixins: [model],
  components: {
    Add,
    ListModal
  },
  data () {
    return {
      columns,
      searchData,
      listObj: {
        visiable: false,
        data: null
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData (params = {}) {
      if (!this.table.loading) {
        const { current, pageSize } = this.pagination
        params.pageNum = current
        params.pageSize = pageSize
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
    // clickDeleteSelect () {
    //   const { selectedRowKeys } = this
    // },
    // clickDelete (record) {
    //   remove(record.id).then(({ code }) => {
    //     if (code === 0) {
    //       this.$message.success('删除成功')
    //       this.conditionPage()
    //       this.fetchData(this.params)
    //     }
    //   })
    // },
    graduation () { // 已出师
      if (this.selectedRowKeys && this.selectedRowKeys.length >= 1) {
        const id = this.selectedRowKeys[0]
        updateById({ id }).then(({ code, message }) => {
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
    task () { // 任务发布
      if (this.selectedRowKeys && this.selectedRowKeys.length === 1) {
        const id = this.selectedRowKeys[0]
        const obj = this.table.data.find(e => (e.id === id))
        this.$setKeyValue(this.add, { visiable: true, data: { type: 'add', obj } })
      } else {
        this.$message.warning('请选择一条数据')
      }
    },
    clickListRecord (record) {
      this.$router.push({ path: '/implement', query: { id: record.studentId } })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
