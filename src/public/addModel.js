/**
 * @author super
 * @description 引入并声明所有新增页面的公共变量及组件
 */
import parent from './parent.js'
// import { filterOpts } from '@/utils/constant'

export default {
    mixins: [parent],
    props: {
        data: {
            type: Object,
            default: () => {}
        }
    },
    data () {
        return {
            dialog: {
                visiable: false, // 显示弹出框
                title: null, // 弹出框标题,
                keyboard: false, // 是否esc关闭
                maskClosable: false // 是否点击遮罩层关闭
            },
            button: {
                loading: false, // 确定按钮状态
                text: this.$t('确定') // 按钮默认文字
            },
            originalData: null, // 原始数据
            baseLayout: { // 表单项布局
                labelCol: { span: 8 },
                wrapperCol: { span: 12 }
            },
            fullLayout: { // 全屏的布局
                labelCol: { span: 5 },
                wrapperCol: { span: 19 }
            },
            buttonLayout: { // 按钮布局
                wrapperCol: { span: 12, offset: 5 }
            },
            loading: false,
            previewImgs: [], // 预览图片
            viewerOpts: {
                title: false,
                navbar: false,
                toolbar: {
                    zoomIn: 4,
                    zoomOut: 4,
                    rotateLeft: 4,
                    rotateRight: 4,
                    flipHorizontal: 4,
                    flipVertical: 4
                }
            }
        }
    },
    beforeCreate () {
        this.form = this.$form.createForm(this)
    },
    methods: {
        // filterOpts,
        closeDialog () {
            this.$emit('input', false)
        },
        process (res) {
            if (res.code === 1) {
                this.$message.success(this.dialog.title + this.$t('成功'))
                this.closeDialog()
                if (this.data.type === 'add') {
                    this.$emit('add')
                } else {
                    this.$emit('edit')
                }
            } else {
                this.$message.error(this.dialog.title + this.$t('失败') + ': ' + res.message)
                this.$setKeyValue(this.button, { loading: false, text: this.$t('确定') })
            }
        },
        inputNumber (value) {
            return value.replace(/^(0+)|[^\d]+/g, '')
        }
        // priceinput (value) {
        //     if (value.replace(/[^(\d|.)]/g, '')) {
        //         if (!/^([\+]?[1-9]\d{0,7}|(0))([.]\d{0,2})?$/.test(value) && value != '') {
        //             value = value.replace(/\.\d{2,}$/, value.substr(value.indexOf('.'), 3))
        //         }
        //     } else {
        //         value = ''
        //     }
        //     return value
        // }
    }
}
