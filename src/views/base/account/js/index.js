import { companyOptions } from '@/utils/option'
export const columns = [
    {
        title: '序号',
        dataIndex: 'index',
        width: 80,
        scopedSlots: { customRender: 'index' }
    },
    {
        title: '用户名',
        dataIndex: 'name',
        width: 120,
        key: 'name'
    },
    {
        title: '用户编号(账号)',
        dataIndex: 'number',
        width: 120,
        key: 'number'
    },
    {
        title: '角色',
        dataIndex: 'roleName',
        width: 100,
        key: 'roleName'
    },
    {
        title: '操作',
        key: 'action',
        fixed: 'right',
        width: 160,
        scopedSlots: { customRender: 'action' }
    }
]

export const searchData = [
    [
        { type: 'input', key: 'name', label: '账号', placeholder: '请输入账号' },
        { type: 'search', name: '查询' },
        { type: 'reset', name: '重置' }
    ],
    [ ]
]
