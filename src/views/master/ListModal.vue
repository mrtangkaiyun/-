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
          :scroll="{ x: 600 }"
        >
          <template slot="index" slot-scope="index, record, i">
            {{ i + 1 }}
          </template>
          <template slot="company" slot-scope="company">
            {{ valueToLabelOption('companyOptions', company) }}
          </template>
          <template slot="isGraduation" slot-scope="isGraduation">
            {{ isGraduation === 2 ? '未出师' : '已出师' }}
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
import { queryStuTea } from '@/api/master'
import { valueToLabelOption } from '@/utils/option'
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
    valueToLabelOption,
    fetchInfo () {
      const { obj } = this.data
      const param = {
        id: obj.id,
        type: 2 // 1师傅 2徒弟
      }
      queryStuTea(param).then(({ code, data }) => {
        if (code === 0) {
          this.table.data = data
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
