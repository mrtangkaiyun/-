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
      width="1300px"
    >
      <a-form-model ref="form" :model="formInit" loading :wrapper-col="{ span: 23 }">
        <a-row>
          <a-col :span="6">
            <a-form-model-item label="员工编号" prop="number" :rules="rules.input">
              <a-input :disabled="isDetail" placeholder="请输入" v-model="formInit.number" />
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="姓名" prop="name" :rules="rules.input">
              <a-input :disabled="isDetail" placeholder="请输入" v-model="formInit.name" />
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="所属单位" prop="company" :rules="rules.select">
              <a-select :disabled="isDetail" v-model="formInit.company" placeholder="请选择">
                <a-select-option v-for="item in companyOptions" :key="item.value" :value="item.value">
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="所属部门" prop="departmentId">
              <a-input :disabled="isDetail" placeholder="请输入" v-model="formInit.departmentId" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="6">
            <a-form-model-item label="所属岗位" prop="post">
              <a-input :disabled="isDetail" placeholder="请输入" v-model="formInit.post" />
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item
              label="身份证号"
              prop="idCard"
              :rules="[{ required: false }, { min: 16, max: 18, message: '身份证长度不正确' }]"
            >
              <a-input :disabled="isDetail" placeholder="请输入" v-model="formInit.idCard" />
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="性别" prop="sex">
              <a-select :disabled="isDetail" v-model="formInit.sex" placeholder="请选择">
                <a-select-option v-for="item in sexOptions" :key="item.value" :value="item.value">
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="民族" prop="nation">
              <a-select :disabled="isDetail" v-model="formInit.nation" placeholder="请选择">
                <a-select-option v-for="item in nationOptions" :key="item.value" :value="item.value">
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="6">
            <a-form-model-item label="出生日期" prop="birthday">
              <a-date-picker :disabled="isDetail" v-model="formInit.birthday" />
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="政治面貌" prop="politicalOutlook">
              <a-select :disabled="isDetail" v-model="formInit.politicalOutlook" placeholder="请选择">
                <a-select-option v-for="item in faceOptions" :key="item.value" :value="item.value">
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="学历" prop="education" :rules="rules.select">
              <a-select :disabled="isDetail" v-model="formInit.education" placeholder="请选择">
                <a-select-option v-for="item in recordOptions" :key="item.value" :value="item.value">
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="手机" prop="phone">
              <a-input-number :disabled="isDetail" style="width: 100%" placeholder="请输入" v-model="formInit.phone" :min="0" />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="6">
            <a-form-model-item label="电子邮箱" prop="email">
              <a-input :disabled="isDetail" placeholder="请输入" v-model="formInit.email" />
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="参加工作时间" prop="workingTime">
              <a-date-picker :disabled="isDetail" v-model="formInit.workingTime" />
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="专业资格技术名称" prop="technicalId">
              <a-select :disabled="isDetail" v-model="formInit.technicalId" placeholder="请选择">
                <a-select-option v-for="item in cardOneOptions" :key="item.value" :value="item.value">
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="技能等级名称" prop="skillLevelId">
              <a-select :disabled="isDetail" v-model="formInit.skillLevelId" placeholder="请选择">
                <a-select-option v-for="item in cardTwoOptions" :key="item.value" :value="item.value">
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="6">
            <a-form-model-item label="技其它资格名称" prop="other">
              <a-input :disabled="isDetail" placeholder="请输入" v-model="formInit.other" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <div v-if="!isDetail" class="text-center">
          <a-button @click="closeDialog"> 取消 </a-button>
          <a-button type="primary" class="margin-l-20" @click="handleSubmit" :loading="button.loading">保存</a-button>
        </div>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import moment from 'moment'
import model from '@/public/addModel.js'
import rules from '@/public/rules'
import { save, load } from '@/api/master'
import { sexOptions, nationOptions, faceOptions, recordOptions, companyOptions, cardOneOptions, cardTwoOptions} from '@/utils/option'
export default {
  mixins: [model, rules],
  data() {
    return {
      cardOneOptions,
      cardTwoOptions,
      companyOptions,
      sexOptions,
      nationOptions,
      faceOptions,
      recordOptions,
      classOptions: [],
      formInit: { 
        number: null,
        name: null,
        company: null,
        departmentId: null,
        post: null,
        idCard: null,
        sex: null,
        nation: null,
        birthday: null,
        politicalOutlook: null,
        education: null,
        phone: null,
        email: null,
        workingTime: null,
        technicalId: null,
        skillLevelId: null,
        other: null
      },
    }
  },
  computed: {
    isDetail () {
      const { type } = this.data
      return type === 'detail'
    }
  },
  created() {
    const { type } = this.data
    const title = type === 'add' ? '师傅新增' :  type === 'edit' ? '师傅修改' : '师傅详情'
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
    if (type === 'edit' || type === 'detail') {
      this.fetchInfo()
    }
  },
  methods: {
    fetchInfo() {
      const { obj } = this.data
      load(obj.id).then(({ code, data }) => {
        if (code === 0) {
          console.log(data, 11111111111111)
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
          params.birthday = moment(params.birthday).format('YYYY-MM-DD')
          params.workingTime = moment(params.workingTime).format('YYYY-MM-DD')
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
