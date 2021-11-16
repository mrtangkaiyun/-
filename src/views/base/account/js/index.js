import { companyOptions } from '@/utils/option'
export const columns = [
    {
        title: '序号',
        dataIndex: 'index',
        width: 80,
        scopedSlots: { customRender: 'index' }
    },
    {
        title: '登录账号',
        dataIndex: 'commodityName',
        width: 120,
        key: 'commodityName'
    },
    {
        title: '账号名称',
        dataIndex: 'a',
        width: 100,
        key: 'a'
    },
    {
        title: '创建时间',
        dataIndex: 'currentPrice',
        width: 100,
        key: 'currentPrice'
    },
    {
        title: '最近登录时间',
        dataIndex: 'originalPrice',
        width: 100,
        key: 'originalPrice'
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
        { type: 'input', key: 'name', label: '账号', placeholder: '请输入账号' },
        { type: 'search', name: '查询' },
        { type: 'reset', name: '重置' }
    ],
    [
        { type: 'add', name: '新增' },
        { type: 'import', name: '导入' }
    ]
]
