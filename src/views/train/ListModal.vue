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
        <a-radio-group v-model="value" default-value="a" button-style="solid">
          <a-radio-button style="margin:15px" value="a"> Hangzhou </a-radio-button>
          <a-radio-button style="margin:15px" value="b"> Shanghai </a-radio-button>
          <a-radio-button style="margin:15px" value="c"> Beijing </a-radio-button>
          <a-radio-button style="margin:15px" value="d"> Chengdu </a-radio-button>
        </a-radio-group>
      </div>
      <div class="text-center padding-t-50">
        <a-button @click="confirm"> 确定 </a-button>
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
      columns: listColumns,
      value: 'a'
    }
  },
  created () {
    const { obj } = this.data
    this.value = obj.value || 'a'
    const title = '任务执行人'
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
    },
    confirm () {
      const { type } = this.data
      this.$emit('confirm', this.value, type)
      this.closeDialog()
    }
  }
}
</script>
<style lang="less" scoped>
</style>
