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
          :scroll="{ x: 600 }"
        >
          <template slot="index" slot-scope="index, record, i">
            {{ i + 1 }}
          </template>
        </a-table>
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
    const title = '徒弟列表'
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
    this.fetchInfo()
  },
  methods: {
    fetchInfo () {
      const { obj } = this.data
      load(obj.id).then(({ code, data }) => {
        if (code === 1) {
          data.imgDtos = data.imgDtos.map((e) => e.imgPath)
          this.originalData = this.$copy(data)
          this.$setOriginalKV(this.formInit, data)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
