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
        <a-radio-group v-model="studentId" :default-value="studentId" button-style="solid">
          <a-radio-button v-for="item in list" :key="item.id" style="margin:15px" :value="item.studentId"> {{ item.studentName }} </a-radio-button>
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
import { list } from '@/api/pair'
export default {
  mixins: [model],
  data () {
    return {
      studentId: null,
      list: []
    }
  },
  created () {
    const { obj } = this.data
    this.studentId = obj ? obj.studentId : null
    const title = '任务执行人'
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
    this.fetchInfo()
  },
  methods: {
    fetchInfo () {
      const { maaId } = this.data
      const param = {
        maaId,
        // isGraduationVo: 2, //1：已出师 2：未出师
        pageSize: 2000,
        pageNum: 1
      }
      list(param).then(({ code, data }) => {
        if (code === 0) {
          this.list = data.rows
        }
      })
    },
    confirm () {
      if (!this.studentId) {
        return this.$message.warning('请选择执行人')
      }
      const obj = this.list.find(e => (e.studentId === this.studentId))
      this.$emit('confirm', obj)
      this.closeDialog()
    }
  }
}
</script>
<style lang="less" scoped>
</style>
