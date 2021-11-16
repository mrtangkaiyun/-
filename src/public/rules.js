export default {
  data () {
    return {
      rules: {
        input: [{
          required: true,
          message: '请输入'
          // trigger: 'blur' // 有些组件使用此属性会报 is not a string 错误
        }],
        select: [{
          required: true,
          message: '请选择',
          trigger: 'blur'
        }],
        upload: [{
          required: true,
          message: '请上传',
          trigger: 'change'
        }],
        uploadArray: [{
          type: 'array',
          required: true,
          message: '请上传',
          trigger: 'change'
        }],
        selectNumber: [{
          type: 'number',
          required: true,
          message: '请选择',
          trigger: 'blur'
        }],
        selectArray: [{
          type: 'array',
          required: true,
          message: '请选择',
          trigger: 'blur'
        }],
        selectBoolean: [{
          type: 'boolean',
          required: true,
          message: '请选择',
          trigger: 'blur'
        }],
        selectDate: [{
          required: true,
          message: '请选择'
        }],
        image: [{
          required: true,
          message: '请上传',
          trigger: 'blur'
        }],
        checkPhone: [{
          required: true,
          message: '',
          trigger: 'change'
        }, {
          validator: (rule, value, callback) => {
            const pattern = /^(1)[0-9]{10}$/
            if (value === '') {
              callback(new Error('请输入'))
            } else if (!pattern.test(value)) {
              callback(new Error('请输入正确的手机号'))
            } else {
              callback()
            }
          }
        }],
        edior: [{
          required: true,
          message: '',
          trigger: 'change'
        }, {
          validator: (rule, value, callback) => {
            if (value === '<p><br></p>' || !value) {
              callback(new Error('请输入内容'))
            } else {
              callback()
            }
          }
        }]
      }
    }
  }
}
