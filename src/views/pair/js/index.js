import { companyOptions } from '@/utils/option'
export const columns = [
    {
        title: '序号',
        dataIndex: 'index',
        width: 80,
        scopedSlots: { customRender: 'index' }
    },
    {
        title: '师傅名称',
        dataIndex: 'masterName',
        width: 120,
        key: 'masterName'
    },
    {
        title: '徒弟名称',
        dataIndex: 'studentName',
        width: 100,
        key: 'studentName'
    },
    {
        title: '师徒状态',
        dataIndex: 'isGraduationVo',
        width: 100,
        key: 'isGraduationVo',
        scopedSlots: { customRender: 'isGraduationVo' }
    },
    {
        title: '师徒匹配日期',
        dataIndex: 'foundTime',
        width: 100,
        key: 'foundTime'
    },
    {
        title: '操作',
        key: 'action',
        fixed: 'right',
        width: 120,
        scopedSlots: { customRender: 'action' }
    }
]

export const searchData = [
    [
        { type: 'input', key: 'masterName', label: '师傅姓名', placeholder: '请输入姓名' },
        { type: 'input', key: 'studentName', label: '徒弟姓名', placeholder: '请输入姓名' },
        { type: 'select', key: 'isGraduationVo', label: '师徒状态', placeholder: '请选择', options: [{ label: '已出师', value: '1' }, { label: '未出师', value: '2' }] },
        { type: 'search', name: '查询' },
        { type: 'reset', name: '重置' }
    ],
    [
        { type: 'pair', custom: true, name: '师徒配对', icon: 'usergroup-add' }
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
        dataIndex: 'company',
        width: 100,
        key: 'company',
        scopedSlots: { customRender: 'company' }
    },
    {
        title: '学历',
        dataIndex: 'education',
        width: 100,
        key: 'education'
    },
    {
        title: '配对日期',
        dataIndex: 'foundTime',
        width: 80,
        key: 'foundTime'
    },
    {
        title: '师徒状态',
        dataIndex: 'state',
        width: 80,
        key: 'state'
    }
]

export const listSearchData = [
    [
        { type: 'input', key: 'name', label: '姓名', placeholder: '请输入姓名' },
        { type: 'select', key: 'company', label: '所属单位', placeholder: '请选择', options: companyOptions },
        { type: 'select', key: 'status', label: '师徒状态', placeholder: '请选择', options: [{ label: '空闲 ', value: '1' }, { label: '带徒中', value: '2' }] },
        { type: 'search', name: '查询' },
        { type: 'reset', name: '重置' }
    ],
    [ ]
]
