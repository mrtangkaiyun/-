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
        title: '学历',
        dataIndex: 'originalPrice',
        width: 100,
        key: 'originalPrice'
    },
    {
        title: '专业资格技术',
        dataIndex: 'recommend',
        width: 90,
        key: 'recommend'
    },
    {
        title: '技能等级名',
        dataIndex: 'crtime',
        width: 120,
        key: 'crtime'
    },
    {
        title: '师徒状态',
        dataIndex: 'uptime',
        width: 120,
        key: 'uptime'
    },
    {
        title: '操作',
        key: 'action',
        fixed: 'right',
        width: 240,
        scopedSlots: { customRender: 'action' }
    }
]

export const searchData = [
    [
        { type: 'input', key: 'name', label: '姓名', placeholder: '请输入姓名' },
        { type: 'select', key: 'company', label: '所属单位', placeholder: '请选择', options: companyOptions },
        { type: 'select', key: 'status', label: '师徒状态', placeholder: '请选择', options: [{ label: '空闲 ', value: '1' }, { label: '带徒中', value: '2' }] },
        { type: 'search', name: '查询' },
        { type: 'reset', name: '重置' }
    ],
    [
        { type: 'add', name: '新增' },
        { type: 'import', name: '导入' }
    ]
]

export const listColumns = [
    {
        title: '序号',
        dataIndex: 'index',
        width: 80,
        scopedSlots: { customRender: 'index' }
    },
    {
        title: '姓名',
        dataIndex: 'a',
        width: 80,
        key: 'a'
    },
    {
        title: '所属单位',
        dataIndex: 'b',
        width: 120,
        key: 'b'
    },
    {
        title: '学历',
        dataIndex: 'c',
        width: 80,
        key: 'c'
    },
    {
        title: '配对日期',
        dataIndex: 'c',
        width: 80,
        key: 'c'
    },
    {
        title: '师徒状态',
        dataIndex: 'c',
        width: 80,
        key: 'c'
    }
]
