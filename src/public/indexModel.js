/**
 * @author super
 * @description 引入并声明所有页表页面的公共变量及组件
 */
import { SearchBar, PopconfirmButton } from '@/components/index.js'
import parent from './parent.js'
// import { filterOpts } from '@/utils/constant'

export default {
    components: { SearchBar, PopconfirmButton }, // 引入两个在列表页面都会用的组件
    mixins: [parent],
    data () {
        return {
            pagination: {
                size: 'small',
                pageSizeOptions: ['10', '20', '50', '100'], // 默认分页可选择的每页显示的页数
                pageSize: 10, // 分页每页默认显示10条
                current: 1, // 当前默认第一页
                total: 0, // 总条数
                showSizeChanger: true,
                showTotal: total => `${this.$t('共')}${total}${this.$t('条')}`
            },
            table: {
                loading: false, // 表格数据加载状态
                data: null, // 列表表格数据
                maxHeight: 0, // 列表表格最大高度
                selectedRowKeys: []
            },
            add: {
                visiable: false, // 是否显示新增组件
                data: null // 新增组件绑定的数据
            },
            confirmLoading: false,
            params: {}, // 存放查询参数
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
            },
            selectedRowKeys: []
        }
    },
    methods: {
        onSelectChange (selectedRowKeys) {
            console.log('selectedRowKeys changed: ', selectedRowKeys)
            this.selectedRowKeys = selectedRowKeys
        },
        // filterOpts,
        clickSearch (params) { // 查询
            this.params = params
            this.pagination.current = 1
            this.fetchData(this.params)
        },
        clickAdd () { // 添加弹框
            this.$setKeyValue(this.add, { visiable: true, data: { type: 'add' } })
        },
        clickUpdate (record) { // 编辑弹框
            this.$setKeyValue(this.add, { visiable: true, data: { type: 'edit', obj: record } })
        },
        handleTabChange (pagination) { // 切换分页
            this.pagination = pagination
            this.fetchData(this.params)
        },
        refresh () { // 重置查询
            this.pagination.current = 1
            this.fetchData(this.params)
        },
        conditionPage () { // 从新计算分页，避免出现空数据
            const total = this.pagination.total
            if (total > 10 && (total - 1) % 10 === 0) {
                this.pagination.current--
            }
        },
        assignOptions (search, key, list) { // 给下拉框的 options 赋值
            console.log('search===' + JSON.stringify(search))
            search[0].forEach(item => {
                if (item.key === key) {
                    item.options = list
                }
            })
        },
        timeshow (data) {
            const arr = data.split(':')
            const h = parseInt(arr[0]) * 2
            const m = parseInt(arr[1]) / 30
            return h + m
        },
        aftime (num) {
            const data = num * 30
            let a = ''
            let h = 0
            let m = 0
            if (data === 0) {
                a = '00:00'
            } else {
                const b = Math.floor(data / 60)
                if (b >= 1) {
                    h = b
                    m = data - (h * 60)
                } else {
                    m = data
                }
            }
            if (h > 9) {
                if (m > 9) {
                    a = h + ':' + m
                } else {
                    a = h + ':0' + m
                }
            } else {
                if (m > 9) {
                    a = '0' + h + ':' + m
                } else {
                    a = '0' + h + ':0' + m
                }
            }
            return a
        }
    }
}
