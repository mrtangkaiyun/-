import { companyOptions } from '@/utils/option'
export const columns = [
    {
        title: '序号',
        dataIndex: 'index',
        width: 80,
        scopedSlots: { customRender: 'index' }
    },
    {
        title: '员工编号',
        dataIndex: 'number',
        width: 120,
        key: 'number'
    },
    {
        title: '姓名',
        dataIndex: 'name',
        width: 100,
        key: 'name'
    },
    {
        title: '所属单位',
        dataIndex: 'companyName',
        width: 100,
        key: 'companyName'
    },
    {
        title: '带徒次数',
        dataIndex: 'size',
        width: 100,
        key: 'size'
    },
    {
        title: '未出师',
        dataIndex: 'ngraduation',
        width: 90,
        key: 'ngraduation'
    },
    {
        title: '已出师',
        dataIndex: 'ygraduation',
        width: 120,
        key: 'ygraduation'
    }
]

export const searchData = [
    [
        { type: 'input', key: 'name', label: '姓名', placeholder: '请输入姓名' },
        { type: 'select', key: 'company', label: '所属单位', placeholder: '请选择', options: companyOptions },
        { type: 'search', name: '查询' },
        { type: 'reset', name: '重置' }
    ]
]
