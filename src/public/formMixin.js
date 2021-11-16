import modal from '@/public/modalMixin'
import rules from './rules'
export default {
  mixins: [ modal, rules ],
  data () {
    return {
      baseLayout: { // 表单项布局
        labelCol: { span: 5 },
        wrapperCol: { span: 12 }
      },
      fullLayout: { // 全屏的布局
        labelCol: { span: 5 },
        wrapperCol: { span: 19 }
      },
      buttonLayout: { // 按钮布局
        wrapperCol: { span: 12, offset: 5 }
      },
      instance: null // 当前路由对应的组件实例
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  mounted () {
    const matched = this.$route.matched
    const instance = matched[matched.length - 1].instances.default
    this.instance = instance
    this.init()
  },
  methods: {
    init () { // 初始化方法，可以根据业务进行重新
      this.$nextTick(() => {
        this.form.setFieldsValue(this.formInit)
      })
    }
  }
}
