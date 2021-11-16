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
      width="700px"
    >
      <a-form-model ref="form" :model="formInit" loading :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
        <a-form-model-item label="角色名称" prop="commodityName" :rules="rules.input">
          <a-input placeholder="请输入" v-model="formInit.commodityName" />
        </a-form-model-item>
        <a-form-model-item label="角色Type" prop="commodityName" :rules="rules.input">
          <a-select v-model="formInit.commodityName1" placeholder="请选择">
            <a-select-option :value="item.id" :key="item.id" v-for="item in roleList">{{ item.name }}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="权限勾选" prop="commodityName" :rules="rules.input">
          <a-input style="display: none" placeholder="请输入" v-model="formInit.a" />
          <a-button @click="clickTree()"> <a-icon type="plus" />点击选择 </a-button>
        </a-form-model-item>
        <div class="text-center">
          <a-button @click="closeDialog"> 取消 </a-button>
          <a-button type="primary" class="margin-l-20" @click="handleSubmit" :loading="button.loading">保存</a-button>
        </div>
      </a-form-model>
      <tree-modal
        v-if="listObj.visiable"
        v-model="listObj.visiable"
        :data="listObj.data"
        @confirm="confirmTree"
      ></tree-modal>
    </a-modal>
  </div>
</template>

<script>
import model from '@/public/addModel.js'
import rules from '@/public/rules'
import { save, load } from '@/api/goods'
import TreeModal from './Tree.vue'
export default {
  mixins: [model, rules],
  components: { TreeModal },
  data() {
    return {
      formInit: { name: null },
      roleList: [
        {
          name: 'admin',
          id: 'admin',
        },
        {
          name: 'sf',
          id: '2',
        },
        {
          name: 'td',
          id: '3',
        },
      ],
      listObj: {
        visiable: false,
        data: null,
      },
    }
  },
  created() {
    const { type } = this.data
    const title = type === 'add' ? '角色新增' : '角色修改'
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
    if (type === 'edit') {
      this.fetchInfo()
    }
  },
  methods: {
    confirmTree() {

    },
    clickTree() {
      this.$setKeyValue(this.listObj, { visiable: true, data: { type: 'tree', obj: {} } })
    },
    fetchInfo() {
      const { obj } = this.data
      load(obj.id).then(({ code, data }) => {
        if (code === 1) {
          data.imgDtos = data.imgDtos.map((e) => e.imgPath)
          this.originalData = this.$copy(data)
          this.$setOriginalKV(this.formInit, data)
        }
      })
    },
    handleSubmit(e) {
      e.preventDefault()
      this.$refs.form.validate((valid) => {
        if (valid) {
          const { type, obj } = this.data
          const params = { ...this.formInit }
          if (type === 'edit' && this.$compareObjValue(this.originalData, params)) {
            this.$message.warning('数据没有任何修改')
            return
          }
          if (type === 'edit') {
            params.id = obj.id
          }
          this.$setKeyValue(this.button, { loading: true, text: '提交中' })
          save(params).then((result) => this.process(result))
        } else {
          this.$message.warning('请完善上面必填信息')
        }
      })
    },
  },
}
</script>
<style lang="less" scoped>
</style>
