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
        dataIndex: 'commodityName',
        width: 120,
        key: 'commodityName'
    },
    {
        title: '姓名',
        dataIndex: 'a',
        width: 100,
        key: 'a'
    },
    {
        title: '所属单位',
        dataIndex: 'currentPrice',
        width: 100,
        key: 'currentPrice'
    },
    {
        title: '带徒次数',
        dataIndex: 'originalPrice',
        width: 100,
        key: 'originalPrice'
    },
    {
        title: '未出师',
        dataIndex: 'recommend',
        width: 90,
        key: 'recommend'
    },
    {
        title: '已出师',
        dataIndex: 'crtime',
        width: 120,
        key: 'crtime'
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

