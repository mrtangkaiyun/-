<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <search-bar ref="searchbar" :data="searchData" @search="clickSearch" @add="clickAdd"></search-bar>
        <a-table
          :columns="columns"
          :dataSource="table.data"
          rowKey="id"
          :size="table.size"
          :loading="table.loading"
          :pagination="pagination"
          @change="handleTabChange"
          :scroll="{ x: 1000 }"
        >
          <span slot="goodsName" slot-scope="goodsName,record">
            {{ record.orderInfoList[0].goodsName }}
          </span>
          <span slot="goodsImgUrl" slot-scope="goodsImgUrl,record">
            <viewer :images="[record.orderInfoList[0].goodsImgUrl]" :options="viewerOpts">
              <img class="cover" :src="record.orderInfoList[0].goodsImgUrl" />
            </viewer>
          </span>
          <span slot="goodsTypeName" slot-scope="goodsTypeName,record">
            {{ record.orderInfoList[0].goodsTypeName }}
          </span>
          <span slot="goodsSizeName" slot-scope="goodsSizeName,record">
            {{ record.orderInfoList[0].goodsSizeName }}
          </span>
          <span slot="number" slot-scope="number,record">
            {{ record.orderInfoList[0].number }}
          </span>
          <span slot="success" slot-scope="success">
            <a-tag color="grey" v-if="success === 0">待支付 </a-tag>
            <a-tag color="green" v-if="success === 1">已支付 </a-tag>
            <a-tag color="grey" v-if="success === 2">支付过期 </a-tag>
          </span>
          <span slot="action" slot-scope="text, record">
            <a href="javascript:;" @click="clickUpdate(record)">详情</a>
          </span>
        </a-table>
      </div>
    </a-card>
    <add v-if="add.visiable" v-model="add.visiable" :data="add.data" @add="refresh" @edit="fetchData"></add>
  </page-header-wrapper>
</template>

<script>
import { columns, searchData } from './js/index'
import { list, remove } from '@/api/order'
import model from '@/public/indexModel.js'
import Add from './Add'
export default {
  name: 'Order',
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
    clickDelete (record) {
      remove(record.id).then(({ code, data }) => {
        if (code === 1) {
          this.$message.success('删除成功')
          this.conditionPage()
          this.fetchData()
        }
      })
    }
  }
}
</script>

<style>
.cover{
  width: 80px;
  height: 80px;
}
</style>
