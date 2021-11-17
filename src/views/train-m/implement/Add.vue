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
      width="1000px"
    >
      <a-form-model ref="form" :model="formInit" loading :wrapper-col="{ span: 21 }">
        <a-row>
          <a-col :span="6">
            <a-form-model-item label="员工编号" prop="commodityName" :rules="rules.input">
              <a-input placeholder="请输入" v-model="formInit.commodityName" />
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="姓名" prop="commodityName" :rules="rules.input">
              <a-input placeholder="请输入" v-model="formInit.commodityName" />
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="所属单位" prop="commodityName" :rules="rules.input">
              <a-input placeholder="请输入" v-model="formInit.commodityName" />
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="所属部门" prop="commodityName">
              <a-input placeholder="请输入" v-model="formInit.commodityName" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="6">
            <a-form-model-item label="所属岗位" prop="commodityName">
              <a-input placeholder="请输入" v-model="formInit.commodityName" />
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="身份证号" prop="commodityName">
              <a-input placeholder="请输入" v-model="formInit.commodityName" />
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="性别" prop="sex">
              <a-select v-model="formInit.sex" placeholder="请选择">
                <a-select-option v-for="item in sexOptions" :key="item.value" :value="item.value">
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="民族" prop="nation">
              <a-select v-model="formInit.nation" placeholder="请选择">
                <a-select-option v-for="item in nationOptions" :key="item.value" :value="item.value">
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="6">
            <a-form-model-item label="出生日期" prop="date">
              <a-date-picker v-model="formInit.date" />
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="政治面貌" prop="sex">
              <a-select v-model="formInit.sex" placeholder="请选择">
                <a-select-option v-for="item in faceOptions" :key="item.value" :value="item.value">
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="学历" prop="sex" :rules="rules.select">
              <a-select v-model="formInit.sex" placeholder="请选择">
                <a-select-option v-for="item in recordOptions" :key="item.value" :value="item.value">
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="手机" prop="originalPrice">
              <a-input-number style="width: 100%" placeholder="请输入" v-model="formInit.originalPrice" :min="0" />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="6">
            <a-form-model-item label="电子邮箱" prop="commodityName">
              <a-input placeholder="请输入" v-model="formInit.commodityName" />
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="参加工作时间" prop="date">
              <a-date-picker v-model="formInit.date" />
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="专业技术资格名称" prop="commodityName">
              <a-input placeholder="请输入" v-model="formInit.commodityName" />
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="技能等级名称" prop="commodityName">
              <a-input placeholder="请输入" v-model="formInit.commodityName" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="6">
            <a-form-model-item label="技其它资格名称" prop="commodityName">
              <a-input placeholder="请输入" v-model="formInit.commodityName" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <div class="text-center">
          <a-button @click="closeDialog"> 取消 </a-button>
          <a-button type="primary" class="margin-l-20" @click="handleSubmit" :loading="button.loading">保存</a-button>
        </div>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import model from '@/public/addModel.js'
import rules from '@/public/rules'
import { save, load } from '@/api/goods'
import { getClassify } from '@/api/classify'
export default {
  mixins: [model, rules],
  data () {
    return {
      sexOptions: [
        {
          label: '男',
          value: '1'
        },
        {
          label: '女',
          value: '2'
        }
      ],
      nationOptions: [
        {
          label: '汉族',
          value: '1'
        },
        {
          label: '苗族',
          value: '2'
        }
      ],
      faceOptions: [
        {
          label: '良好',
          value: '1'
        },
        {
          label: '优',
          value: '2'
        }
      ],
      recordOptions: [
        {
          label: '本科',
          value: '1'
        },
        {
          label: '大专',
          value: '2'
        }
      ],
      classOptions: [],
      formInit: { name: null }
    }
  },
  created () {
    const { type } = this.data
    const title = type === 'add' ? '师傅新增' : '师傅修改'
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
    this.getClassifyList()
    if (type === 'edit') {
      this.fetchInfo()
    }
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
    getClassifyList () {
      getClassify().then(({ data, code }) => {
        if (code === 1) {
          this.classOptions = data
        }
      })
    },
    handleSubmit (e) {
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
    }
  }
}
</script>
<style lang="less" scoped>
</style>
