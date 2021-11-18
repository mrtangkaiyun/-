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
        dataIndex: 'isGraduation',
        width: 100,
        key: 'isGraduation'
    },
    {
        title: '师徒匹配日期',
        dataIndex: 'foundTime',
        width: 100,
        key: 'foundTime'
    },
    {
        title: '任务个数',
        dataIndex: 'action',
        width: 90,
        key: 'action',
        scopedSlots: { customRender: 'action' }
    }
    // ,
    // {
    //     title: '操作',
    //     key: 'action',
    //     fixed: 'right',
    //     width: 240,
    //     scopedSlots: { customRender: 'action' }
    // }
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
        { type: 'graduation', name: '已出师', custom: true, icon: 'user' },
        { type: 'task', name: '任务发布', custom: true, icon: 'solution' }
    ]
]
