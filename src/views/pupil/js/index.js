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
        width: 160,
        key: 'companyName'
    },
    {
        title: '学历',
        dataIndex: 'education',
        width: 100,
        key: 'education'
    },
    {
        title: '专业技术资格',
        dataIndex: 'technicalName',
        width: 90,
        key: 'technicalName'
    },
    {
        title: '技能等级名',
        dataIndex: 'skillLevelName',
        width: 120,
        key: 'skillLevelName'
    },
    {
        title: '师徒状态',
        dataIndex: 'status',
        width: 120,
        key: 'status'
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
        dataIndex: 'name',
        width: 80,
        key: 'name'
    },
    {
        title: '所属单位',
        dataIndex: 'companyName',
        width: 120,
        key: 'companyName'
    },
    {
        title: '学历',
        dataIndex: 'education',
        width: 80,
        key: 'education'
    },
    {
        title: '配对日期',
        dataIndex: 'foundTime',
        width: 100,
        key: 'foundTime'
    },
    {
        title: '师徒状态',
        dataIndex: 'state',
        width: 80,
        key: 'state'
    }
]
