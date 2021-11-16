<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <search-bar ref="searchbar" :data="searchData" @search="clickSearch" @import="importFile" @add="clickAdd"></search-bar>
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
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          :scroll="{ x: 900 }"
        >
          <template slot="index" slot-scope="index, record, i">
            {{ i + 1 }}
          </template>
          <template slot="company" slot-scope="company">
            {{ valueToLabelOption('companyOptions', company) }}
          </template>
          <template slot="state" slot-scope="state">
            {{ state === 2 ? '带徒中' : '空闲' }}
          </template>
          <template slot="company" slot-scope="company">
            {{ valueToLabelOption('companyOptions', company) }}
          </template>
          <span slot="action" slot-scope="text, record">
            <!-- <a-icon @click="clickUpdate(record)" type="form" /> -->
            <a-button type="primary" shape="circle" icon="form" @click="clickUpdate(record)"/>
            <a-divider type="vertical" />
            <a-button type="primary" shape="circle" icon="menu" @click="clickListRecord(record)"/>
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
    <list-modal v-if="listObj.visiable" v-model="listObj.visiable" :data="listObj.data" @add="refresh" @edit="fetchData"></list-modal>
    <a-upload
      v-show="false"
      ref="upxlsx"
      name="file"
      :multiple="true"
      :customRequest="customRequest"
      accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    >
      <a-button>
        <a-icon type="upload" />Click to Upload
      </a-button>
    </a-upload>
  </page-header-wrapper>
</template>

<script>
import { columns, searchData } from './js/index'
import { list, remove, importExcel } from '@/api/master'
import model from '@/public/indexModel.js'
import ListModal from './ListModal'
import Add from './Add'
import { valueToLabelOption } from '@/utils/option'
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
    valueToLabelOption,
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
    clickDelete (record) {
      const param = {
        id: record.id,
        number: record.number
      }
      remove(param).then(({ code }) => {
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
    },
    importFile () {
      this.$refs['upxlsx'].$el.getElementsByTagName('input')[0].click()
    },
    customRequest (e) {
      const form = new FormData()
      form.append('file', e.file)
      importExcel(form).then(({ code, message }) => {
        if (code === 0) {
          this.$refs.table.refresh()
          this.$message.success(message || '导入成功')
        } else {
          this.$message.error(message || 'Error')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
